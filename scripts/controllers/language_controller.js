import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    toggle(event) {
        event?.preventDefault();

        const current = document.documentElement.lang || 'en';
        const newLang = current === 'ja' ? 'en' : 'ja';

        // Create URL with new language parameter
        const url = new URL(window.location);
        url.searchParams.set('lang', newLang);

        // Reload page with new language
        window.location.href = url.toString();
    }
}

