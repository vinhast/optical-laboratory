export default interface ICreateProductCategoryDTO {
  name: string;
  parent_id: number | undefined;
  generate_revenue?: boolean;
}
