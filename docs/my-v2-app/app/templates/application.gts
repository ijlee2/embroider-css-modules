import { pageTitle } from 'ember-page-title';
import Hello from 'my-v2-app/components/hello';

import styles from './application.module.css';

<template>
  {{pageTitle "Embroider CSS Modules"}}

  <div class={{styles.container}} data-test-hello-container>
    <Hello />
  </div>
</template>
