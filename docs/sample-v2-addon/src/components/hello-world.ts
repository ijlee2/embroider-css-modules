import Component from '@glimmer/component';

import styles from './hello-world.css';

interface HelloWorldSignature {
  Args: {
    name: string;
  };
}

export default class HelloWorldComponent extends Component<HelloWorldSignature> {
  styles = styles;
}
