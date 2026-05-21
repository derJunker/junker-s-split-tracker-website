import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['image']

    connect() {
        this.resizeHandler = () => this.updateHeroImageHeight();
        this.heroImage = this.imageTarget.querySelector("img");

        if (this.heroImage && !this.heroImage.complete) {
            this.heroImage.addEventListener("load", this.resizeHandler);
        }

        this.resizeObserver = new ResizeObserver(this.resizeHandler);
        this.resizeObserver.observe(this.imageTarget);

        window.addEventListener("resize", this.resizeHandler);
        this.updateHeroImageHeight();
    }

    updateHeroImageHeight() {
        const imageHeight = this.imageTarget.offsetHeight;
        if (imageHeight > 0) {
            document.documentElement.style.setProperty("--hero-img-height", imageHeight + "px");
        }
    }

    disconnect() {
        if (this.heroImage) {
            this.heroImage.removeEventListener("load", this.resizeHandler);
        }

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        window.removeEventListener("resize", this.resizeHandler);
    }

    // obligatory function, but does nothing in this case
    // all section controllers have this function called when sb resets
    reset() {

    }
}
