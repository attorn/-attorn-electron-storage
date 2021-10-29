import { ipcMain } from 'electron';
import { Storage } from '../src';

ipcMain.on('method-destroy-file', () => {
  // if you have "~/.config/<Your App Name>/examples/methods/destroyFile.json", you can do:

  const store = new Storage({
    name: 'examples/methods',
  });

  store.destroyFile('destroyFile');

  // now you have "~/.config/<Your App Name>/examples/methods"
});
