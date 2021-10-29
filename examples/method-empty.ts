import { ipcMain } from 'electron';
import { Storage } from '../src';

ipcMain.on('method-empty', () => {
  const store = new Storage({
    name: 'examples/methods/empty',
    defaults: {
      foo: 'bar',
      bar: {
        foo: 'baz'
      }
    },
    instantCreate: true
  });
  // { foo: 'bar', bar: { foo: 'baz' } }

  store.empty();
  // { }
});
