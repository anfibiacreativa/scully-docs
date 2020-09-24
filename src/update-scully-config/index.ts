import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getScullyConfig, getFileContents, addRouteToScullyConfig } from '@scullyio/init/src/utils/utils';
import { getWorkspace } from '@schematics/angular/utility/config';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function updateScullyConfig(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    
    const slug: string = 'slug';
    const sourceDir: string = 'docs';
    const sourceDirRel: string =`./${sourceDir}`;
    const route = `/${sourceDir}/${slug}`;

    const workspace = getWorkspace(tree);
    const project = (Object.keys(workspace.projects)[0]).toString();

    if (project) {
      const scullyConfig = getScullyConfig(tree, project);
      const scullyConfigContents = getFileContents(tree, scullyConfig);
      if (!scullyConfigContents) {
        context.logger.error(
          `Scully is not installed or the ${scullyConfig} is missing!`
        );
      }
  
      const addRoute = addRouteToScullyConfig(scullyConfigContents, {
        name: route,
        slug: slug,
        type: 'contentFolder',
        sourceDir: sourceDirRel,
        route: sourceDir
      });
      tree.overwrite(scullyConfig, addRoute);
      context.logger.info(`✅️ Updated ${scullyConfig} with new route pattern`);
    }

    return tree;
  };
}
