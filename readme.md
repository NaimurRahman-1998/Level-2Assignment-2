# Level-2 Assignemnt-2 Mongoose Express CRUD Mastery

## 1. Open Terminal . clone git repository

```bash
git clone https://github.com/NaimurRahman-1998/Level-2Assignment-2.git
```

### go to the repository directory

```bash
cd Level-2Assignment-2
```

### open vsCOde

```bash
code .
```

## 3. Install npm and all dependencies:

```bash
npm install
```

## 4. Create a `.env` file and add the following environment variables:

a. `PORT`  
b. `DATABASE_URL`  
c. `SALT_ROUNDS`

all the environment variables are configured in `./src/app/config/index.ts`

## 5. run the following command to start the project in development mode:

```bash
npm run start:dev
```

## 6. To run the project in production mode:

a. build the project

```bash
npm run build
```

b. run server

```bash
npm start
```

## 7. Available commands:

```json
"start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",

"start": "node ./dist/server.js",

"lint": "eslint src --ignore-path .eslintignore --ext .ts",

"lint:fix": "npx eslint src --fix",

"build": "tsc",

"build:w": "tsc -w",

"prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",

"prettier:fix": "npx prettier --write src"
```

## 8. Server will start in `http://localhost:5000`
