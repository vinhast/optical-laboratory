import { createConnection, getConnectionOptions } from 'typeorm';
import EverythingSubscriber from './subscriber/EverythingSubscriber';

getConnectionOptions().then(connectionOptions => {
  return createConnection(
    Object.assign(connectionOptions, {
      subscribers: [EverythingSubscriber],
    }),
  );
});

// createConnection();
