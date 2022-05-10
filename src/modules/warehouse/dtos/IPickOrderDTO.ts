type Product = {
  quantity: string;
  name: string;
};

export default interface IPickOrderDTO {
  products: Product[];
  batch: { label: string; value: string };
  order: { label: string; value: string };
  date: { label: string; value: string };
  volume: string;
  measure: string;
  weight: string;
  organizer: string;
  checker: string;
  note: string;
  user: string;
}
