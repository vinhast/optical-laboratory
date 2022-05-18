export default interface ICreateDownloadDTO {
  title: string;
  description: string;
  dir?: number;
  attachment?: string;
  active?: boolean;
  user_id?: number;
}
