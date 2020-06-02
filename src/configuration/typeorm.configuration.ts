import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfiguration: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true
}