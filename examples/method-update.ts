import { ipcMain } from 'electron';
import { Storage } from '../src';

ipcMain.on('method-update', () => {
  const store = new Storage({
    name: 'examples/methods/update',
    defaults: {
      foo: 'bar',
      bar: {
        foo: 'baz'
      }
    },
    instantCreate: true
  });
  // { foo: 'bar', bar: { foo: 'baz' } }

  store.update('foo.bar.foo', 'somethingElse');
  // { foo: 'bar', bar: { foo: 'somethingElse' } }
});
