export default class SpeedrunSection {
    constructor(stopEventCallback, sectionName, section) {
        this.stopEventCallback = stopEventCallback;
        this.sectionName = sectionName;
        this.sectionElement = section;
    }

    onStart() {}

    onStop() {}
}