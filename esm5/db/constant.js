import { InjectorToken } from '@fm/di';
export var SYNC = 'Sync';
export var TABLE = 'Table';
export var ENTITY = 'Entity';
export var COLUMN = 'Column';
export var ASSOCIATION = 'Association';
export var DATABASE = 'database';
export var HAS_ONE = 'hasOne';
export var HAS_MANY = 'hasMany';
export var BELONGS_TO = 'belongsTo';
export var BELONGS_TO_MANY = 'belongsToMany';
export var TRANSACTION = 'Transaction';
export var ENTITY_QUEUE = InjectorToken.get('ENTITY_QUEUE');
