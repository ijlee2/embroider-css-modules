/* eslint-disable-next-line no-unused-vars */
function createClass(entityName, options) {
  // ...
}

/* eslint-disable-next-line no-unused-vars */
function updateClass(entityName, options) {
  // ...
}

function updateRouteClasses(context, options) {
  for (const [entityName, analysis] of context.routes) {
    const { hasClass, hasStylesheet } = analysis;

    if (!hasStylesheet) {
      continue;
    }

    if (!hasClass) {
      createClass(entityName, options);
    }

    updateClass(entityName, options);
  }
}

export function importStylesInRoutes(context, options) {
  updateRouteClasses(context, options);
}
