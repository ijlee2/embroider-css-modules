import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FormController extends Controller {
  @action submitData(data: Record<string, unknown>): void {
    console.table(data);
  }
}
