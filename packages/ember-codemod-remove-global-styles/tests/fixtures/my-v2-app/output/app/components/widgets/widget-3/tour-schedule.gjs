import styles from './tour-schedule.module.css';
import { hash } from '@ember/helper';
import { ContainerQuery, width } from 'ember-container-query';

import WidgetsWidget3TourScheduleResponsiveImage from './tour-schedule/responsive-image';

<template><ContainerQuery
  @dataAttributePrefix="cq"
  @features={{hash small=(width max=400)}}
  class={{styles.components-widgets-widget-3-tour-schedule__container}}
>
  <div class={{styles.components-widgets-widget-3-tour-schedule__splash}}>
    <div
      class={{styles.components-widgets-widget-3-tour-schedule__splash-image-container}}
    >
      {{#if @concert.images}}
        <WidgetsWidget3TourScheduleResponsiveImage
          @images={{@concert.images}}
        />
      {{else}}
        <div
          class={{styles.components-widgets-widget-3-tour-schedule__placeholder-image}}
        ></div>
      {{/if}}
    </div>

    <div
      class={{styles.components-widgets-widget-3-tour-schedule__concert-date-container}}
    >
      <time class={{styles.components-widgets-widget-3-tour-schedule__concert-date}}>
        {{@concert.date}}
      </time>
    </div>

    <div
      class={{styles.components-widgets-widget-3-tour-schedule__venue-name-container}}
    >
      <a
        class={{styles.components-widgets-widget-3-tour-schedule__concert-link}}
        href="#"
      >
        <div class={{styles.components-widgets-widget-3-tour-schedule__venue-name}}>
          {{@concert.name}}
        </div>
      </a>
    </div>
  </div>
</ContainerQuery></template>
