# RentSync

### Remarks:  
A full-stack mono-repo containing a **NestJS** backend server, an **Expo React Native** mobile app, and optionally a web frontend. This repository provides a unified development workflow using bash scripts for setup and running modules.

---

## Getting Started

Before getting started, make sure you have these installed on your machine:

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [npm](https://www.npmjs.com/get-npm)
- [Expo CLI & EAS CLI](https://docs.expo.dev/)
- Bash terminal (or Git Bash on Windows)

---

## Installation

Use the provided `RentSync` bash script from the **root directory** to set up each module.

### Setup Mobile (Expo)
```bash
./RentSync mobile setup
```

This will:

- Copy .env.local.example → .env.local
- Install global eas-cli
- Install dependencies
- Prompt to log in to Expo (npx expo login)

### Setup Server (NestJS)
```bash
./RentSync server setup
```

This will:

- Copy .env.example → .env
- Install global @nestjs/cli
- Install dependencies

### Setup Client (Optional)
```bash
./RentSync client setup
```
This will:

- Copy .env.example → .env.local
- Install client dependencies

### Setup Server (NestJS)
```bash
./RentSync server setup
```

## Running the App

### Run Server (NestJS)
```bash
./RentSync server run
```
This runs the server in development mode on the port defined in ```.env```

### Run Mobile (Expo)

```bash
./RentSync mobile run
```
This starts the Expo development server (Metro Bundler) and opens your app in the Expo Go app or simulator.

### Run Client (Optional)

```bash
./RentSync client run
```
Starts the frontend development server.

## Building for Production

### Build Server (NestJS)
```bash
./RentSync server build
```

### Build Mobile (Expo)
```bash
./RentSync mobile build
```

### Build Client (Optional)
```bash
./RentSync client build
```

## Development Guidelines

### Conventional Commits
The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

1. **fix**: a commit of the type `fix` patches a bug in your codebase (this correlates with **PATCH** in Semantic Versioning).
2. **feat**: a commit of the type `feat` introduces a new feature to the codebase (this correlates with **MINOR** in Semantic Versioning).
3. **BREAKING CHANGE**: a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
4. types other than fix: and feat: are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the Angular convention) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
5. footers other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to git trailer format.

### Examples
Commit message with description and breaking change footer
```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Commit message with ! to draw attention to breaking change
```
feat!: send an email to the customer when a product is shipped
```

### Contributing

All development should be done on a branch. When you have changes that have been thoroughly tested that are ready to merge into the `master` branch, please open a pull request. Another developer will review the code, request changes if necessary, and merge them into `master`. Once the branch is merged into `master`, it will be deleted.

To facilitate code review, please try and keep pull requests limited to individual changes as much as possible. If developing two new features simultaneously, have each feature be on a separate branch with a separate pull request.

### Code Style Guide

Please ensure that all new code is linted to remain consistent in formatting. The purpose of this style guide is to reduce cognitive friction when reading code submitted by different authors.

For HTML, CSS, Javascript and Python, use the VS Code Prettier extension and have it set up to format automatically on save.

For case conventions, here are the following:
- JS/TS Variables - `camelCase`
- NestJS Files - `kebab-case`
- React component filenames - `PascalCase`
- React component function names - `PascalCase`
- Page filenames - `hyphen-case`
- Page function names - `PascalCase` w/ `Page` word the end. Example: `AboutPage`
- JSON key names - `snake_case`
- Git branch names - `hyphen-case` w/ following format `[parent_branch_name]/[branch_name]`. Example: `main/landing-page` or if there is a branch called `backend` then you want to branch out, it will be `backend/item-controller-error-handling`.
