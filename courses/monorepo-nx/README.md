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

## Extras

- [Nx Mental Model](https://nx.dev/concepts/mental-model)
