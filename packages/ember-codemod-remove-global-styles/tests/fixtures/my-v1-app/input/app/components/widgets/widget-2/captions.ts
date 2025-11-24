import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import type { Summary } from 'my-v1-app/utils/components/widgets/widget-2';

const colorSvg = modifier((container: Element, [color]: [string]) => {
  const svgElement = container.querySelector('svg');

  if (!svgElement) {
    return;
  }

  svgElement.style.setProperty('color', color);
});

interface WidgetsWidget2CaptionsSignature {
  Args: {
    summaries?: Summary[];
  };
}

export default class WidgetsWidget2Captions extends Component<WidgetsWidget2CaptionsSignature> {
  @tracked currentIndex = 0;

  colorSvg = colorSvg;

  get canShowNextButton(): boolean {
    return this.currentIndex < this.summaries.length - 1;
  }

  get canShowPreviousButton(): boolean {
    return this.currentIndex > 0;
  }

  get summaries(): Summary[] {
    return this.args.summaries ?? [];
  }

  get summary(): Summary | undefined {
    return this.summaries[this.currentIndex];
  }

  @action showNextSummary(increment = 1): void {
    const { currentIndex, summaries } = this;

    const numSummaries = summaries.length;
    const nextIndex = (currentIndex + increment + numSummaries) % numSummaries;

    this.currentIndex = nextIndex;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::Captions': typeof WidgetsWidget2Captions;
    'widgets/widget-2/captions': typeof WidgetsWidget2Captions;
  }
}
