import { Rule, SchematicContext, Tree, externalSchematic, chain, schematic, SchematicsException } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function docsModule(options: any): Rule {
  return chain([
    chain([ (tree: Tree, _context: SchematicContext) => {
      options.name = options.name ? strings.dasherize(options.name) : 'docs';
      options.route = 'docs';
      options.module = 'app-routing';
     
      return tree;
    },
    externalSchematic('@schematics/angular','module', options)
    ]),
    chain([
      (tree: Tree, _context: SchematicContext) => {
        const src = 'src/app';
        const name = options.name;
        const docsSrc = `${src}/${name}`;
        const pathStart = `${docsSrc}/${name}`;
        const routing = `${pathStart}-routing.module.ts`;
        const temp = `${pathStart}.component.html`;
        const comp = `${pathStart}.component.ts`;
        const appRouting = `${src}/app-routing.ts`;
        
        const isInstalled = tree.read(appRouting)?.toString();

        if (isInstalled?.includes(name)){
          throw new SchematicsException('Docs module is already installed. Skipping!')
        }
        const isModule = tree.exists(routing);

        if (isModule) {
          tree.delete(routing);
          tree.delete(temp);
          tree.delete(comp);
        }

        _context.logger.info('💫Replacing files...');

        return tree;
      }
    ]),
    schematic('add-docs-module-files', options),
    schematic('add-side-nav', options),
    schematic('update-scully-config', options)
  ])
}
