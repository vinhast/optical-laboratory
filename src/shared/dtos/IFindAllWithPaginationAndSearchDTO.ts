export default interface IFindAllWithPaginationAndSearchDTO {
  page: number;
  perPage: number;
  keyword: string;
  orderByField: string;
  orderBySort: string;
}
