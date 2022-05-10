import { getRepository, IsNull, Repository } from 'typeorm';

import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICreateProductCategoryDTO from '@modules/warehouse/dtos/ICreateProductCategoryDTO';
import IFindAllWithPaginationAndSearchDTO from '@shared/dtos/IFindAllWithPaginationAndSearchDTO';

import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';

interface IResponseFindAllWithPaginationAndSearch {
  productCategories: ProductCategory[];
  count: number;
}

class ProductCategoriesRepository implements IProductCategoriesRepository {
  private ormRepository: Repository<ProductCategory>;

  constructor() {
    this.ormRepository = getRepository(ProductCategory);
  }

  public async findAll(): Promise<ProductCategory[]> {
    const productCategories = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
      where: {
        parent_id: IsNull(),
      },
    });
    return productCategories;
  }

  public async findGenerateRevenue(): Promise<ProductCategory[]> {
    const productCategories = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
      where: {
        parent_id: IsNull(),
        generate_revenue: true,
      },
    });
    return productCategories;
  }

  public async findById(id: number): Promise<ProductCategory | undefined> {
    const productCategory = await this.ormRepository.findOne(id, {
      relations: ['childCategories', 'parentCategory'],
    });
    return productCategory;
  }

  public async findByName(name: string): Promise<ProductCategory | undefined> {
    const productCategory = await this.ormRepository.findOne({ name });
    return productCategory;
  }

  public async findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch> {
    const { keyword, page, perPage, orderByField, orderBySort } = data;

    const query = this.ormRepository
      .createQueryBuilder('product_categories')
      .take(perPage)
      .skip((page - 1) * perPage)
      .orderBy('created_at', 'DESC');

    if (keyword) {
      query.where('name LIKE :name', { name: `%${keyword}%` });
    }

    // if (orderByField) {
    //   query.orderBy(orderByField, orderBySort || 'ASC');
    // }

    const [productCategories, count] = await query.getManyAndCount();

    return { productCategories, count };
  }

  public async create(
    productCategoryData: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const productCategory = this.ormRepository.create(productCategoryData);

    await this.ormRepository.save(productCategory);

    return productCategory;
  }

  public save(productCategory: ProductCategory): Promise<ProductCategory> {
    return this.ormRepository.save(productCategory);
  }

  public async delete(productCategory: ProductCategory): Promise<void> {
    await this.ormRepository.softRemove(productCategory);
  }
}

export default ProductCategoriesRepository;
