import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { findBestFittingImage } from '../../../../utils/components/widgets/widget-3';

import styles from './responsive-image.css';

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component {
  styles = styles;

  @tracked imageSource;

  @action setImageSource({ dimensions }) {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}
