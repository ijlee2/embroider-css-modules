import styles from './responsive-image.module.css';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery } from 'ember-container-query';
import { findBestFittingImage } from 'my-v1-app/utils/components/widgets/widget-3';

export default class WidgetsWidget3TourScheduleResponsiveImage extends Component {
  @tracked imageSource;

  @action setImageSource({ dimensions }) {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }

  <template><div
  class={{styles.components-widgets-widget-3-tour-schedule-responsive-image__image-container}}
  {{containerQuery debounce=300 onQuery=this.setImageSource}}
  >
  {{#if this.imageSource}}
  {{! template-lint-disable no-redundant-role }}
  <img
    alt=""
    class={{styles.components-widgets-widget-3-tour-schedule-responsive-image__image}}
    data-test-image="Concert"
    role="presentation"
    src={{this.imageSource}}
  />
  {{! template-lint-enable no-redundant-role }}
  {{/if}}
  </div></template>
}
