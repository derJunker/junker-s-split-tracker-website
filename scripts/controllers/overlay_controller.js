import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['overlay', 'split']

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
    }

    readSplitInfo() {
        return {
            "hero": {
                index: 0,
                resets: 10,
                pbTime: 3.501,
                goldTime: 2.500,
                goldPace: 2.500
            },
            "features": {
                index: 1,
                resets: 4,
                pbTime: 6.120,
                goldTime: 2.241,
                goldPace: 5.400
            }
        }
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
        addSplitPassInfoColorClasses(gold, goldPace, early, late, splitElement);
        let sign = '';
        if (diff >= 0) sign = '+';
        else if (diff < 0) sign = '-';
        const absDiff = Math.abs(diff);
        splitElement.querySelector(".split-diff .sign").textContent = sign
        splitElement.querySelector(".split-diff .num").textContent = formatPbTime(absDiff, true);
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
    const diff = time - splitInfo.pbTime ;
    const gold = splitInfo.goldTime > splitDuration;
    const goldPace = splitInfo.goldPace > time;
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