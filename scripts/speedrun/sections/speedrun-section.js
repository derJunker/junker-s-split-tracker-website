import {getSingularControllerForIdentifier} from "../../controllers/register-controller";

export default class SpeedrunSection {
    constructor(stopEventCallback, sectionName, section) {
        this.stopEventCallback = stopEventCallback;
        this.sectionName = sectionName;
        this.sectionElement = section;
    }

    onStart() {
        this.reset()
    }

    onStop() {}

    reset() {
        this.sectionController = getSingularControllerForIdentifier(this.sectionName);
        // check if controller has function "reset"
        if (!this.sectionController.reset) throw new Error(`Controller for section ${this.sectionName} does not have a reset function!`)
        this.sectionController.reset()
    }
}