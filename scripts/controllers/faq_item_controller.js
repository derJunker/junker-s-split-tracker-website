import {Controller} from "@hotwired/stimulus";
import AOS from 'aos';
import 'aos/dist/aos.js';
import 'aos/dist/aos.css';

export default class extends Controller {
    static targets = ['item', 'question', 'answer'];

    connect() {
        this.updateHeights();
        this.resizeHandler = () => this.updateHeights();
        document.addEventListener('resize', this.resizeHandler);
        AOS.refresh();
    }

    updateHeights() {
        this.answerHeight = this.answerTarget.getBoundingClientRect().height;
        this.questionHeight = this.questionTarget.getBoundingClientRect().height;

        this.itemTarget.style.setProperty("--question-height", this.questionHeight+ "px")
        this.itemTarget.style.setProperty("--answer-height", this.answerHeight + "px")
    }

    disconnect() {
        document.removeEventListener('resize', this.resizeHandler);
    }

    toggle() {
        this.itemTarget.classList.toggle("faq-open")
    }
}