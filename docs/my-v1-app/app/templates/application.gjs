import { array, hash } from '@ember/helper';
import { NavigationNarrator } from 'ember-a11y-refocus';
import { pageTitle } from 'ember-page-title';
import { NavigationMenu } from 'my-v2-addon';

<template>
{{pageTitle "Embroider CSS Modules"}}

<div class={{@controller.styles.application}}>
  <header class={{@controller.styles.header}}>
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

  <main class={{@controller.styles.main}}>
    <div class={{@controller.styles.center}}>
      {{outlet}}
    </div>
  </main>

  <footer class={{@controller.styles.footer}}>
    <span class={{@controller.styles.copyright}}>
      Created by
      <a
        class={{@controller.styles.link}}
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
</template>
