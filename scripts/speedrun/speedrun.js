import HeroSpeedrunSection from "./sections/hero";
import FeaturesSpeedrunSection from "./sections/features";
import {registerSplitPassed} from "./overlay-interface";

/**
 * @type Array<SpeedrunSection>
 */
const speedrunSections = [];
let currentSection = null;
let startTime = null;
let lastSectionEndTime = null;

const sectionNameToClassMap = {
    "hero": HeroSpeedrunSection,
    "features": FeaturesSpeedrunSection
}

export function startSpeedrun() {
    const sectionElements = [...document.querySelectorAll(".section[data-speed-section]")]
    sectionElements
        .forEach(sectionElement => {
            const sectionName =sectionElement.dataset.speedSection;
            const index = Number(sectionElement.dataset.speedIndex);
            const sectionClass = sectionNameToClassMap[sectionName];
            if (!sectionClass) throw new Error(`No section element found for ${sectionName}`);
            speedrunSections[index] = new sectionClass(() => onSectionCompleted(index, sectionName), sectionName, sectionElement);
        })
    startSpeedrunSection(0)
}

function startSpeedrunSection(index) {
    let prevSection = currentSection;
    const nextSection = speedrunSections[index];
    const nextSectionElement = nextSection.sectionElement;
    const prevSectionElement = prevSection?.sectionElement;

    prevSectionElement?.classList.remove("active-speedrun-section");
    nextSectionElement.classList.add("active-speedrun-section");

    currentSection = nextSection;

    prevSection?.onStop();
    const time = new Date().getTime();
    if (!prevSection) startTime = time;
    else {
        registerSplitPassed(
            (time - startTime) / 1000,
            (time - lastSectionEndTime) / 1000,
            index-1,
            prevSection.sectionName
        )
    }
    lastSectionEndTime = time;

    nextSection.onStart();
}

function onSectionCompleted(index, name) {
    if (index < speedrunSections.length-1) {
        startSpeedrunSection(index+1)
    }
}