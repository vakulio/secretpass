# SecretPass Source - A Simple Password Keeper

SecretPass Source is a password management application built with Angular and Firebase. It allows users to securely store and manage their passwords while ensuring the data is encrypted using the Crypto library.

## Features

- User Registration and Authentication: Users can create an account and log in securely through Firebase authentication.

- Password Encryption: The application utilizes the Crypto library to encrypt and securely store passwords in the Firebase database.

## Installation and Usage

1. Clone the repository to your local machine.

```bash
git clone https://github.com/vakulio/secretpass.git
```

2. Install dependencies.

```bash
cd secretpass-source
npm install
```

3. Configure Firebase:

   - Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
   - Obtain your Firebase config credentials (apiKey, authDomain, databaseURL, projectId, etc.).
   - Replace the Firebase config object in the `src/environments/environment.ts` file with your credentials.

4. Run the application locally.

```bash
ng serve
```

5. Open your web browser and visit [http://localhost:4200](http://localhost:4200) to access the SecretPass application.

## Scripts

- `npm start`: Launches the development server.
- `npm run build`: Builds the production-ready application.
- `npm test`: Runs the test suite.
- `npm run format:check`: Checks the code formatting using Prettier.
- `npm run format:write`: Formats the code using Prettier.
- `npm run lint:check`: Checks the code for linting errors using ESLint.
- `npm run lint:fix`: Fixes the linting errors using ESLint.
- `npm run styles:fix`: Formats the code using Prettier and fixes linting errors using ESLint for styles.

## Dependencies

- `@angular/*`: Angular framework and related modules.
- `@angular/fire`: Firebase integration for Angular applications.
- `crypto-js`: Library for cryptographic functions.
- `ngx-mask`: Library for input masking in Angular.
- `rxjs`: Reactive Extensions for JavaScript.
- `zone.js`: Zone.js for handling asynchronous operations.

## Dev Dependencies

- `@angular-devkit/*`: Angular CLI dev kit modules.
- `@angular-eslint/*`: ESLint plugins for Angular.
- `@typescript-eslint/*`: ESLint plugins for TypeScript.
- `@types/*`: TypeScript type definitions for various libraries.
- `autoprefixer`: PostCSS plugin to parse CSS and add vendor prefixes.
- `cypress`: End-to-end testing framework for web applications.
- `eslint`: JavaScript and TypeScript linter.
- `eslint-config-prettier`: ESLint plugin to turn off conflicting rules with Prettier.
- `eslint-plugin-cypress`: ESLint plugin for Cypress tests.
- `husky`: Git hooks manager for pre-commit checks.
- `jest`: Testing framework for JavaScript.
- `jest-environment-jsdom`: Jest environment for JSDOM.
- `jest-preset-angular`: Jest preset for Angular projects.
- `nx`: Extensible Dev Tools for Monorepos.
- `nx-cloud`: Cloud-based continuous integration and deployment for Nx projects.
- `postcss`: CSS post-processor for transforming styles.
- `prettier`: Code formatter.
- `tailwindcss`: Utility-first CSS framework.
- `ts-jest`: Jest preprocessor with TypeScript support.
- `ts-node`: TypeScript execution environment.
- `typescript`: TypeScript compiler.

## Author

[Vakulio](https://github.com/vakulio)
