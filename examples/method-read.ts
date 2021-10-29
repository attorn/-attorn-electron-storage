import { ipcMain } from 'electron';
import { Storage } from '../src';

ipcMain.on('method-read', () => {
  const store = new Storage({
    name: 'examples/methods/make',
    defaults: {
      foo: 'bar',
      bar: {
        foo: 'baz',
        baz: 'foo'
      }
    },
    defaultPath: 'downloads',
  });

  const xxx = store.read()
  console.log(
    store.read()
  );
});
