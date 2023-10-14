import Component from '@glimmer/component';

<% if (options.componentStructure === 'nested') { %>import styles from './index.css';<% } else { %>import styles from './<%= entity.fileName %>.css';<% } %>

interface <%= entity.classifiedName %>Signature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class <%= entity.classifiedName %>Component extends Component<<%= entity.classifiedName %>Signature> {
  styles = styles;
}
<% if (options.project.hasGlint) { %>
declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    '<%= entity.doubleColonizedName %>': typeof <%= entity.classifiedName %>Component;
    '<%= entity.name %>': typeof <%= entity.classifiedName %>Component;
  }
}
<% } %>