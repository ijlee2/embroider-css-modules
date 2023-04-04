import Component from '@glimmer/component';

<% if (options.componentStructure === 'nested') { %>import styles from './index.css';<% } else { %>import styles from './<%= entity.fileName %>.css';<% } %>

export default class <%= entity.classifiedName %>Component extends Component {
  styles = styles;
}
