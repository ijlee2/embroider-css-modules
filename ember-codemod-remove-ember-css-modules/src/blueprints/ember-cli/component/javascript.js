import Component from '@glimmer/component';

<% if (options.componentStructure === 'nested') { %>import <%= options.__styles__ %> from './index.css';<% } else { %>import <%= options.__styles__ %> from './<%= entity.fileName %>.css';<% } %>

export default class <%= entity.classifiedName %>Component extends Component {
  <%= options.__styles__ %> = <%= options.__styles__ %>;
}
