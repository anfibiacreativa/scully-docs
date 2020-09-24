import { Rule, SchematicContext, Tree, apply, url, template, move, chain, branchAndMerge, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addSidenavFiles(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const src = 'src/app';
    const name = options.name;
    const navSrc = `${src}/${name}`;
   
    const source = apply(url('./files'), [
      template({
        ...strings,
        ...options,
      }),
      move(navSrc)
    ]);

    const chained = chain([branchAndMerge(chain([mergeWith(source)]))]);
    return chained(tree, _context);
  }
}
