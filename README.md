# Welcome to a custom schematic to create a documentation site with Angular and Scully!

This is under development and has some pending tasks:
* write tests
* clean types
* publish to npm (with ng add support)

But you can already use it. Clone and link to your project

Create the modules with
`ng generate scully-docs:docs`

Create a documentation post with
`ng generate scully-docs:doc``

Read about it here -> https://dev.to/anfibiacreativa/a-documentation-site-with-angular-and-scully-3aam

# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
 
