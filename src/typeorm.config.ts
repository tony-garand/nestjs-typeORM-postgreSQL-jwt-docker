import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'datawell',
    entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
    synchronize: true,
}

export = typeOrmConfig