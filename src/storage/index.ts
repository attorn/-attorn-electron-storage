// MIT License
//
// Copyright (c) 2021 Attorn Studio by qafoori
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


import { app } from 'electron';
import { readdirSync, readFileSync, rmSync, mkdirSync, writeFileSync, rmdirSync, renameSync } from 'fs';
import { join } from 'path';
import { AttornElectronStorage } from '../interface';



export class ElectronStorage {
  userPath: string;
  name: string;
  path: string = '';
  defaults: AttornElectronStorage.DefaultsType | {};


  /**
   * @name: this is the name of the storage space you want to create.
   *        This can be a simple name like "user-theme-preferences" (which will create the storage directly in
   *        "defaultPath") or you can pass multiple names with forward slashes like "user/preferences/theme"
   *        to create directories first.
   *        Note that the last name is the file name (theme.json) and the previous names are the names of
   *        the folders that contain it
   *
   * @defaults its an optional argument. you can pass an object by this argument to store that object by default
   *
   * @defaultPath by default. it is "userData" which is defined blow:
   *              in Linux OS: ~/.config/<Your App Name>
   *              in Windows OS: C:\Users\<you>\AppData\Local\<Your App Name>
   *              in Mac OS: ~/Library/Application Support/<Your App Name>
   *              __ but you can choose other directories (defined in "AttornElectronStorage.defaultPaths")
   *
   * @instantCreate it is "false" bu default. if "true", you will receive the storage location when you create
   *              the instance of this class. But if it is "false", you can use the "make" method later
   *              to create the storage
   */
  constructor({
    name, defaults, defaultPath, instantCreate
  }: AttornElectronStorage.StorageOptObj) {
    this.userPath = app.getPath(defaultPath || 'userData');
    this.defaults = defaults || {};
    this.name = name;

    if (instantCreate) {
      this.getOrCreatePath();
    }
  }



  /**
   * If you do not want to set the actual "instantCreate" value at the build level (constructor),
   * you can easily call this method whenever you want. It creates the storage space you want
   */
  create() {
    return this.getOrCreatePath()
  };



  /**
   * Not usable in common applications! This method is called at build time (constructor) and realizes that
   * if it does not have storage space, it will create it. use method "create()" instead of this.
   */
  getOrCreatePath(): string {
    if (this.name.includes('/')) { // create folder first
      let name: string | string[] = this.name.split('/');
      const fileName = this.name.split('/').pop()!.concat('.json');
      name.pop();
      name = name.join('/');

      try {
        const items = readdirSync(join(this.userPath, name));
        if (items) {
          const fullPath = join(join(this.userPath, name), fileName);
          writeFileSync(fullPath, JSON.stringify(this.defaults));
          return fullPath;
        }
        throw { code: 'ENOENT' }
      }
      catch (error) {
        if (error?.code === 'ENOENT') { // no such file or directory
          const folders = name.split('/');
          let userPath = this.userPath;
          folders.forEach(folder => {
            userPath = join(userPath, folder);
            mkdirSync(userPath);
          })
          const fullPath = join(userPath, fileName);
          writeFileSync(fullPath, JSON.stringify(this.defaults));
          return fullPath;
        }
        else { // other errors
          return '';
        }
      }

    }
    else { // create file immediately
      const fullPath = join(this.userPath, this.name.concat('.json'));
      writeFileSync(fullPath, JSON.stringify(this.defaults));
      return fullPath;
    }
  }



  /**
   * You can get the value(s) which already exists in a storage space with this method
   * @param wanted If you specify this argument, you can get a specified value of a storage space.
   *              This can be a simple name like "myKey" (which only has access to the first level of an object)
   *              or you can pass multiple names with dots like "myKey1.myKey2.myKey3"
   *              to penetrate the inner levels and get the value.
   * @returns by default returns "AttornElectronStorage.ValueType" but you can use generic types to
   *          specify the exact type
   */
  read<T extends AttornElectronStorage.ValueType>(wanted?: string): T | null {
    const data = <AttornElectronStorage.DefaultsType>this.parseDataFile();
    if (data) {
      if (wanted) {
        const wantedArray = wanted.split('.');
        let value: any | AttornElectronStorage.ValueType | AttornElectronStorage.DefaultsType = data;
        wantedArray.forEach(item => value = value[item]);
        return value! as T || null;
      }
      return data as unknown as T;
    }
    return null;
  }



  /**
   * Not usable in common applications! We use this method in this package
   * to get what is in a storage space and manipulate it depending on our needs.
   * it better for you to use "get" method instead of this.
   *
   * @returns object if exist or null if is not exist
   */
  parseDataFile = (): null | object => {
    const filePath = join(this.userPath, this.name.concat('.json'))

    try {
      return JSON.parse(readFileSync(filePath, 'utf-8'));
    }
    catch (error) {
      return this.defaults || null;
    }
  }



  /**
   * you can use this method to remove an existing file (means storage)
   * @param fileName to specify which file you want to destroy in the directory.
   *                  Note that if you want to use this method, when creating a new instance of the class,
   *                  if you want to use / between directory names, do not specify the file name there
   *                  and specify only the names of the folders that contain that file you want to destroy.
   */
  destroyFile(fileName: string): void {
    try {
      const fullPath = join(join(this.userPath, this.name), fileName.concat('.json'));
      rmSync(fullPath);
    } catch (error) {
      throw error;
    }
  }



  /**
   * Using this method, you can destroy a folder, no matter how nested that file is
   * @param safely For added security, this argument is set to "true" by default.
   *                If "safely" is true, folders that contain things cannot be destroyed.
   *                But to ignore this security, you can pass the "false" value to this method to
   *                forcefully destroy that folder
   */
  destroyFolder(safely: boolean = true): void {
    try {
      const fullPath = join(this.userPath, this.name);
      rmdirSync(fullPath, { recursive: !safely });
    } catch (error) {
      throw error;
    }
  }




  /**
   * This is a very practical method. When you want to change a value in an existing data
   * (no matter how nested the key to that value), you can use the method.
   * @param replace This is the path of that key you want to change the value of.
   *                This can be a simple name like "myKey" (which only has access to the first level of an object)
   *                or you can pass multiple names with dots like "myKey1.myKey2.myKey3"
   *                to penetrate the inner levels and get the value.
   * @param by you need to pass this argument to determine what is to be replaced.
   *            it can be one of the types in "AttornElectronStorage.ValueType".
   */
  update(replace: string, by: AttornElectronStorage.ValueType): void {
    try {
      let data: any = this.read();
      const pList = replace.split('.');
      const key = <string>pList.pop();
      const pointer = pList.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue] === undefined) {
          accumulator[currentValue] = {};
        }
        return accumulator[currentValue];
      }, data);
      pointer[key] = by;
      const fullPath = join(this.userPath, this.name.concat('.json'));
      writeFileSync(fullPath, JSON.stringify(data));
    }
    catch (e) {
      throw e
    }
  }



  /**
   * Using this method you can completely clear the values in a storage space and make it the default.
   * default is "{}"
   */
  empty(): void {
    try {
      const fullPath = join(this.userPath, this.name.concat('.json'));
      writeFileSync(fullPath, JSON.stringify({}));
    } catch (e) {
      throw e;
    }
  }



  /**
   * use this method to rename an existing file in the storage.
   * @param newName This name will be replaced with a pre-existing name.
   *                Note that unlike the "destroyFile" method, if you want to use / between names,
   *                you must specify the file name.
   */
  rename(newName: string): void {
    try {
      const fullPath = join(this.userPath, this.name.concat('.json'));
      const newFullPath = join(this.userPath, newName.concat('.json'));
      renameSync(fullPath, newFullPath);
    } catch (error) {
      throw error;
    }

  }


  /**
   * With this method you can get everything that is in a storage space (folder).
   */
  list(): string[] {
    try {
      return readdirSync(join(this.userPath, this.name));
    }
    catch (error) {
      throw error
    }
  }
}
