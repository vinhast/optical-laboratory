import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface IUploadConfig {
  driver: 'disk' | 's3';

  tempFolder: string;
  uploadsFolder: string;
  clientsApplicationFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};

    s3: {
      bucket: string;
    };
  };
}

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tempFolder, 'uploads');

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder,
  clientsApplicationFolder: path.resolve(uploadsFolder, 'clientsAplication'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    s3: {
      bucket: 'app-optical_laboratory',
    },
  },
} as IUploadConfig;
