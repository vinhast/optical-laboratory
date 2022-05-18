import { getManager } from 'typeorm';
import '@shared/infra/typeorm';
import Role from '@modules/users/infra/typeorm/entities/Role';

interface IRequest {
  source: string;
  entity: string;
  page: number;
  keyword: any;
  perPage: number;
  orderByField?: any;
  onlyParent: boolean;
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
    parentId,
    entityId,
  }: IRequest): Promise<IResponse> {
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

    if (entity === 'Order') {
      query.innerJoinAndSelect(`${source}.client`, 'client');
    }

    if (onlyParent) {
      query.where('parent_id IS NULL');
    }

    if (parentId && parentId !== '' && Number(parentId) !== 0) {
      query.where('parent_id = :parentId', { parentId });
    }

    if (entityId && entityId !== '' && Number(entityId) !== 0) {
      query.where('entity_id = :entityId', { entityId });
    }

    if (searchParameters && entity !== 'Stock') {
      query.where(JSON.parse(searchParameters));
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
      query.orderBy('pedidos.id', 'DESC');
    }
    if (entity === 'Download') {
      query.leftJoinAndSelect(
        `${source}.clientApplication`,
        'clients_application',
      );
      query.leftJoinAndSelect(`${source}.user`, 'users');
    }

    let [items] = await query.getManyAndCount();
    const [_, count] = await query.getManyAndCount();

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

    return {
      items,
      itensPerPage: perPage,
      totalItens: count,
      page,
    };
  }
}

export default DataTableService;
