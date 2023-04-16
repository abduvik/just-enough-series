# Monorepo with Nx

## YouTube Video

## Summary

- We use NPM/Yarn/PNPM workspaces to link between monorepo packages

## Core Concepts

### Why monorepos?

- Run CI/CD test,lint & build only for the changed part
- Publish multiple packages from the same repository
- Can be used along micro-architectures
- Improves Developer experience

### Nx Core Concepts

- Nx Provides tools to build dependency graph and build what is needed
- Codebase is divided into: apps and libs
- Nx builds two graphs:
  - Project Graph: Relation between different packages
  - Task Graph: Relation between different tasks to be executed, it's build from Project Graph. It offers parallism in this way (Distributed Execution). A sinlge Tasks is a Target (build, lint, test) and a Project
- Affected Command (most useful tool), used to run commands only on affected packages and their parents
- Nx creates a computational hash and if it doesn't change, Nx skips running the command. It's customizable but by default it's created from:
  - All the source files of a project and it's dependencies
  - Relevant global configuration
  - Versions of external dependencies
  - Runtime values provisioned by the user
  - CLI Command flags
- Nx supports storing this computational hash remotely which saves good amount of time for huge projects
- There is a graphical tool to show dependencies between projects
- Nx Executors are what do a certain Task, ex: build, lint, test
- Nx comes with generators that helps with scaffolding packages
- In the docs, exector ~= command ~= target
- THere are two types of modes/repositories you can use nx with
  - Package-based repo: You only use tools provided by nx
  - Integrated-based repo: You also use the plugins provided by nx which are integrated with nx. But, my personal opinion, should be avoided as it causes vendor-lock.

### Installation

### nx commands

- `nx run <target> <project>`: Run a certain target on a project
- `npx nx run-many --target=build`: Run a target on all projects
- `npx nx run-many --target=build --skip-nx-cache`: Run a target but skip cache
- `npx nx affected --target=build`: Run a target on affected packages
- `nx graph`: Show graph between dependencies

### Configuration files

There are two configuration files

- `nx.json`: is used to configure defaults for nx and for the whole monorepo configs
- `project.json`: is used to configrure per project configs. Use it if you are using nx executors, otherwise configure `nx` in `package.json` instead.
- `.nxignore`: Files to be ignored by nx

#### `nx.json`

```json
{
  "npmScope": "happyorg",
  "affected": {
    // which branch to compare against for affected
    "defaultBase": "main"
  },
  // where files are stored in the project both for apps & libs
  "workspaceLayout": {
    "appsDir": "demos",
    "libsDir": "packages"
  },
  "implicitDependencies": {
    "package.json": {
      "dependencies": "*",
      "devDependencies": "*"
    },
    "tsconfig.base.json": "*",
    "nx.json": "*"
  },
  // They are merged with namedInputs in each project
  // They define types of input files which later will be used for targets below
  // mainly for caching to check if it's a hit or a miss
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": ["!{projectRoot}/**/*.spec.tsx"]
  },
  // Defaults of different targets
  "targetDefaults": {
    "build": {
      // The `^` means from parent, so here it means inputs of self and parent
      // of files of type production
      "inputs": ["production", "^production"],
      // Depends on the build process of the parent to finish
      "dependsOn": ["^build"],
      // Where to store the output of the target. We also have tokens
      // - {workspaceRoot} means durectory of the root workspace
      // - {projectRoot} means current project
      "outputs": ["{projectRoot}/custom-dist"]
    }
  },
  // Default values for generators
  "generators": {
    "@nrwl/js:library": {
      "buildable": true
    }
  },
  // Default values for the available task runners
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        // operations that can be cached by nx
        "cacheableOperations": ["build", "lint", "test", "e2e"]
      }
    }
  }
}
```

#### `project.json`

```json
{
  // name & place of the package
  "root": "libs/mylib/",
  // src directory for executors
  "sourceRoot": "libs/mylib/src",
  // Type can be `library`, `application`. It's used mainly by executors for custom actions
  "projectType": "library",
  // Sources of files
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": ["!{projectRoot}/**/*.spec.tsx"]
  },
  // Different targets and their configurations using exectors
  "targets": {
    "test": {
      "executor": "@nrwl/jest:jest",
      "inputs": ["default", "^production"],
      "outputs": [],
      "dependsOn": ["build"],
      "options": {}
    },
    "build": {
      "executor": "@nrwl/js:tsc",
      "inputs": ["production", "^production"],
      "outputs": ["{workspaceRoot}/dist/libs/mylib"],
      "dependsOn": ["^build"],
      "options": {}
    }
  },
  // Tags used to enforce linting
  "tags": ["scope:myteam"],
  // In case the project has a dependency that is not explicit ex: global dependencies
  "implicitDependencies": ["anotherlib", "!NotIncludedDependency"]
}
```

#### `project.json`

```json
{
  "name": "mylib",
  "scripts": {
    "test": "jest",
    "build": "tsc -p tsconfig.lib.json", // the actual command here is arbitrary
    "ignored": "exit 1"
  },
  "nx": {
    "namedInputs": {
      "default": ["{projectRoot}/**/*"],
      "production": ["!{projectRoot}/**/*.spec.tsx"]
    },
    "targets": {
      "build": {
        "inputs": ["production", "^production"],
        "outputs": ["{workspaceRoot}/dist/libs/mylib"],
        "dependsOn": ["^build"]
      },
      "test": {
        "inputs": ["default", "^production"],
        "outputs": [],
        "dependsOn": ["build"]
      }
    },
    "includedScripts": ["test", "build"] // If you want to limit the scripts Nx sees, you can specify a list here.
  }
}
```

### Linting

Nx provides an eslint `enforce-module-boundaries` to enforce boundaries between packages and how they can be imported and used. It offers the following:

- Force to only import code exported from the `index.ts` or `index.js` of the package
- Force certain dependencies between packages using tags. These tags are defined in the `package.json` file and the relationship is defined in `.eslintrc.json`

In `package.json`:

```json
{
  // ... more project configuration here
  "nx": {
    "tags": ["scope:admin"]
  }
}
```

In `.eslintrc.json`:

```json
{
  // ... more ESLint config here
  // @nrwl/nx/enforce-module-boundaries should already exist within an "overrides" block using `"files": ["*.ts", "*.tsx", "*.js", "*.jsx",]`
  "@nrwl/nx/enforce-module-boundaries": [
    "error",
    {
      "allow": [],
      // update depConstraints based on your tags
      "depConstraints": [
        {
          "sourceTag": "scope:shared",
          "onlyDependOnLibsWithTags": ["scope:shared"]
        },
        {
          "sourceTag": "scope:admin",
          "onlyDependOnLibsWithTags": ["scope:shared", "scope:admin"]
        },
        {
          "sourceTag": "scope:client",
          "onlyDependOnLibsWithTags": ["scope:shared", "scope:client"]
        }
      ]
    }
  ]
  // ... more ESLint config here
}
```

### Executors

When we want to run target on a certain project, we need either an Executor or a Command

- Executor: Have many features and are integrated into nx and can export metadata and has following properties:
  - `options`: default options for the executor
  - `configurations`: overwrites options for certain scenarios
- Command: a simple script that runs using `nx:run-commands` exector

Example in project.json

```json
{
  "root": "apps/cart",
  "sourceRoot": "apps/cart/src",
  "projectType": "application",
  "generators": {},
  "targets": {
    "build": {
      "executor": "@nrwl/web:webpack",
      "options": {
        "outputPath": "dist/apps/cart",
        ...
      },
      "configurations": {
        "production": {
          "sourceMap": false,
          ...
        }
      }
    },
    "test": {
      "executor": "@nrwl/jest:jest",
      "options": {
        ...
      },
    },
    "echo": {
      "command": "echo 'hello world'"
    }
  }
}
```

### Generators

They are used to generator templates and code and they are helpful in a monorepo setup. They are usually part of a plugin or you can write your own generator

Command:

- `nx generate [plugin]:[generator-name] [options]`
- `nx generate @nrwl/react:component mycmp --project=myapp`

### Nx Migration

Nx provides automated tools to support with migration and updatigng nx and it's packages

- `nx migrate latest`: Upgrade to the latest version. It will update `package.json` and create `migrations.json` if any extra steps needed
- `nx migrate --run-migrations`: To apply `migrations.json`. This file can safely be removed afterwards.

## Nx Distributed Tasks Execution

// @todo TBD

## Extras

- [Nx Mental Model](https://nx.dev/concepts/mental-model)
- [Various Monorepo Tools](https://monorepo.tools/)
