import {Controller} from "@hotwired/stimulus";
import {translate} from "../i18n.js";

export default class extends Controller {
    toggle(event) {
        event?.preventDefault();

        const current = document.documentElement.lang || 'en';
        translate(current === 'ja' ? 'en' : 'ja');
    }
}

