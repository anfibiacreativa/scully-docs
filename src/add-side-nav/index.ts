import { Rule, SchematicContext, Tree, chain, externalSchematic, schematic } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addSideNav(options: any): Rule {
  return chain([
    chain([
      (tree: Tree, _context: SchematicContext) => {
        options.name = 'sidenav';
        return tree;
      },
      externalSchematic('@schematics/angular','component', options)
      ]),
      chain([
        (tree: Tree, _context: SchematicContext) => {
          const src = 'src/app';
          const name = options.name;
          const navSrc = `${src}/${name}`;
          const pathStart = `${navSrc}/${name}`;
          const temp = `${pathStart}.component.html`;
          const comp = `${pathStart}.component.ts`;

          const isModule = tree.exists(comp);

          if (isModule) {
            tree.delete(temp);
            tree.delete(comp);
          }
        }
      ]),
      schematic('add-sidenav-files', options)
  ])
}
