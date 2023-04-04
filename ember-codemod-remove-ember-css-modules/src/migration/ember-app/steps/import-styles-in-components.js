/* eslint-disable-next-line no-unused-vars */
function createClass(entityName, options) {
  // ...
}

/* eslint-disable-next-line no-unused-vars */
function updateClass(entityName, options) {
  // ...
}

function updateComponentClasses(context, options) {
  for (const [entityName, analysis] of context.components) {
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

export function importStylesInComponents(context, options) {
  updateComponentClasses(context, options);
}
