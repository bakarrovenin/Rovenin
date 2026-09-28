import * as migration_20260921_084012_initial from './20260921_084012_initial';

export const migrations = [
  {
    up: migration_20260921_084012_initial.up,
    down: migration_20260921_084012_initial.down,
    name: '20260921_084012_initial'
  },
];
