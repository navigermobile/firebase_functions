import admin = require('firebase-admin');
import { seed } from "./collection_seed";
import { CreateMovement } from './seeders/create_movement';

const movement_create_listener = require('./movement_create_listener');
const movement_update_listener = require('./movement_update_listener');

admin.initializeApp();

// seed dummy data for testing
seed();

CreateMovement.run(1000);

exports.movement_create_listener = movement_create_listener.onListen;
exports.movement_update_listener = movement_update_listener.onListen;