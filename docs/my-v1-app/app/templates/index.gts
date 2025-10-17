import { UiPage } from 'my-v2-addon';

import styles from './index.module.css';

<template>
  <UiPage @title="Welcome!">
    <p>
      Thanks for trying out
      <a
        class={{styles.code}}
        data-test-link="embroider-css-modules"
        href="https://github.com/ijlee2/embroider-css-modules"
        rel="noopener noreferrer"
        target="_blank"
      >
        embroider-css-modules
      </a>.
    </p>

    <p>
      To see what you can do with CSS modules, visit one of the examples and
      inspect the DOM.
    </p>
  </UiPage>
</template>
