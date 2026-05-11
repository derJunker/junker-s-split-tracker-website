import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['list', 'link', 'container', 'default', 'element']

    connect() {
        this.linkTargets.forEach(link => {
            this.addMouseEnterEvent(link);
            this.addMouseLeaveEvent(link);
        })
        this.defaultTarget.classList.add('active');
    }

    addMouseEnterEvent(link) {
        const controller = this;
        link.addEventListener("mouseenter", () => {
            const previewId = link.getAttribute("data-preview");
            if (!previewId) return;

            [...controller.elementTargets, controller.defaultTarget].forEach(el => el.classList.remove("active"));

            // Show the matching preview element
            controller.elementTargets.find(el => el.dataset.preview === previewId)?.classList.add("active");
            // Mark this link as shown (for tracking which previews the user hovered)
            link.classList.add("shown");

            // If all preview links in this preview-list have been shown, add .all-shown to the preview-list
            const allShown = controller.linkTargets.every(function (l) {
                return l.classList.contains('shown');
            });
            if (allShown) {
                controller.listTarget.classList.add('all-shown');
            } else {
                controller.listTarget.classList.remove('all-shown');
            }
        })
    }

    addMouseLeaveEvent(link) {
        const controller = this;
        link.addEventListener("mouseleave", function () {
            [...controller.elementTargets, controller.defaultTarget].forEach(el => el.classList.remove("active"));
            controller.defaultTarget.classList.add("active");
        });
    }

    reset() {
        this.linkTargets.forEach(link => link.classList.remove("shown"));
        this.listTarget.classList.remove('all-shown');
        [...this.elementTargets, this.defaultTarget].forEach(el => el.classList.remove("active"));
        this.defaultTarget.classList.add("active");
    }
}