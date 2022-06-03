import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

export type FinancialCategoryType = 'C' | 'D';

@Entity('financial_categories')
class FinancialCategory extends MainEntity {
  @Column()
  parent_id?: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['C', 'D'] })
  type: FinancialCategoryType;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(
    () => FinancialCategory,
    financialCategory => financialCategory.childCategories,
  )
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  parentCategory: FinancialCategory;

  @OneToMany(
    () => FinancialCategory,
    financialCategory => financialCategory.parentCategory,
  )
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  childCategories: FinancialCategory[];
}

export default FinancialCategory;
