import { local } from 'embroider-css-modules';

import styles from './hello.module.css';

<template>
  <div class={{local styles "message" "emphasize"}} data-test-hello>
    Hello Vite!
  </div>
</template>
