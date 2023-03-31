import Component from '@glimmer/component';
import { localClass } from 'embroider-css-modules';

import styles from './page.css';

interface UiPageComponentSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

export default class UiPageComponent extends Component<UiPageComponentSignature> {
  <template>
    <div class={{localClass styles "container"}}>
      <h1 class={{styles.header}}>
        {{@title}}
      </h1>

      <div
        class="{{styles.body}}"
        id="main-content"
        tabindex="-1"
      >
        {{yield}}
      </div>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
  }
}
