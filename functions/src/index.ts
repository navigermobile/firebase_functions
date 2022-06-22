import admin = require('firebase-admin');
import { seed } from "./collection_seed";

const movement_listener = require('./movement_listener');

admin.initializeApp();

// seed dummy data for testing
seed();

exports.movement_listener = movement_listener.onListen;