import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['header']

    initialize() {
        this.headerHeightCssVar = "--header-height";
        this.headerHeightRaf = null;
        this.headerObserver = null;
    }

    connect() {
        this.updateHeaderHeight();
        window.addEventListener("resize", this.scheduleHeaderHeightUpdate.bind(this));
        window.addEventListener("load", this.scheduleHeaderHeightUpdate.bind(this));

        if (this.headerTarget && "ResizeObserver" in window) {
            this.headerObserver = new ResizeObserver(() => this.scheduleHeaderHeightUpdate());
            this.headerObserver.observe(this.headerTarget);
        }
    }

    disconnect() {
        if (this.headerObserver) {
            this.headerObserver.disconnect();
        }
        window.removeEventListener("resize", this.scheduleHeaderHeightUpdate.bind(this));
        window.removeEventListener("load", this.scheduleHeaderHeightUpdate.bind(this));
        if (this.headerHeightRaf !== null) {
            cancelAnimationFrame(this.headerHeightRaf);
        }
    }

    updateHeaderHeight() {
        if (!this.headerTarget) {
            document.documentElement.style.setProperty(this.headerHeightCssVar, "0px");
            return;
        }

        const headerHeight = `${Math.ceil(this.headerTarget.getBoundingClientRect().height)}px`;
        document.documentElement.style.setProperty(this.headerHeightCssVar, headerHeight);
    }

    scheduleHeaderHeightUpdate() {
        if (this.headerHeightRaf !== null) {
            return;
        }

        this.headerHeightRaf = requestAnimationFrame(() => {
            this.headerHeightRaf = null;
            this.updateHeaderHeight();
        });
    }

    toggle() {
        this.element.classList.toggle("toggled")
    }
}