import { Rule, SchematicContext, Tree, chain, schematic, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/config';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default (options: any): Rule => {
  return chain([
    isAngular(),
    isScullyInstalled(),
    installDependencies(),
    schematic('docs-module', options)
  ]);
};

const angularConfig = 'angular.json';

const isAngular = () => (tree: Tree, _context: SchematicContext) => {
  const isAngularWorkspace = tree.exists(angularConfig);
  if (!isAngularWorkspace) {
    throw new SchematicsException('🚫 This is not an Angular project. Nothing to do!');
  }
}

const isScullyInstalled = () => (tree: Tree, _context: SchematicContext) => {
  const workspace = getWorkspace(tree);
  const project = (Object.keys(workspace.projects)[0]).toString();
  const scullyConfig = tree.exists(`scully.${project}.config.ts`);
  
  if (!scullyConfig) {
    throw new SchematicsException('🚫 Please install Scully before proceeding!');
  }
}

const installDependencies = () => (tree: Tree, context: SchematicContext) => {
  context.addTask(new NodePackageInstallTask());
}
