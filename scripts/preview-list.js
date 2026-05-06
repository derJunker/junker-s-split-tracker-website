document.querySelectorAll(".preview-link").forEach(function (link) {
    link.addEventListener("mouseenter", function () {
        const previewId = link.getAttribute("data-preview");
        if (!previewId) return;

        // Find the parent preview container
        const previewContainer = link.closest(".preview-list")?.querySelector(".preview-container");
        if (!previewContainer) return;

        // Hide all preview elements
        previewContainer.querySelectorAll(".preview-el").forEach(function (el) {
            el.classList.remove("active");
        });

        // Show the matching preview element
        const targetPreview = previewContainer.querySelector(`[data-preview="${previewId}"]`);
        if (targetPreview) {
            targetPreview.classList.add("active");
        }
    });

    link.addEventListener("mouseleave", function () {
        const previewContainer = link.closest(".preview-list")?.querySelector(".preview-container");
        if (!previewContainer) return;

        // Hide all preview elements on mouse leave
        previewContainer.querySelectorAll(".preview-el").forEach(function (el) {
            el.classList.remove("active");
        });

        // Show the default preview if it exists
        const defaultPreview = previewContainer.querySelector('[data-preview="default"]');
        if (defaultPreview) {
            defaultPreview.classList.add("active");
        }
    });
});

// Show default preview on page load
window.addEventListener("load", function () {
    document.querySelectorAll(".preview-container").forEach(function (container) {
        const defaultPreview = container.querySelector('[data-preview="default"]');
        if (defaultPreview) {
            defaultPreview.classList.add("active");
        }
    });
});

