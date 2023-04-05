import Controller from '@ember/controller';

import <%= options.__styles__ %> from './<%= entity.fileName %>.css';

export default class <%= entity.classifiedName %>Controller extends Controller {
  <%= options.__styles__ %> = <%= options.__styles__ %>;
}
