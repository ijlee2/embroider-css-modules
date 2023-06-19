import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';
import UiPageDemoComponent from "./page/demo.js";
import UiPageSectionComponent from "./page/section.js";
import UiPageSubsectionComponent from "./page/subsection.js";
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
declare class UiPageComponent extends Component<UiPageSignature> {
    styles: {
        readonly container: string;
        readonly content: string;
        readonly title: string;
    };
}
export { UiPageComponent as default };
