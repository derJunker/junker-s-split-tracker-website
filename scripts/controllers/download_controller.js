import {Controller} from "@hotwired/stimulus";

const RELEASES_API_URL = "https://api.github.com/repos/derJunker/pogostuck-split-tracker/releases/latest";
const FALLBACK_DOWNLOAD_URL = "https://github.com/derJunker/pogostuck-split-tracker/releases/latest";

export default class extends Controller {
    connect() {
        this.downloadLink = null;
        this.downloadLinkPromise = null;
    }

    async open(event) {
        event?.preventDefault();

        const downloadLink = await this.getDownloadLink();
        window.open(downloadLink || FALLBACK_DOWNLOAD_URL, "_blank", "noopener");
    }

    getDownloadLink() {
        if (this.downloadLink) {
            return Promise.resolve(this.downloadLink);
        }

        if (!this.downloadLinkPromise) {
            this.downloadLinkPromise = this.findDownloadLink();
        }

        return this.downloadLinkPromise;
    }

    async findDownloadLink() {
        try {
            const response = await fetch(RELEASES_API_URL);
            const data = await response.json();

            for (const asset of data.assets || []) {
                if (asset.name.endsWith(".exe")) {
                    this.downloadLink = asset.browser_download_url;
                    break;
                }
            }
        } catch (error) {
            console.error("Error fetching download link:", error);
        }

        return this.downloadLink;
    }
}

