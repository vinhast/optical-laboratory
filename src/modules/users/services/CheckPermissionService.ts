/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return  */
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import Role from '../infra/typeorm/entities/Role';
import Permission from '../infra/typeorm/entities/Permission';
import IClientsApplicationPermissionsRepository from '../repositories/IClientsApplicationPermissionsRepository';
import IClientsApplicationRolesRepository from '../repositories/IClientsApplicationRolesRepository';
import ClientApplicationRole from '../infra/typeorm/entities/ClientApplicationRole';
import ClientApplicationPermission from '../infra/typeorm/entities/ClientApplicationPermission';
import IClientsApplicationsUsersRepository from '../repositories/IClientsApplicationsUsersRepository';
import ClientApplicationUser from '../infra/typeorm/entities/ClientApplicationUser';

interface IRequest {
  role_id: number;
  user_id: number;
  method: string;
  originalUrl: string;
  userType?: string;
  client_application_id?: number;
}

interface IResponseCheckPermission {
  approved: boolean;
  approved_user?: boolean;
  approved_role?: boolean;
}

@injectable()
class CheckPermissionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('ClientsApplicationPermissionsRepository')
    private clientsApplicationPermissionsRepository: IClientsApplicationPermissionsRepository,
    @inject('ClientsApplicationRolesRepository')
    private clientsApplicationRolesRepository: IClientsApplicationRolesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public removeLastIndexUrl(url: string): string {
    const baseUrlSplited = url.split('/');
    const baseUrl = url.slice(
      0,
      url.length - (baseUrlSplited[baseUrlSplited.length - 1].length + 1),
    );
    return baseUrl;
  }

  public async execute({
    user_id,
    role_id,
    method,
    originalUrl,
    userType,
    client_application_id,
  }: IRequest): Promise<IResponseCheckPermission> {
    const notRuleRoutes = ['dashboard', 'profile', 'cache'];
    const excludeLastItemMethod = ['DELETE', 'GET'];
    const pathVerify = ['create', 'view', 'update', 'delete'];
    const hasPermission: IResponseCheckPermission = {
      approved: false,
      approved_role: false,
      approved_user: false,
    };
    if (role_id === 1) {
      hasPermission.approved = true;
      hasPermission.approved_role = true;
      hasPermission.approved_user = true;
      return hasPermission;
    }
    const splitedUrl = originalUrl
      .split('/')
      .filter(item => item && item !== 'undefined');
    const pathIndex = splitedUrl.findIndex(item => pathVerify.includes(item));
    const path = splitedUrl.find(item => pathVerify.includes(item));

    const baseUrl = splitedUrl
      .filter((item, index) => {
        if (pathIndex !== -1) {
          if (item !== path && index < pathIndex) {
            return item;
          }
        } else if (item !== path) {
          return item;
        }
      })
      .join('/');

    let tempBaseUrl = baseUrl;
    if (excludeLastItemMethod.includes(method)) {
      if (baseUrl.split('/').length === 1) {
        tempBaseUrl = baseUrl[0];
      } else if (method === 'DELETE' || path) {
        if (path) {
          tempBaseUrl = this.removeLastIndexUrl(originalUrl);
        } else {
          tempBaseUrl = this.removeLastIndexUrl(baseUrl);
        }
      }
    }

    if (notRuleRoutes.includes(baseUrl)) {
      hasPermission.approved = true;
      hasPermission.approved_role = true;
      hasPermission.approved_user = true;
      return hasPermission;
    }
    if (userType === 'ClientApplicationUser') {
      const cacheKeyPermission = `client-application-permission-router:${method}-${baseUrl}-${path}`;
      let clientApplicationPermission = await this.cacheProvider.recover<
        ClientApplicationPermission | undefined
      >(cacheKeyPermission);

      if (!clientApplicationPermission) {
        clientApplicationPermission =
          await this.clientsApplicationPermissionsRepository.findByRoute({
            method,
            baseUrl: tempBaseUrl,
            path,
            client_application_id,
          });

        if (!clientApplicationPermission) {
          clientApplicationPermission =
            await this.clientsApplicationPermissionsRepository.findByRoute({
              method,
              baseUrl,
              path,
              client_application_id,
            });
        }

        let stopLoop = !!clientApplicationPermission;
        while (!stopLoop) {
          tempBaseUrl = this.removeLastIndexUrl(tempBaseUrl);
          clientApplicationPermission =
            await this.clientsApplicationPermissionsRepository.findByRoute({
              method,
              baseUrl: tempBaseUrl,
              path,
              client_application_id,
            });
          if (clientApplicationPermission || !tempBaseUrl.length) {
            stopLoop = true;
          }
        }

        await this.cacheProvider.save(
          cacheKeyPermission,
          clientApplicationPermission,
        );
      }

      if (clientApplicationPermission) {
        const cacheKeyRole = `client-application-role:${role_id}`;
        let clientApplicationRole = await this.cacheProvider.recover<
          ClientApplicationRole | undefined
        >(cacheKeyRole);

        if (!clientApplicationRole) {
          clientApplicationRole =
            await this.clientsApplicationRolesRepository.findById(
              role_id,
              client_application_id,
            );
          await this.cacheProvider.save(cacheKeyRole, clientApplicationRole);
        }

        const clientApplicationRolePermissions =
          clientApplicationRole?.clientApplicationPermissions?.map(
            clientApplicationRolePermission =>
              clientApplicationRolePermission.id,
          );

        if (
          clientApplicationRolePermissions?.includes(
            clientApplicationPermission.id,
          )
        ) {
          hasPermission.approved = true;
          hasPermission.approved_role = true;
        }

        const cacheKeyUser = `client-application-user:${user_id}`;
        let clientApplicationUser = await this.cacheProvider.recover<
          ClientApplicationUser | undefined
        >(cacheKeyUser);

        if (!clientApplicationUser) {
          clientApplicationUser =
            await this.clientsApplicationsUsersRepository.findById(
              user_id,
              client_application_id,
            );
          await this.cacheProvider.save(cacheKeyUser, clientApplicationUser);
        }

        const clientApplicationUserPermissions =
          clientApplicationUser?.clientApplicationUserPermissions?.map(
            clientApplicationUserPermission =>
              clientApplicationUserPermission.id,
          );

        if (
          clientApplicationUserPermissions?.includes(
            clientApplicationPermission.id,
          )
        ) {
          hasPermission.approved = true;
          hasPermission.approved_user = true;
        }
      }
    } else {
      const cacheKeyPermission = `permission-router:${method}-${baseUrl}-${path}`;
      let permission = await this.cacheProvider.recover<Permission | undefined>(
        cacheKeyPermission,
      );
      if (!permission) {
        permission = await this.permissionsRepository.findByRoute({
          method,
          baseUrl: tempBaseUrl,
          path,
        });

        if (!permission) {
          permission = await this.permissionsRepository.findByRoute({
            method,
            baseUrl,
            path,
          });
        }

        let stopLoop = !!permission;
        while (!stopLoop) {
          tempBaseUrl = this.removeLastIndexUrl(tempBaseUrl);
          permission = await this.permissionsRepository.findByRoute({
            method,
            baseUrl: tempBaseUrl,
            path,
          });
          if (permission || !tempBaseUrl.length) {
            stopLoop = true;
          }
        }

        await this.cacheProvider.save(cacheKeyPermission, permission);
      }

      if (permission) {
        const cacheKeyRole = `role:${role_id}`;
        let role = await this.cacheProvider.recover<Role | undefined>(
          cacheKeyRole,
        );

        role = await this.rolesRepository.findById(role_id);
        if (!role) {
          await this.cacheProvider.save(cacheKeyRole, role);
        }

        const rolePermissions = role?.permissions?.map(
          rolePermission => rolePermission.id,
        );

        if (rolePermissions?.includes(permission.id)) {
          hasPermission.approved = true;
          hasPermission.approved_role = true;
        }

        const cacheKeyUser = `user:${user_id}`;
        let user = await this.cacheProvider.recover<User | undefined>(
          cacheKeyUser,
        );

        if (!user) {
          user = await this.usersRepository.findById(user_id);
          await this.cacheProvider.save(cacheKeyUser, user);
        }

        const userPermissions = user?.user_permissions?.map(
          userPermission => userPermission.id,
        );

        if (userPermissions?.includes(permission.id)) {
          hasPermission.approved = true;
          hasPermission.approved_user = true;
        }
      }
    }

    return hasPermission;
  }
}

export default CheckPermissionService;
