import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfiguration: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'nest',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true
}