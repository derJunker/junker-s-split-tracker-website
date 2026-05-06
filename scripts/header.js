const headerElement = document.querySelector("header") || document.querySelector("nav");
const headerHeightCssVar = "--header-height";
const rootStyle = document.documentElement.style;
let headerHeightRaf = null;

function updateHeaderHeight() {
    if (!headerElement) {
        rootStyle.setProperty(headerHeightCssVar, "0px");
        return;
    }

    const headerHeight = `${Math.ceil(headerElement.getBoundingClientRect().height)}px`;
    rootStyle.setProperty(headerHeightCssVar, headerHeight);
}

function scheduleHeaderHeightUpdate() {
    if (headerHeightRaf !== null) {
        return;
    }

    headerHeightRaf = requestAnimationFrame(function () {
        headerHeightRaf = null;
        updateHeaderHeight();
    });
}

updateHeaderHeight();
window.addEventListener("resize", scheduleHeaderHeightUpdate);
window.addEventListener("load", scheduleHeaderHeightUpdate);

if (headerElement && "ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(scheduleHeaderHeightUpdate);
    headerObserver.observe(headerElement);
}