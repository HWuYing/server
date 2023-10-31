import { InjectorToken } from "@fm/di";
export const SYNC = 'Sync';
export const ENTITY = 'Entity';
export const COLUMN = 'Column';
export const DATABASE = 'database';
export const HAS_ONE = 'hasOne';
export const HAS_MANY = 'hasMany';
export const BELONGS_TO = 'belongsTo';
export const BELONGS_TO_MANY = 'belongsToMany';
export const ENTITY_QUEUE = InjectorToken.get('ENTITY_QUEUE');
