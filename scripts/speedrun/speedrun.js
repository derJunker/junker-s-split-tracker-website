import HeroSpeedrunSection from "./sections/hero";
import FeaturesSpeedrunSection from "./sections/features";
import {getSingularControllerForIdentifier} from "../controllers/register-controller";
import ConfigureSpeedrunSection from "./sections/configure";
import FaqSpeedrunSection from "./sections/faq";
import AboutSpeedrunSection from "./sections/about";

/**
 * @type Array<SpeedrunSection>
 */
const speedrunSections = [];
let currentSection = null;
let startTime = null;
let lastSectionEndTime = null;
let overlayController = null;
let isRunning = false;
let splitTimes = {};

const sectionNameToClassMap = {
    "hero": HeroSpeedrunSection,
    "features": FeaturesSpeedrunSection,
    "configure": ConfigureSpeedrunSection,
    "faq": FaqSpeedrunSection,
    "about": AboutSpeedrunSection,
}

export function startSpeedrun() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Safari fallback
    overlayController = getSingularControllerForIdentifier('overlay')
    overlayController.updateRunInfos(-1, 0);
    overlayController.resetOverlay();
    currentSection = null;
    const sectionElements = [...document.querySelectorAll(".section[data-speed-section]")]
    sectionElements
        .forEach(sectionElement => {
            const sectionName =sectionElement.dataset.speedSection;
            const index = Number(sectionElement.dataset.speedIndex);
            const sectionClass = sectionNameToClassMap[sectionName];
            if (!sectionClass) throw new Error(`No section element found for ${sectionName}`);
            speedrunSections[index] = new sectionClass(() => onSectionCompleted(index), sectionName, sectionElement);
        })
    startSpeedrunSection(0)
}

function startSpeedrunSection(index) {
    let prevSection = currentSection;
    const nextSection = speedrunSections[index];
    const nextSectionElement = nextSection?.sectionElement;
    const prevSectionElement = prevSection?.sectionElement;

    prevSectionElement?.classList.remove("active-speedrun-section");
    nextSectionElement?.classList.add("active-speedrun-section");

    currentSection = nextSection;

    prevSection?.onStop();
    const time = new Date().getTime();
    if (!prevSection) {
        startTime = time;
        isRunning = true;
        splitTimes = {}
        updateTimer();
    }
    else {
        overlayController.registerSplitPassed(
            (time - startTime) / 1000,
            (time - lastSectionEndTime) / 1000,
            index - 1,
            prevSection.sectionName,
        );
        splitTimes[index - 1] = {
            time: (time - startTime) / 1000,
            index: index-1,
            name: prevSection.sectionName
        }
    }
    lastSectionEndTime = time;
    if (nextSection) {
        nextSection.onStart();
    } else {
        isRunning = false;
        overlayController.setTimer((time - startTime) / 1000);
        overlayController.writeNewPbTimeFromSplits(splitTimes)
        overlayController.showResetButton();
    }
}

function onSectionCompleted(index) {
    startSpeedrunSection(index+1)
}

function updateTimer() {
    if (!isRunning) return;
    const time = new Date().getTime();
    const timeSinceStart = (time - startTime) / 1000;
    overlayController.setTimer(timeSinceStart);
    requestAnimationFrame(updateTimer);
}

window.resetSpeedrun = reset;

function reset() {
    if (currentSection) {
        currentSection.onStop();
        overlayController.increaseResetsFor(currentSection.sectionName);
    }
    speedrunSections.forEach(section => section.reset())
    startSpeedrun();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "r") reset();
})