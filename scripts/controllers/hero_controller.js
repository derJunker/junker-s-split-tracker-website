import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['image']

    connect() {
        this.updateHeroImageHeight();
        this.resizeHandler = () => this.updateHeroImageHeight();
        document.addEventListener('resize', this.resizeHandler);
    }

    updateHeroImageHeight() {
        const imageHeight = this.imageTarget.offsetHeight;
        document.documentElement.style.setProperty("--hero-img-height", imageHeight+"px");
    }

    disconnect() {
        document.removeEventListener('resize', this.resizeHandler);
    }

    // obligatory function, but does nothing in this case
    // all section controllers have this function called when sb resets
    reset() {

    }
}