import { inject, injectable } from 'tsyringe';

import IPickOrderRepository from '@modules/warehouse/repositories/IPickOrderRepository';
import PickOrderGenerator from '@modules/warehouse/helper/PickOrderGenerator';

interface IRequest {
  id: number;
  userId: number;
}

@injectable()
class CreateService {
  constructor(
    @inject('PickOrderRepository')
    private pickOrderRepository: IPickOrderRepository,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<string> {
    const pickOrder = await this.pickOrderRepository.findOne(id, userId);

    const pickOrderGenerator = new PickOrderGenerator(pickOrder);
    const fileName = pickOrderGenerator.generate();

    return fileName;
  }
}

export default CreateService;
