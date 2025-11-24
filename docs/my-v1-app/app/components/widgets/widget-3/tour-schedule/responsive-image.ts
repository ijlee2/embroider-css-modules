import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Dimensions } from 'ember-container-query';
import type { Image } from 'my-v1-app/data/concert';
import { findBestFittingImage } from 'my-v1-app/utils/components/widgets/widget-3';

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
}
