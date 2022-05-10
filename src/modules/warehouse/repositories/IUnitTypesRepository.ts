import UnitType from '@modules/warehouse/infra/typeorm/entities/UnitType';
import ICreateUnitTypeDTO from '@modules/warehouse/dtos/ICreateUnitTypeDTO';

export default interface IUnitTypesRepository {
  findAll(): Promise<UnitType[]>;
  findById(id: number): Promise<UnitType | undefined>;
  findByName(name: string): Promise<UnitType | undefined>;
  create(data: ICreateUnitTypeDTO): Promise<UnitType>;
  save(UnitType: UnitType): Promise<UnitType>;
  delete(id: number): Promise<void>;
}
