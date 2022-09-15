import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
    synchronize: true,
}
console.log(process.env);

console.log(typeOrmConfig);

export = typeOrmConfig