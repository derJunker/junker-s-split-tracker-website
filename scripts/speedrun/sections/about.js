import SpeedrunSection from "./speedrun-section";
import {getSingularControllerForIdentifier} from "../../controllers/register-controller";

export default class AboutSpeedrunSection extends SpeedrunSection {
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
        this.sectionController = getSingularControllerForIdentifier('about');
        this.sectionController.resetSpeechIndex()
    }

    onStop() {
        this.observer.disconnect();
    }

    handleMutations(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const newClassList = mutation.target.classList;
                const oldClassList = mutation.oldValue?.split(' ') || [];
                const wasAdded = !oldClassList.includes('dialog-done') && newClassList.contains('dialog-done');

                if (wasAdded) {
                    this.stopEventCallback();
                }
            }
        }
    }
}

