import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery, type Dimensions } from 'ember-container-query';
import type { Image } from 'my-v1-app/data/concert';
import { findBestFittingImage } from 'my-v1-app/utils/components/widgets/widget-3';

import styles from './responsive-image.module.css';

interface WidgetsWidget3TourScheduleResponsiveImageSignature {
  Args: {
    images: Image[];
  };
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageSignature> {
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
