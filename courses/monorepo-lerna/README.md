# Monorepo Tutorial using Lerna

## YouTube Video

[![Just Enough monorepo tutorial youtube thumbnail](http://img.youtube.com/vi/N5pjlJnzrSw/0.jpg)](http://www.youtube.com/watch?v=N5pjlJnzrSw "Just Enough: Monorepos Tutorial - including Lerna project setup")

## Repositories uses Lerna

- [webpack-cli](https://github.com/webpack/webpack-cli)
- [create-react-app](https://github.com/facebook/create-react-app)
- [jest](https://github.com/facebook/jest)
- [storybook](https://github.com/storybookjs/storybook)
- [vue-cli](https://github.com/vuejs/vue-cli)

## Repository commands

- `npm run clean`: Delete `dist` and `node_modules` directories
- `npm run build`: Run `webpack` and build the packages
- `npm run link`: Link node_modules using lerna
- `npm run publish`: Publish packages
- `npm run changed`: Get changed packages from the last publish
- `npm run show-dependency`: Get dependencies of packages
- `npm run create-version`: Create a new version using lerna
- `npm run registery:serve`: Run verdaccio registry local server

## Summary & Ideas

Monorepo is a repository configuration to have different parts of your application microservices under a single respository to improve productivity. If you have multiple packages or components that depend on each other, they usually have similar scripts, commands, dependencies, then having a single repository with everything will reduce the number of duplications, make it easy to access and update different modules and publish different versions at once. It will dramatically increase your team's productivity.

[Lerna](https://github.com/lerna/lerna) is used to handle monorepo management. There are many other tools that we will try to discuss.

Some extras regarding Monorepo configurations not mentioned in the YouTube video:

- Linking can be done using npm workspaces mode by setting the main package.json file `private: true` and adding the `workspaces` to an array of available packages. You can use a wildcard `packages/*` to apply for all.

- Typescript: We need to create three tsconfig files; one which will be the main tsconfig file with all needed configs, the second one to import these configs inside each project and a third one is used to reference and build all projects with a single `tsc --build`. First, create the tsconfig at the top level, and then inside each project use the property `extends` and then pass a reference to the main JSON file with the full typescript configs needed. The build tsconfig file would be a separate file that has two properties; the property `references` set to point to every project and `files: []` which is an empty array to avoid building the project twice.

- Babel: You can create a main .babelrc file and then reference it inside each projects’ .babelrc with the property `extends: <path>`

- ESLint: Same like Babel we create `.eslintrc` file but on the root directory as IDEs tend to prefer them on the root to enforce the rules and then for each project you can create an internal config `.eslintrc` file and use the `extend` property.

- Scripty: Tool to manage scripts inside package.json and unify all of them in shell file instead of having a long command in package.json file.

- commitlint: In a Monorepo where many teams work together, it’s a great idea to unify how commits are made and their format and also supports automatic changelog. Using Lerna with commitlint and husky will do the required things and setup is very easy. Follow this link.