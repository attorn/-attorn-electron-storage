import { ipcMain } from 'electron';
import { Storage } from '../src';

ipcMain.on('method-create', () => {
  const store = new Storage({
    name: 'examples/methods/create',
    defaults: {
      foo: 'bar',
      bar: {
        foo: 'baz'
      }
    },
    defaultPath: 'downloads',
    instantCreate: false // look at it
  });

  store.create();
  // will create "downloads/examples/methods/create.json" and writes "defaults" on it.
});
