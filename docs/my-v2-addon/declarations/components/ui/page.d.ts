import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import type UiPageDemoComponent from './page/demo.ts';
import type UiPageSectionComponent from './page/section.ts';
import type UiPageSubsectionComponent from './page/subsection.ts';
interface UiPageSignature {
    Args: {
        title: string;
    };
    Blocks: {
        default: [
            {
                Demo: WithBoundArgs<typeof UiPageDemoComponent, never>;
                Section: WithBoundArgs<typeof UiPageSectionComponent, never>;
                Subsection: WithBoundArgs<typeof UiPageSubsectionComponent, never>;
            }
        ];
    };
}
export default class UiPageComponent extends Component<UiPageSignature> {
    styles: {
        readonly container: string;
        readonly content: string;
        readonly title: string;
    };
}
export {};
//# sourceMappingURL=page.d.ts.map