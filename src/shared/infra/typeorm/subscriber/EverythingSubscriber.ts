/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import httpContext from 'express-http-context';
import moment from 'moment';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import { addHours } from 'date-fns';
import AuditLog from '../entities/AuditLog';

interface ILogChanges {
  field: string;
  valueBefore: string;
  valueAfter: string;
}

interface ILog {
  user_id: string;
  type: string;
  entity: string;
  entity_id: string;
  changes: ILogChanges[];
  descriptions: string;
}

interface IEntity {
  [key: string]: string;
}

interface IValueObject {
  [key: string]: string;
}

const notAutoIncrementEntities = [
  'AuditLog',
  'Menu',
  'ClientApplication',
  'ClientApplicationUser',
];
const notGetChangesFields = ['password', 'token', 'token_validate'];
const notModifyDateField = ['created_at', 'updated_at', 'deleted_at'];

@EventSubscriber()
export default class EverythingSubscriber implements EntitySubscriberInterface {
  /**
   * Called before entity insertion.
   */
  async beforeInsert(event: InsertEvent<any>) {
    const nameEntity = event.metadata.name;
    const keys = Object.keys(event.entity);
    keys.map(key => {
      if (
        event.entity[key] &&
        event.entity[key].toString().includes('GMT') &&
        moment(event.entity[key], moment.ISO_8601, true).isValid()
      ) {
        event.entity[key] = addHours(event.entity[key], 3);
      }
    });
    if (!notAutoIncrementEntities.includes(nameEntity)) {
      const userData = httpContext.get('user');
      const lastRegister: any = await event.manager
        .getRepository(nameEntity)
        .createQueryBuilder()
        .select(`Max(id) as id`)
        .where(`client_application_id = "${userData.client_application_id}"`)
        .getRawOne();
      event.entity.id = 1;
      event.entity.client_application_id = userData.client_application_id;
      if (lastRegister) {
        event.entity.id = lastRegister.id + 1;
      }
    }
  }

  /**
   * Called before entity insertion.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    const keys = Object.keys(event.entity);
    keys.map(key => {
      if (
        event.entity[key] &&
        event.entity[key].toString().includes('GMT') &&
        moment(event.entity[key], moment.ISO_8601, true).isValid()
      ) {
        event.entity[key] = addHours(event.entity[key], 3);
      }
    });
  }

  /**
   * Called before entity insertion.
   */
  beforeRemove(event: RemoveEvent<any>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }

  /**
   * Called after entity insertion.
   */
  async afterInsert(event: InsertEvent<any>) {
    const entity = event.metadata.name;
    if (entity !== 'AuditLog' && entity !== 'UserToken') {
      if (event.entity) {
        const userData = httpContext.get('user');
        const client_application_id = userData.client_application_id;
        const user = await event.manager.getRepository(User).findOne({
          id: userData.id,
          client_application_id,
        });
        const entity_id = event.entity.id;
        const type = 'create';
        const ormRepository = event.manager.getRepository(AuditLog);
        const descriptions = `Registro criado por ${user?.name}`;
        const auditLog = ormRepository.create({
          type,
          descriptions,
          entity,
          entity_id,
          user_id: userData.id,
        });
        await ormRepository.save(auditLog);
      }
    }
  }

  /**
   * Called after entity insertion.
   */
  async afterUpdate(event: UpdateEvent<any>) {
    if (event.entity) {
      const entity = event.metadata.name;
      const entityDataBase = event.databaseEntity;
      const user = httpContext.get('user');
      const entity_id = entityDataBase.id;
      const changes: ILogChanges[] = [];
      let type = 'update';
      if (event.updatedColumns.length > 0) {
        event.updatedColumns.forEach(value => {
          if (!notGetChangesFields.includes(value.propertyName)) {
            const field = value.propertyName;
            const valueBefore = value.getEntityValue(event.databaseEntity);
            const valueAfter = value.getEntityValue(event.entity);
            if (changes.filter(item => item.field === field).length === 0) {
              changes.push({
                field,
                valueAfter,
                valueBefore,
              });
            }
          }
        });
      } else if (
        entityDataBase.deleted_at !== undefined &&
        entityDataBase.deleted_at === null
      ) {
        const ormRepository = event.manager.getRepository(entity);
        const recordExists = await ormRepository.count(entity_id);
        if (!recordExists) {
          type = 'delete';
        }
      }
      if (changes.length > 0 || type === 'delete') {
        const ormRepository = event.manager.getRepository(AuditLog);
        const auditLog = ormRepository.create({
          type,
          entity,
          entity_id,
          changes: JSON.stringify(changes),
          user_id: user.id,
        });
        await ormRepository.save(auditLog);
      }
    }
  }

  /**
   * Called after entity insertion.
   */
  /* afterRemove(event: RemoveEvent<any>) {
    console.log(
      `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  } */

  /**
   * Called after entity is loaded.
   */
  afterLoad(entity: IEntity) {
    Object.keys(entity).forEach(function (key) {
      const value = entity[key];
      if (value) {
        if (!notModifyDateField.includes(key)) {
          if (moment(value, moment.ISO_8601, true).isValid()) {
            if (value.toString().includes('GMT')) {
              const valueDate = new Date(value);
              entity[key] = valueDate.toISOString().includes('00:00:00')
                ? moment.utc(value).format('DD/MM/YYYY')
                : moment.utc(value).format('DD/MM/YYYY HH:mm:ss');
            }
          }
        } else {
          const valueDate = new Date(
            new Date(value).toISOString().slice(0, -1),
          );
          entity[key] = moment.utc(valueDate).format('DD/MM/YYYY HH:mm:ss');
        }
      }
    });
  }

  hasJsonStructure(str: String): Boolean {
    if (typeof str !== 'string') return false;
    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === '[object Object]' || type === '[object Array]';
    } catch (err) {
      return false;
    }
  }
}
