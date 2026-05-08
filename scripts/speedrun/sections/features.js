import SpeedrunSection from "./speedrun-section";

export default class FeaturesSpeedrunSection extends SpeedrunSection {
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
    }

    onStop() {
        this.observer.disconnect();
        console.log("Disconnected");
    }

    handleMutations(mutationsList, observer) {
        for (const mutation of mutationsList) {
            // Check if the "class" attribute was modified
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // Get the new and old class lists
                const newClassList = mutation.target.classList;
                const oldClassList = mutation.oldValue?.split(' ') || [];

                // Check if "special" was added (not present before, now present)
                const wasAdded = !oldClassList.includes('all-shown') && newClassList.contains('all-shown');

                if (wasAdded) {
                    this.stopEventCallback();
                }
            }
        }
    }
}