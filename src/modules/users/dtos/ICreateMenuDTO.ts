export default interface ICreateMenuDTO {
  parent_id: number | undefined;
  method?: string;
  name: string;
  type: string;
  controller?: string;
  action?: string;
  url?: string;
}
