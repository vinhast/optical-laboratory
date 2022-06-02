import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('clients_application_permissions')
class ClientApplicationPermission extends MainEntity {
  @Column()
  name: string;

  @Column()
  method: string;

  @Column()
  base_url: string;

  @Column()
  path: string;

  @Column()
  description: string;
}

export default ClientApplicationPermission;
