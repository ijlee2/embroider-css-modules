import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Image } from 'docs-app-for-embroider-css-modules/data/concert';
import { findBestFittingImage } from 'docs-app-for-embroider-css-modules/utils/components/widgets/widget-3';
import { containerQuery, type Dimensions } from 'ember-container-query';

import styles from './responsive-image.module.css';

interface WidgetsWidget3TourScheduleResponsiveImageSignature {
  Args: {
    images: Image[];
  };
}

export default class WidgetsWidget3TourScheduleResponsiveImage extends Component<WidgetsWidget3TourScheduleResponsiveImageSignature> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }

  <template>
    <div
      class={{styles.image-container}}
      {{containerQuery debounce=300 onQuery=this.setImageSource}}
    >
      {{#if this.imageSource}}
        {{! template-lint-disable no-redundant-role }}
        <img
          alt=""
          class={{styles.image}}
          data-test-image="Concert"
          role="presentation"
          src={{this.imageSource}}
        />
        {{! template-lint-enable no-redundant-role }}
      {{/if}}
    </div>
  </template>
}
