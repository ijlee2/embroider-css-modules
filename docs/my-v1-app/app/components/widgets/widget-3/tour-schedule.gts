import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { ContainerQuery, width } from 'ember-container-query';
import type { Concert } from 'my-v1-app/data/concert';

import WidgetsWidget3TourScheduleResponsiveImage from './tour-schedule/responsive-image';

interface WidgetsWidget3TourScheduleSignature {
  Args: {
    concert: Concert;
  };
}

const WidgetsWidget3TourSchedule: TOC<WidgetsWidget3TourScheduleSignature> =
  <template>
    <ContainerQuery
      @dataAttributePrefix="cq"
      @features={{hash small=(width max=400)}}
      class="components-widgets-widget-3-tour-schedule__container"
    >
      <div class="components-widgets-widget-3-tour-schedule__splash">
        <div
          class="components-widgets-widget-3-tour-schedule__splash-image-container"
        >
          {{#if @concert.images}}
            <WidgetsWidget3TourScheduleResponsiveImage
              @images={{@concert.images}}
            />
          {{else}}
            <div
              class="components-widgets-widget-3-tour-schedule__placeholder-image"
            ></div>
          {{/if}}
        </div>

        <div
          class="components-widgets-widget-3-tour-schedule__concert-date-container"
        >
          <time class="components-widgets-widget-3-tour-schedule__concert-date">
            {{@concert.date}}
          </time>
        </div>

        <div
          class="components-widgets-widget-3-tour-schedule__venue-name-container"
        >
          <a
            class="components-widgets-widget-3-tour-schedule__concert-link"
            href="#"
          >
            <div class="components-widgets-widget-3-tour-schedule__venue-name">
              {{@concert.name}}
            </div>
          </a>
        </div>
      </div>
    </ContainerQuery>
  </template>;

export default WidgetsWidget3TourSchedule;
