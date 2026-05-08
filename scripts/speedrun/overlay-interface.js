let overlay = null;

document.addEventListener("DOMContentLoaded", function() {
    overlay = document.getElementById("splits");
    initSplits()
})

function initSplits() {
    const splitInfos = readSplitInfo();
    Object.keys(splitInfos).forEach(key => {
        setSplitInfo(key, splitInfos[key])
    })
}

function setSplitInfo(splitName, splitInfo) {
    const splitElement = overlay.querySelector(`.split[data-split-name="${splitName}"][data-split-id="${splitInfo.index}"]`);
    if (!splitElement) throw new Error(`No split element found for ${splitName} with index ${splitInfo.index}`);

    splitElement.querySelector(".split-resets").textContent = splitInfo.resets;
    splitElement.querySelector(".split-time").textContent = formatPbTime(splitInfo.pbTime)
}

function readSplitInfo() {
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