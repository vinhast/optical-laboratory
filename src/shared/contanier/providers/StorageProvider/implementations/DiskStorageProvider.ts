import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(
    file: string,
    client_application_id?: number,
  ): Promise<string> {
    if (client_application_id) {
      const clientApplicationDir = `${uploadConfig.clientsApplicationFolder}/${client_application_id}`;
      const findFolder = fs.existsSync(clientApplicationDir);
      if (!findFolder) {
        fs.mkdirSync(clientApplicationDir);
      }
      await fs.promises.rename(
        path.resolve(uploadConfig.tempFolder, file),
        path.resolve(
          `${uploadConfig.clientsApplicationFolder}/${client_application_id}`,
          file,
        ),
      );
    } else {
      await fs.promises.rename(
        path.resolve(uploadConfig.tempFolder, file),
        path.resolve(uploadConfig.uploadsFolder, file),
      );
    }

    return file;
  }

  public async deleteFile(
    file: string,
    client_application_id?: number,
  ): Promise<void> {
    let filePath;
    if (client_application_id) {
      filePath = path.resolve(
        `${uploadConfig.clientsApplicationFolder}/${client_application_id}`,
        file,
      );
    } else {
      filePath = path.resolve(uploadConfig.uploadsFolder, file);
    }
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
