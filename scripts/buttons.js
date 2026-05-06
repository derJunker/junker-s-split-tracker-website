document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("mousedown", function () {
        btn.classList.add("pressed");
    });
    btn.addEventListener("mouseup", function () {
        btn.classList.remove("pressed");
    });
});

document.addEventListener('mouseup', function () {
    document.querySelectorAll(".btn.pressed").forEach(function (btn) {
        btn.classList.remove("pressed");
    });
})


const latestReleaseUrl = "https://github.com/derJunker/pogostuck-split-tracker/releases/latest";
let downloadLink = latestReleaseUrl;
findDownloadLink()

function openLatestRelease() {
    window.open(latestReleaseUrl, "_blank");
}

function openDownload() {
    window.open(downloadLink, "_blank");
}

function openFeedbackLink() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSeXa6HiFg7rdbIEup3HRJPcMTwQiwQxi5fOc5Fe1AJEw4nPmQ/viewform?usp=publish-editor", "_blank");
}

async function findDownloadLink() {
    try {
        let response = await fetch("https://api.github.com/repos/derJunker/pogostuck-split-tracker/releases/latest");
        let data = await response.json();
        for (let asset of data.assets) {
            if (asset.name.endsWith(".exe")) {
                downloadLink = asset.browser_download_url;
                break;
            }
        }
    } catch (error) {
        console.error("Error fetching download link:", error);
    }
}
