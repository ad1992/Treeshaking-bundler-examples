# Treeshaking-bundler-examples

This repository contains example for treeshaking across different bundlers.
Currently I have added the below bundlers :point_down:

1. [`esbuild`](https://esbuild.github.io/)
2. [`webpack`](https://webpack.js.org/)

The `examples` folder has some code snippets and inside `dist` folder you can find the output of bundlers.

## Bundler behaviour

Here are my observations with the bundlers for each example. Each example has some code snippets and `index.js` which is basically the entry file which the bundler is targetting.

I have created two bundles for each bundler, one for development (unminified) and one for production (minified).

### Pure Javascript code with no imports

This resides in the file [pureJSWithNoDeps](https://github.com/ad1992/Treeshaking-bundler-examples/tree/main/examples/pureJSWithNoDeps). As you can see there are no imports and very minimal JS code.
In [index.js](https://github.com/ad1992/Treeshaking-bundler-examples/tree/main/examples/pureJSWithNoDeps/index.js), I am only importing `isAndroid`.

Lets look at how the bundlers treat this code

#### Webpack

In ` development`` mode, it imports the color palette along with  `isAndroid`, which shouldn't be happening. You can view the bundle [here](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/dist/webpack/pureJSWithNoDeps.bundle.js)

However in `production` mode it only imports `isAndroid` which is correct. You can view the bundle [here](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/dist/webpack/pureJSWithNoDeps.bundle.min.js)

#### ESBuild

The bundle imports the color palette and `isAndroid` in both development and production builds. There is no discrepancy between prod and dev build, however color palette shouldn't be imported.

-------

Ideally color palette shouldn't be imported as its not being used. However Esbuild imports it, its not able to remove the imports which are being imported on top of the file ? So tree shaking needs to be improved in ESBuild.

However in Webpack, the development build contains color palette and production build doesn't, I am not sure why there is discrepancy between the different environment builds.



### Pure Javascript code with non ESM imports

This resides in the file [withNonESMDeps](https://github.com/ad1992/Treeshaking-bundler-examples/tree/main/examples/withNonESMDeps). As you can see I am importing `version` from `react` in [utils](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/examples/withNonESMDeps/utils.js) and `open-color` in [colors.js](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/examples/withNonESMDeps/colors.js)

In [index.js](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/examples/withNonESMDeps/index.js), I am importing only a constant `isAndroid`.

Lets look at how the bundlers treat this code

#### ESBuild

In [development](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/dist/webpack/withNonESMDeps.bundle.js) and [production](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/dist/esbuild/withNonESMDeps.bundle.min.js) builds `react` and `open-color` gets bundled as well.

#### Webpack

In [devlopment](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/dist/webpack/withNonESMDeps.bundle.js), `react`, `color paltte`, `checkReactVersion` gets bundled along with `isAndroid`.

In [production](https://github.com/ad1992/Treeshaking-bundler-examples/blob/main/dist/webpack/withNonESMDeps.bundle.min.js), `react` still gets bundled with `isAndroid`.

-------

`ESBuild` is always bundling whatever is imported on top of the file irrespective of whether its being used in target file (index.js). 

However `Webpack` always has discrepancies between prod and dev builds and additionally `react` is gettin bundled in both builds irrespective of whether used in target file (index.js).

One *interesting* observation - Even if you try removing the function `checkReactVersion` and leave the React import, still it will get bundled in both webpack and esbuild.