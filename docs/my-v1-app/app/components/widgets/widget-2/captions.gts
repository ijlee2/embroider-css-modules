import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ContainerQuery, height, width } from 'ember-container-query';
import { modifier } from 'ember-modifier';
import svgJar from 'ember-svg-jar/helpers/svg-jar';
import { or } from 'ember-truth-helpers';
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

  <template>
    <ContainerQuery
      @features={{hash large=(width min=320) tall=(height min=80)}}
      as |CQ|
    >
      <div
        class="components-widgets-widget-2-captions__container
          {{unless
            CQ.features.tall
            'components-widgets-widget-2-captions__flat'
          }}
          "
      >
        {{#if this.summary}}
          <div
            class="components-widgets-widget-2-captions__summary
              {{if
                CQ.features.large
                'components-widgets-widget-2-captions__horizontal-layout'
              }}
              "
            tabindex="0"
          >
            <h3
              class="components-widgets-widget-2-captions__music-format
                {{unless
                  CQ.features.large
                  'components-widgets-widget-2-captions__small-font-size'
                }}
                "
            >
              <span
                class="components-widgets-widget-2-captions__marker"
                {{colorSvg this.summary.markerColor}}
              >
                {{svgJar
                  "stop"
                  desc="A square whose color matches that of a bar in the bar chart"
                  role="img"
                }}
              </span>

              <span data-test-field="Music Format">
                {{this.summary.musicFormat}}
              </span>
            </h3>

            <div
              class="components-widgets-widget-2-captions__annual-revenue"
              data-test-field="Annual Revenue"
            >
              {{#if (or CQ.features.tall CQ.features.large)}}
                <span>Annual revenue:</span>
              {{/if}}

              <span class="components-widgets-widget-2-captions__highlight">
                {{this.summary.averageRevenue}}
              </span>
            </div>

            <div
              class="components-widgets-widget-2-captions__relevant-years"
              data-test-field="Relevant Years"
            >
              {{#if (or CQ.features.tall CQ.features.large)}}
                <span>Relevant years:</span>
              {{/if}}

              <span class="components-widgets-widget-2-captions__highlight">
                {{this.summary.relevantYears.min}}
                -
                {{this.summary.relevantYears.max}}
              </span>
            </div>
          </div>

          {{#if this.canShowPreviousButton}}
            <button
              aria-label="Previous"
              class="components-widgets-widget-2-captions__previous-button"
              data-test-button="Previous"
              type="button"
              {{on "click" (fn this.showNextSummary -1)}}
            >
              {{#if CQ.features.tall}}
                Previous
              {{else}}
                {{svgJar
                  "chevron-left"
                  class="components-widgets-widget-2-captions__icon"
                  desc="A chevron arrow pointing left"
                  role="img"
                }}
              {{/if}}
            </button>
          {{/if}}

          {{#if this.canShowNextButton}}
            <button
              aria-label="Next"
              class="components-widgets-widget-2-captions__next-button"
              data-test-button="Next"
              type="button"
              {{on "click" (fn this.showNextSummary 1)}}
            >
              {{#if CQ.features.tall}}
                Next
              {{else}}
                {{svgJar
                  "chevron-right"
                  class="components-widgets-widget-2-captions__icon"
                  desc="A chevron arrow pointing right"
                  role="img"
                }}
              {{/if}}
            </button>
          {{/if}}
        {{/if}}
      </div>
    </ContainerQuery>
  </template>
}
