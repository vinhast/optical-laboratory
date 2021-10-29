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

const notNormalizedEntities = ['AuditLog', 'User', 'Menu'];

@EventSubscriber()
export default class EverythingSubscriber implements EntitySubscriberInterface {
  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    const nameEntity = event.metadata.name;
    if (!notNormalizedEntities.includes(nameEntity)) {
      const keys = Object.keys(event.entity);
      keys.map(key => {
        if (
          event.entity[key] &&
          event.entity[key].toString().includes('GMT') &&
          moment(event.entity[key], moment.ISO_8601, true).isValid()
        ) {
          event.entity[key] = addHours(event.entity[key], 3);
        }
        if (typeof event.entity[key] === 'string') {
          event.entity[key] = this.sanitizeValue(event.entity[key]);
        }
      });
    }
  }

  /**
   * Called before entity insertion.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    const nameEntity = event.metadata.name;
    if (!notNormalizedEntities.includes(nameEntity)) {
      const keys = Object.keys(event.entity);
      keys.map(key => {
        if (
          event.entity[key] &&
          event.entity[key].toString().includes('GMT') &&
          moment(event.entity[key], moment.ISO_8601, true).isValid()
        ) {
          event.entity[key] = addHours(event.entity[key], 3);
        }
        if (typeof event.entity[key] === 'string') {
          event.entity[key] = this.sanitizeValue(event.entity[key]);
        }
      });
    }
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
        const entity_id = event.entity.id;
        const userData = httpContext.get('user');
        const user = await event.manager
          .getRepository(User)
          .findOne(userData.id);
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
    // console.log(event.entity, '<- Entity depois da inserção');
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
          if (value.propertyName !== 'password') {
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
      // console.log(entity, '<- entity after load');
      const value = entity[key];
      if (value) {
        if (moment(value, moment.ISO_8601, true).isValid()) {
          if (value.toString().includes('GMT')) {
            const valueDate = new Date(value);
            // console.log(key, '<- key after load');
            // console.log(value, '<- Value after load');
            // console.log(value.toString(), '<- Value to string after load');
            // console.log(valueDate, '<- Value to string after load');
            // moment.locale('pt-br');
            // entity[key] =
            //   value.length === 10
            //     ? moment.utc(value).format('DD/MM/YYYY')
            //     : moment.utc(value).format('DD/MM/YYYY HH:mm:ss');
            // entity[key] =
            //   value.length === 10
            //     ? moment.utc(value).format('DD/MM/YYYY')
            //     : moment.utc(value).format('DD/MM/YYYY HH:mm:ss');
            entity[key] = valueDate.toISOString().includes('00:00:00')
              ? moment.utc(value).format('DD/MM/YYYY')
              : moment.utc(value).format('DD/MM/YYYY HH:mm:ss');
          }
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

  sanitizeValue(str: string): String {
    let value: string;
    if (this.hasJsonStructure(str)) {
      const object: IValueObject = JSON.parse(str);
      Object.entries(object).forEach(([k, v]) => {
        if (typeof v === 'string') {
          object[k] = v
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/gi, '')
            .trim();
        }
      });
      value = JSON.stringify(object);
    } else {
      value = str
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
    }
    return value;
  }
}
