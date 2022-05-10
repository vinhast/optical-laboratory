export default interface ICreateCreditDTO {
  client_id: number;
  order_id?: number;
  user_id: number;
  description: string;
  value: string;
  date: Date;
  used: string;
  used_at?: Date;
}
