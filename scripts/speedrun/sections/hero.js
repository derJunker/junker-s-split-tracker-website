import SpeedrunSection from "./speedrun-section";

export default class HeroSpeedrunSection extends SpeedrunSection {
    constructor(stopEventCallback, sectionName, section) {
        super(stopEventCallback, sectionName, section);
    }

    onStart() {
        setTimeout(this.stopEventCallback, 2000)
    }

    onStop() {
    }
}