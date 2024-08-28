import Controller from '@ember/controller';

import styles from './<%= entity.fileName %>.css';

export default class <%= entity.pascalizedName %>Controller extends Controller {
  styles = styles;
}
