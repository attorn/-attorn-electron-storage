import { ipcMain } from 'electron';
import { Storage } from '../src';

ipcMain.on('method-rename', () => {
  const store = new Storage({
    name: 'examples/methods/rename',
    instantCreate: true
  });
  // now you have "~/.config/<Your App Name>/examples/methods/rename.json"

  store.rename('newNameGoesHere');
  // now you should have "~/.config/<Your App Name>/examples/methods/newNameGoesHere.json""
});
