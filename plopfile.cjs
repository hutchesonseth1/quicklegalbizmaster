/* eslint-disable */
module.exports = function (plop) {
  // New App Router page generator
  plop.setGenerator('page', {
    description: 'Create a new Next.js App Router page',
    prompts: [ { type: 'input', name: 'name', message: 'Page name (e.g., pricing)' } ],
    actions: [
      {
        type: 'add',
        path: 'apps/quick-legal-biz/app/{{kebabCase name}}/page.tsx',
        templateFile: 'toolchain/generators/templates/page.hbs'
      }
    ]
  });

  // API route + data repo module
  plop.setGenerator('module', {
    description: 'Create API route and data module',
    prompts: [ { type: 'input', name: 'name', message: 'Module name (e.g., invoices)' } ],
    actions: [
      {
        type: 'add',
        path: 'apps/quick-legal-biz/app/api/{{kebabCase name}}/route.ts',
        templateFile: 'toolchain/generators/templates/api-route.hbs'
      },
      {
        type: 'add',
        path: 'packages/data/src/{{camelCase name}}Repo.ts',
        templateFile: 'toolchain/generators/templates/repo.hbs'
      }
    ]
  });
};
