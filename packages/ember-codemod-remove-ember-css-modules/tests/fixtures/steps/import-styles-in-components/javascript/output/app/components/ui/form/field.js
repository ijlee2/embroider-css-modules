import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

import styles from './field.css';

export default class UiFormFieldComponent extends Component {
  styles = styles;

  inputId = guidFor(this);
}
