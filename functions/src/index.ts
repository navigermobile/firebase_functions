import admin = require('firebase-admin');
import { CreateMovement } from './seeders/create_movement';
import { CreateUser } from './seeders/create_user';

const movement_create_listener = require('./movement_create_listener');
const movement_update_listener = require('./movement_update_listener');

admin.initializeApp();


CreateUser.run();
CreateMovement.run(1);

exports.movement_create_listener = movement_create_listener.onListen;
exports.movement_update_listener = movement_update_listener.onListen;