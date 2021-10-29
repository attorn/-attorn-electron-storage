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


export namespace AttornElectronStorage {

  /**
   * All the types which users are supposed to store in a json format
   */
  export type ValueType = string | number | boolean | object;


  /**
   * A json format should be like this
   */
  export type DefaultsType = {
    [name: string]: ValueType;
  }


  /**
   * All locations which can be used as the storage directory.
   * by default we use "userData"
   */
  type defaultPaths = 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps';


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
   * @instantMake it is "false" by default. if "true", you will receive the storage location when you create
   *              the instance of this class. But if it is "false", you can use the "make" method later
   *              to create the storage
   */
  export interface StorageOptObj {
    name: string;
    defaults?: DefaultsType;
    defaultPath?: defaultPaths;
    instantCreate?: boolean;
  }

}
