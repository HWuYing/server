import { Type } from '@fm/di';
import { Sequelize } from 'sequelize';
export declare function getFactoryEntity(type: Type<any>): void;
export declare class DBManager {
    sequelize: Sequelize | null;
    private em;
    dbConfig: Record<string, any>;
    getSequelize(): Sequelize;
    private connection;
    register(): Promise<void>;
}
