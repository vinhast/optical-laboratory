import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  generate(user_id: number): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
