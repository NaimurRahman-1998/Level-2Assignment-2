1. initialize

```
npm init --y
npm i express
npm i mongoose
npm i --save-dev typescript
npm i dotenv
npm i cors
npm i --save-dev @types/express
npm i --save-dev @types/cors
npm i ts-node-dev --save-dev
tsc --init
```

2. change root dir and out dir
4. create express app
5. create `.env` file
6. connect mongoose in env file

```
DATABASE_URL=mongodb+srv://admin-um:admin12345@cluster0.gexkyvp.mongodb.net/firstProject?retryWrites=true&w=majority
```

in server.ts

```js
async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    app.listen(process.env.PORT, () => {
      console.log(`server running on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
```

7. config the path of .env

```js
my-project/
  |- src/app/config/index.ts

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path : path.join(process.cwd() , '.env')})

export default{
    port : process.env.PORT,
    db_url : process.env.DATABASE_URL
}
```

8. install eslint and prettier https://blog.logrocket.com/linting-typescript-eslint-prettier
8.1
```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npx eslint --init
npm install --save-dev prettier
npm install eslint prettier --save-dev
npm install --save-dev eslint-config-prettier
```

8.2 eslint config
```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-unused-vars": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-console": "warn",
    "no-undef": "error"
  },
  "globals": {
    "process": "readonly"
  }
}

```
8.3 create .eslintignore
```
node_modules
dist
```

8.4 create .prettierrc.json
```
{
  "semi": true,
  "singleQuote": true,
  "arrowParens": "avoid"
}

```
8.5 wrtie npm script for eslint and ts
```
  "scripts": {
    "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "lint:fix": "npx eslint src --fix",
    "build": "tsc",
    "build:w": "tsc -w",
    "test": "echo \"Error: no test specified\" && exit 1",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src"
  },
```
