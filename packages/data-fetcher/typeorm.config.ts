import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5632,
  username: 'test',
  password: 'example',
  database: 'countries',
  entities: ['src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
}

const datasource = new DataSource(options)

export default datasource