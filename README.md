## Getting started

#### The `@attorm/electron-storage` package
The `@attorm/electron-storage` package is a really light, simple and convenient package that has been implemented for use in the `Attorn` project. 
Because the `Attorn` project has a significant number of different packages, and in some of them file storage was used, we built this package to use it where needed in the `Attorn` project.

You can also use it in your electron projects by reading these documents and understanding how `@attorm/electron-storage` works.

------------


#### Important
Please note that the solutions used in this package are suggested by Ccnokes and we only converted these solutions to TypeScript and then to a package. Ccnokes links are placed in the following section due to compliance with copyright laws.

1. [Github account](https://github.com/ccnokes)
2. [Website](https://cameronnokes.com/)
3. [Twitter](https://twitter.com/ccnokes)
4. [Github gist](https://gist.githubusercontent.com/ccnokes/95cb454860dbf8577e88d734c3f31e08/raw/7b98c7eaa9c74b40f1a62ceb70116c799b9dd555/store.js)
5. [Article](https://cameronnokes.com/blog/how-to-store-user-data-in-electron/)





## HOW TO USE

This examples shows how to use this package in your electron application:

------------


## Import class
You'll have two way to import `Electronstorage` into your app.

1. with webpack configuration:
```ts
import { ElectronStorage } from '@attorn/electron-storage';
```
2. with common javascript module:
```ts
const ElectronStorage =  require('@attorn/electron-storage');
```

------------


## Use class
In order to use the `Electronstorage` class you have to firstly make an instace of it. Well, suppose we want to store the last height and width of the application was when the user closed the application. For that, we will create an instance of the `Electronstorage` class with some properties:

```ts
const store = new Store({
	configName: 'user-preferences',
	defaults: {
		windowBounds: { width: 800, height: 600 }
	}
});
```

------------

## Get Value
This example shows how we can read the width and height value we have already stored:
```ts
let { width, height } = store.get('windowBounds');
```

------------



## Set Value
And this example shows how we can replace the previous values with a new one:
```ts
store.set('windowBounds', { width, height });
```

------------


------------

## Note

Note that we know this is not a real example of storing application width and height. These examples are just here to give you a better idea of how this library works. To learn more about how to save the height and width of the app, please refer to the link below.
[How to store user data in Electron](https://cameronnokes.com/blog/how-to-store-user-data-in-electron/) by [@ccnokes](https://github.com/ccnokes)

