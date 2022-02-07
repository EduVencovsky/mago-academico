import { Options } from '@mikro-orm/core';
import * as path from 'path';

const mikroOrmConfig: Options = {
  port: 5432,
  user: 'postgres',
  host: 'localhost',
  type: 'postgresql',
  dbName: 'postgres',
  password: 'postgres',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    path: path.resolve(__dirname, './src/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};

export default mikroOrmConfig;
