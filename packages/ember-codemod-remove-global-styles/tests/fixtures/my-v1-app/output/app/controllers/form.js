import styles from './form.module.css';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FormController extends Controller {
  styles = styles;

  @action submitData(data) {
    console.table(data);
  }
}
