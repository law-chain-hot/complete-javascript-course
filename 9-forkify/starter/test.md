# NPM, Babel, Webpack
> The old version
- The difference
    - devDependency
    - Dependency
        - The first one is for dev period
- .ignore
    - $ touch ignore
    - 直接输入文件名/
- Babel新版本用@babel/env语法 （babel-env以前是这样）
- Webpack -> to integrate other file together



---
# The New Part
## How to use Babel
1. install package, and add the module/rule
2. **`creat a config file`**, .babelrc
3. put the **babel-polyfill** into entry



## MVC
![image](https://user-images.githubusercontent.com/57960778/69845223-7a247e00-1235-11ea-92fe-38adc44cc5b6.png)

Model-View-Controller



## Three different ways to import
You can choose each way you like
```js
import str from './model/Search';
// import { sum as s, multiply as m, ID } from './view/searchView';
import * as search from './view/searchView';

console.log(`Using imported function, ${search.sum(search.ID, 3)}, and multiply ${search.multiply(3,5)}, ${str}`);
```



