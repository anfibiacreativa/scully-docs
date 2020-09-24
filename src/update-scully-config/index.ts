import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function updateScullyConfig(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const root: string = '/';
    const route = '/docs/:slug';
    tree.getDir(root).visit(filePath => {
      if (filePath.includes('node_modules')) {
        return;
      }
      if (!filePath.includes('scully.')) {
        return;
      }
      _context.logger.info(`Updating ${filePath}...`);

      const scullyConfigBuffer = tree.read(filePath);

      if (!scullyConfigBuffer) {
        return;
      }
      const rawScullyConfig = JSON.parse(scullyConfigBuffer.toString('utf-8'));
      const routes = {...rawScullyConfig['config']['routes']};

      routes[route] = `{
        type: 'contentFolder',
        slug: {
          folder: './docs'
        },`

      const updatedScullyConfig = {
        ...rawScullyConfig,
        routes: {
          ...rawScullyConfig['routes'],
          routes
        }
      }

      tree.overwrite(filePath, JSON.stringify(updatedScullyConfig, null, 2));
    })
    return tree;
  };
}
