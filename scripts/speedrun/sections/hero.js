import SpeedrunSection from "./speedrun-section";

export default class HeroSpeedrunSection extends SpeedrunSection {
    constructor(stopEventCallback, sectionName, section) {
        super(stopEventCallback, sectionName, section);
    }

    onStart() {
        super.onStart();
        this.scrollListener = () => {
            const nextSibling = this.sectionElement.nextSibling.nextSibling
            const siblingYPos = nextSibling.offsetTop

            const documentBottomY = document.documentElement.scrollTop + window.innerHeight;
            if (siblingYPos < documentBottomY) {
                this.stopEventCallback();
            }
        }
        document.addEventListener("scroll", this.scrollListener);
    }

    onStop() {
        document.removeEventListener("scroll", this.scrollListener);
    }
}