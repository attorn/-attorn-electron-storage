/**
 * @IMPORTANT @COPYRIGHT => This approach was copied from @ccnokes suggestions. His links are below:
 * https://github.com/ccnokes
 * https://cameronnokes.com/
 * https://twitter.com/ccnokes
 * Github gist: https://gist.githubusercontent.com/ccnokes/95cb454860dbf8577e88d734c3f31e08/raw/7b98c7eaa9c74b40f1a62ceb70116c799b9dd555/store.js
 * article: https://cameronnokes.com/blog/how-to-store-user-data-in-electron/
 */


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


import electron from 'electron';
import fs from 'fs';
import path from 'path';
import { AttornElectronStorage } from '../interface';
import { parseDataFile } from '../helpers';

export class ElectronStorage {
  path: string;
  data: AttornElectronStorage.DefaultsType;

  constructor(opts: AttornElectronStorage.StorageOptObj) {
    const userDataPath = (electron.app).getPath('userData');
    this.path = path.join(userDataPath, opts.configName + '.json');
    this.data = parseDataFile(this.path, opts.defaults);
  }

  /**
   * 
   * @param key should be and existing key in stored json file
   * @returns the value associated with that key
   */
  get<T extends AttornElectronStorage.ValueType>(key: string): T {
    return this.data[key] as T;
  }


  /**
   * 
   * @param key an optional string for the key in out json file
   * @param val the value for that key should be string | number | boolean | object
   */
  set<T extends AttornElectronStorage.ValueType>(key: string, val: T): void {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}
