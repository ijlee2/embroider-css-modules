import type { TOC } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { NavigationNarrator } from 'ember-a11y-refocus';
import { pageTitle } from 'ember-page-title';
import { NavigationMenu } from 'my-v2-addon';

import styles from './application.module.css';

interface ApplicationSignature {
  controller: unknown;
  model: unknown;
}

<template>
  {{pageTitle "Embroider CSS Modules"}}

  <div class={{styles.application}}>
    <header class={{styles.header}}>
      <NavigationNarrator @skipTo="#main-content" />

      <NavigationMenu
        @menuItems={{array
          (hash label="Home" route="index")
          (hash label="Dashboard" route="dashboard")
          (hash label="Form" route="form")
          (hash label="Products" route="products")
        }}
        @name="Main Navigation"
      />
    </header>

    <main class={{styles.main}}>
      <div class={{styles.center}}>
        {{outlet}}
      </div>
    </main>

    <footer class={{styles.footer}}>
      <span class={{styles.copyright}}>
        Created by
        <a
          class={{styles.link}}
          href="https://www.linkedin.com/in/ijlee2/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Isaac J. Lee
        </a>
        © 2025
      </span>
    </footer>
  </div>
</template> satisfies TOC<ApplicationSignature>;
