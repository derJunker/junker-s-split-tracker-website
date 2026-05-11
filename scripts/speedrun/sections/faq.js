import SpeedrunSection from "./speedrun-section";
import {getSingularControllerForIdentifier} from "../../controllers/register-controller";

export default class FaqSpeedrunSection extends SpeedrunSection {
    constructor(stopEventCallback, sectionName, section) {
        super(stopEventCallback, sectionName, section);
    }

    onStart() {
        this.observer = new MutationObserver((mutations => this.handleMutations(mutations)));
        this.observer.observe(this.sectionElement,  {
            attributes: true,
            attributeFilter: ['class'],
            attributeOldValue: true
        })
        this.sectionController = getSingularControllerForIdentifier('faq-section');
        this.sectionController.resetFaqs()
    }

    onStop() {
        this.observer.disconnect();
    }

    handleMutations(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const newClassList = mutation.target.classList;
                const oldClassList = mutation.oldValue?.split(' ') || [];
                const wasAdded = !oldClassList.includes('all-opened') && newClassList.contains('all-opened');

                if (wasAdded) {
                    this.stopEventCallback();
                }
            }
        }
    }
}

