import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import styles from './form.css';

export default class UiFormComponent extends Component {
  styles = styles;

  formId = guidFor(this);

  @tracked changeset = this.args.data ?? {};

  @action submitForm(event) {
    event.preventDefault();

    console.table(this.changeset);
  }

  @action updateChangeset({ key, value }) {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }
}
