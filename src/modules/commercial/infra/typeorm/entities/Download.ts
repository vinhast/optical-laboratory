import User from '@modules/users/infra/typeorm/entities/User';
import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Expose } from 'class-transformer';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import uploadConfig from '@config/upload';

@Entity('downloads')
class Download extends MainEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dir?: number;

  @Column()
  attachment?: string;

  @Column()
  active: boolean;

  @Column()
  user_id?: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Expose({ name: 'attachment_url' })
  getattachment_url(): string | null {
    if (!this.attachment) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.attachment}`;
      case 's3':
        return `https://${uploadConfig.config.s3.bucket}.s3.amazonaws.com/${this.attachment}`;
      default:
        return null;
    }
  }
}

export default Download;
