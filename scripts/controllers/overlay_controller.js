import {Controller} from "@hotwired/stimulus";

const SPLIT_INFOS_STORAGE_KEY = "splitInfos";
const DEFAULT_SPLIT_INFOS = {
    "hero": {
        index: 0,
        resets: 0,
        pbTime: null,
        goldTime: null,
        goldPace: null
    },
    "features": {
        index: 1,
        resets: 0,
        pbTime: null,
        goldTime: null,
        goldPace: null
    },
    "configure": {
        index: 2,
        resets: 0,
        pbTime: null,
        goldTime: null,
        goldPace: null
    },
    "faq": {
        index: 3,
        resets: 0,
        pbTime: null,
        goldTime: null,
        goldPace: null
    },
    "about": {
        index: 4,
        resets: 0,
        pbTime: null,
        goldTime: null,
        goldPace: null
    }
};

export default class extends Controller {
    static targets = ['split', 'timer']

    initialize() {
        this.splitInfos = this.readSplitInfo();
    }

    connect() {
        this.setSplitInfosToOverlay();
    }

    setSplitInfosToOverlay() {
        Object.keys(this.splitInfos).forEach(key => {
            this.setSplitInfo(key, this.splitInfos[key])
        })
    }

    setSplitInfo(splitName, splitInfo) {
        const splitElement = this.findSplitElement(splitName, splitInfo.index);

        splitElement.querySelector(".split-resets").textContent = splitInfo.resets;
        splitElement.querySelector(".split-time").textContent = formatPbTime(splitInfo.pbTime)
        splitElement.querySelector(".split-diff").classList.remove("golden", "early", "late");
        splitElement.querySelector(".split-time").classList.remove("golden", "early", "late");
        splitElement.querySelector(".split-diff .sign").textContent = '';
        splitElement.querySelector(".split-diff .num").textContent = '';
        splitElement.querySelector(".split-name").classList.remove("gold-pace");
    }

    readSplitInfo() {
        const storedSplitInfos = this.readSplitInfosFromLocalStorage();
        if (storedSplitInfos && this.hasMatchingSplitIndices(storedSplitInfos)) {
            return storedSplitInfos;
        }

        this.writeSplitInfosToLocalStorage(DEFAULT_SPLIT_INFOS);
        return DEFAULT_SPLIT_INFOS;
    }

    readSplitInfosFromLocalStorage() {
        if (typeof localStorage === "undefined") return null;

        try {
            const storedValue = localStorage.getItem(SPLIT_INFOS_STORAGE_KEY);
            if (!storedValue) return null;
            return JSON.parse(storedValue);
        } catch {
            return null;
        }
    }

    writeSplitInfosToLocalStorage(splitInfos) {
        if (typeof localStorage === "undefined") return;

        localStorage.setItem(SPLIT_INFOS_STORAGE_KEY, JSON.stringify(splitInfos));
    }

    hasMatchingSplitIndices(splitInfos) {
        return Object.entries(DEFAULT_SPLIT_INFOS).every(([splitName, defaultSplitInfo]) => {
            const splitInfo = splitInfos?.[splitName];
            return splitInfo && Number(splitInfo.index) === defaultSplitInfo.index;
        });
    }

    findSplitElement(splitName, index) {
        const splitElement = this.splitTargets.find(el => el.dataset.splitName === splitName && Number(el.dataset.splitId) === index);
        if (!splitElement) throw new Error(`No split element found for ${splitName} with index ${index}`);
        return splitElement;
    }

    // This is getting called from speedrun.js.
    registerSplitPassed(time, splitDuration, index, splitName) {
        const splitElement = this.findSplitElement(splitName, index);
        splitElement.querySelector(".split-time").textContent = formatPbTime(time);
        const splitInfo = this.splitInfos[splitName];
        const {gold, goldPace, early, late, diff} = getSplitPassInfo(splitInfo, time, splitDuration);
        this.updateSplitInfosIfChanged(gold, goldPace, time, splitDuration, splitInfo)
        addSplitPassInfoColorClasses(gold, goldPace, early, late, splitElement);
        let sign = '';
        if (diff >= 0) sign = '+';
        else if (diff < 0) sign = '-';
        const absDiff = Math.abs(diff);
        splitElement.querySelector(".split-diff .sign").textContent = sign
        splitElement.querySelector(".split-diff .num").textContent = formatPbTime(absDiff, true);
    }

    writeNewPbTimeFromSplits(splitTimes) {
        const lastSplit = Object.keys(this.splitInfos).map(key => this.splitInfos[key]).sort((a, b) => b.index-a.index)[0];
        const lastSplitTime = lastSplit.pbTime;
        if (lastSplitTime <= splitTimes[lastSplit.index].time) return // dont save if not pb
        Object.values(this.splitInfos).forEach(splitInfo => {
            const splitTimeInfo = splitTimes[splitInfo.index]
            splitInfo.pbTime = splitTimeInfo.time;
        })
        this.writeSplitInfosToLocalStorage(this.splitInfos);
    }

    updateSplitInfosIfChanged(gold, goldPace, time, splitDuration, splitInfo) {
        if (gold) splitInfo.goldTime = splitDuration;
        if (goldPace) splitInfo.goldPace = time;

        if (goldPace || gold) this.writeSplitInfosToLocalStorage(this.splitInfos)
    }

    setTimer(time) {
        this.timerTarget.textContent = formatPbTime(time);
    }

    resetOverlay() {
        this.setSplitInfosToOverlay();
    }
}

function formatPbTime(seconds, noZeroFill = false) {
    if (seconds === Infinity)
        seconds = 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = Math.floor(absSeconds % 60);
    const ms = Math.round((absSeconds - Math.floor(absSeconds)) * 1000);

    const msStr = ms.toString().padStart(3, '0').slice(0, 3);

    if (noZeroFill) {
        if (mins > 0) {
            return `${mins}:${secs.toString().padStart(2, '0')}.${msStr}`;
        } else if (secs > 0) {
            return `${secs}.${msStr}`;
        } else {
            return `0.${msStr}`;
        }
    }

    const minsStr = mins.toString().padStart(2, '0');
    const secsStr = secs.toString().padStart(2, '0');

    return `${minsStr}:${secsStr}.${msStr}`;
}

function getSplitPassInfo(splitInfo, time, splitDuration) {
    const diff = splitInfo.pbTime !== null ? time - splitInfo.pbTime : -1*time;
    const gold = splitInfo.goldTime !== null ?  splitInfo.goldTime > splitDuration : true;
    const goldPace = splitInfo.goldPace !== null ? splitInfo.goldPace > time : true;
    const early = diff < 0;
    const late = diff > 0;
    return { gold, goldPace, early, late, diff };
}

function addSplitPassInfoColorClasses(gold, goldPace, early, late, splitElement) {
    const diffAndTime = splitElement.querySelectorAll(".split-diff, .split-time");
    if (gold) diffAndTime.forEach(el => el.classList.add("golden"))
    else if (early) diffAndTime.forEach(el => el.classList.add("early"))
    else if (late) diffAndTime.forEach(el => el.classList.add("late"))

    if (goldPace) splitElement.querySelector(".split-name").classList.add("gold-pace")
}