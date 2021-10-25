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

## Important

Note that we know this is not a real example of storing application width and height. These examples are just here to give you a better idea of how this library works. To learn more about how to save the height and width of the app, please refer to the link below.
[How to store user data in Electron](https://cameronnokes.com/blog/how-to-store-user-data-in-electron/) by [@ccnokes](https://github.com/ccnokes)

