import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { findBestFittingImage } from 'my-v1-app/utils/components/widgets/widget-3';

export default class WidgetsWidget3TourScheduleResponsiveImage extends Component {
  @tracked imageSource;

  @action setImageSource({ dimensions }) {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}
