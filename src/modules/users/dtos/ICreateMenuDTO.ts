export default interface ICreateMenuDTO {
  parent_id: number | undefined;
  method?: string;
  name: string;
  controller?: string;
  action?: string;
  url?: string;
  icon?: string;
}
