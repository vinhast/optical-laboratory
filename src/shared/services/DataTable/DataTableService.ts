import { getManager } from 'typeorm';
import '@shared/infra/typeorm';
import Role from '@modules/users/infra/typeorm/entities/Role';
import moment from 'moment';
import Client from '@modules/commercial/infra/typeorm/entities/Client';
import httpContext from 'express-http-context';
import { notAutoIncrementEntities } from '@shared/infra/typeorm/subscriber/EverythingSubscriber';

interface IRequest {
  source: string;
  entity: string;
  page: number;
  keyword: any;
  perPage: number;
  orderByField?: any;
  onlyParent: boolean;
  notParent: boolean;
  orderBySort: 'ASC' | 'DESC' | undefined;
  searchParameters?: any;
  parentId?: string;
  entityId?: string;
}

interface IResponse {
  items: any[];
  itensPerPage: number;
  totalItens: number;
  page: number;
}

interface IRepository {
  repository: string;
}

class DataTableService {
  public async execute({
    entity,
    source,
    keyword,
    page,
    perPage,
    orderByField,
    orderBySort,
    searchParameters,
    onlyParent,
    notParent,
    parentId,
    entityId,
  }: IRequest): Promise<IResponse> {
    const userData: {
      id: number;
      client_application_id: number;
      role_id: number;
    } = httpContext.get('user');

    const query = getManager()
      .createQueryBuilder(entity, source)
      .take(perPage)

      .skip((page - 1) * perPage)
      .orderBy('created_at', 'DESC');

    if (entity === 'Stock') {
      const { empty, pending, product_category_id } =
        JSON.parse(searchParameters);
      if (pending) {
        query.where('current_stock > 0 AND current_stock < replacement_point');
      }
      if (empty) {
        query.where('current_stock = 0');
      }
      query.innerJoinAndSelect('stocks.product', 'product');
      query.leftJoinAndSelect('product.product_category', 'category');
      if (product_category_id) {
        query.andWhere(`product_category_id = ${product_category_id}`);
      }
    }

    if (!notAutoIncrementEntities.includes(entity)) {
      query.andWhere(
        `${source}.client_application_id = ${userData.client_application_id}`,
      );
    }

    if (entity === 'ProductCategory') {
      query.leftJoinAndSelect(`${source}.parentProductCategory`, 'family');
    }
    if (entity === 'FinancialMoviment') {
      query.leftJoinAndSelect(`${source}.provider`, 'provider');
      query.leftJoinAndSelect(`${source}.client`, 'client');
      query.leftJoinAndSelect(
        `${source}.financialCategory`,
        'financialCategory',
      );
      query.leftJoinAndSelect(
        `${source}.financialSubCategory`,
        'financialSubCategory',
      );
      query.orderBy(`${source}.created_at`, 'DESC');
    }
    if (entity === 'PaymentGateway') {
      query.leftJoinAndSelect(`${source}.paymentModule`, 'paymentModule');
      query.orderBy(`${source}.created_at`, 'DESC');
    }

    if (entity === 'Order') {
      query.innerJoinAndSelect(`${source}.client`, 'client');
    }

    if (onlyParent) {
      query.andWhere(`${source}.parent_id IS NULL`);
    }

    if (notParent) {
      query.andWhere(`${source}.parent_id IS NOT NULL`);
    }

    if (parentId && parentId !== '' && Number(parentId) !== 0) {
      query.where('parent_id = :parentId', { parentId });
    }

    if (entityId && entityId !== '' && Number(entityId) !== 0) {
      query.where('entity_id = :entityId', { entityId });
    }

    if (searchParameters && entity !== 'Stock') {
      const parameters = JSON.parse(searchParameters);

      if (entity === 'FinancialMoviment') {
        if (parameters.finished) {
          query.andWhere(`${source}.finished = "${parameters.finished}"`);
        }
        if (parameters.operation_type) {
          query.andWhere(
            `${source}.operation_type = "${parameters.operation_type}"`,
          );
        }
        if (parameters.start_date) {
          parameters.start_date = moment(parameters.start_date)
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss[Z]');
          query.andWhere(
            `${source}.${parameters.fieldDate || 'due_date'} >= "${
              parameters.start_date
            }"`,
          );
        }
        if (parameters.end_date) {
          parameters.end_date = moment(parameters.end_date)
            .endOf('day')
            .format('YYYY-MM-DDTHH:mm:ss[Z]');

          query.andWhere(
            `${source}.${parameters.fieldDate || 'due_date'} <= "${
              parameters.end_date
            }"`,
          );
        }
      } else {
        query.where(parameters);
      }
    }

    if (keyword) {
      const parsedKeyword = JSON.parse(keyword);
      const keys = Object.keys(parsedKeyword);
      query.where(`${keys[0]} LIKE :${keys[0]}`, {
        [keys[0]]: `%${parsedKeyword[keys[0].toLowerCase()]}%`,
      });
      if (searchParameters && entity !== 'Stock') {
        query
          .where(JSON.parse(searchParameters))
          .andWhere(`${keys[0]} LIKE :${keys[0]}`, {
            [keys[0]]: `%${parsedKeyword[keys[0].toLowerCase()]}%`,
          });
      }
    }

    if (orderByField !== undefined && orderByField !== '') {
      query.orderBy(`${source}.${orderByField}`, orderBySort || 'ASC');
    }
    if (entity === 'Order') {
      query.orderBy(`${source}.id`, 'DESC');
    }
    if (entity === 'Download') {
      query.leftJoinAndSelect(
        `${source}.clientApplication`,
        'clients_application',
      );
      query.leftJoinAndSelect(`${source}.user`, 'users');
    }

    let [items] = await query.getManyAndCount();
    const [, count] = await query.getManyAndCount();

    if (entity === 'User') {
      const roles = await getManager().find(Role);

      if (items) {
        const itemsMutation = items.map((user: any) => {
          const userMutation = user;
          userMutation.role_name = roles.find(
            r => r.id === userMutation.role_id,
          )?.name;
          return userMutation;
        });
        items = itemsMutation;
      }
    }

    if (entity === 'AuditLog') {
      if (items) {
        items.map((value: any) => {
          const messageMutation = value;
          if (value && value.changes) {
            const message = JSON.parse(value.changes)[0];
            if (message.field === 'name') {
              if (value.type === 'update') {
                messageMutation.descriptions = `Campo NOME foi editado de (${message.valueBefore}) para (${message.valueAfter})`;
              }
            }
          }
          if (value.type === 'update') messageMutation.type = 'Edição';
          if (value.type === 'create') messageMutation.type = 'Criação';
          if (value.type === 'delete') messageMutation.type = 'Remoção';
          return messageMutation;
        });
      }
    }

    if (entity === 'FinancialMoviment') {
      if (items) {
        let balance = 0;
        items.map((item: any) => {
          const itemMutation = item;
          if (itemMutation.operation_type === 'C') {
            balance += Number(itemMutation.value);
            itemMutation.balance = balance;
            itemMutation.description = `${item.client.company_name} - ${item.financialCategory.name} - ${item.financialSubCategory.name}  `;
          }
          if (itemMutation.operation_type === 'D') {
            balance -= Number(itemMutation.value);
            itemMutation.balance = balance;
            itemMutation.description = `${item.provider.company_name} - ${item.financialCategory.name} - ${item.financialSubCategory.name}`;
          }
          return itemMutation;
        });
      }
    }

    return {
      items,
      itensPerPage: perPage,
      totalItens: count,
      page,
    };
  }
}

export default DataTableService;
