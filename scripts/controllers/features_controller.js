import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['list', 'link', 'container', 'default', 'element']

    connect() {
        this.linkTargets.forEach(link => {
            this.addMouseEnterEvent(link);
            this.addMouseLeaveEvent(link);
            this.addFocusEvent(link);
            this.addBlurEvent(link);
        })
        this.defaultTarget.classList.add('active');
    }

    addMouseEnterEvent(link) {
        link.addEventListener("mouseenter", () => this.showPreview(link));
    }

    addMouseLeaveEvent(link) {
        link.addEventListener("mouseleave", () => this.hidePreview());
    }

    addFocusEvent(link) {
        link.addEventListener("focus", () => this.showPreview(link));
    }

    addBlurEvent(link) {
        link.addEventListener("blur", () => this.hidePreview());
    }

    showPreview(link) {
        const previewId = link.getAttribute("data-preview");
        if (!previewId) return;

        [...this.elementTargets, this.defaultTarget].forEach(el => el.classList.remove("active"));

        // Show the matching preview element
        this.elementTargets.find(el => el.dataset.preview === previewId)?.classList.add("active");
        // Mark this link as shown (for tracking which previews the user hovered)
        link.classList.add("shown");

        // If all preview links in this preview-list have been shown, add .all-shown to the preview-list
        const allShown = this.linkTargets.every(l => l.classList.contains('shown'));
        this.listTarget.classList.toggle('all-shown', allShown);
    }

    hidePreview() {
        [...this.elementTargets, this.defaultTarget].forEach(el => el.classList.remove("active"));
        this.defaultTarget.classList.add("active");
    }

    reset() {
        this.linkTargets.forEach(link => link.classList.remove("shown"));
        this.listTarget.classList.remove('all-shown');
        [...this.elementTargets, this.defaultTarget].forEach(el => el.classList.remove("active"));
        this.defaultTarget.classList.add("active");
    }
}