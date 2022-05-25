export default interface IStorageProvider {
  saveFile(file: string, client_application_id?: number): Promise<string>;
  deleteFile(file: string, client_application_id?: number): Promise<void>;
}
