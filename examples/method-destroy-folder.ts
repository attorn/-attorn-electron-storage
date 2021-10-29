import { ipcMain } from 'electron';
import { Storage } from '../src';

ipcMain.on('method-destroy-folder', () => {
  // if you have "~/.config/<Your App Name>/examples/methods/destroyFile.json", you can do:

  const store = new Storage({
    name: 'examples/methods',
  });

  store.destroyFolder();

  // because "methods" contains "destroyFile.json" you can not delete "methods" but if go like this:
  store.destroyFolder(true);
  // you will have "~/.config/<Your App Name>/examples"
});
