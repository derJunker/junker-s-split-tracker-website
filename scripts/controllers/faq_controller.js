import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['item', 'question', 'answer'];

    connect() {
        // TODO if you would want to make it perfect, i would need a listener to these, but it's a minor edge case
        this.answerHeight = this.answerTarget.getBoundingClientRect().height;
        this.questionHeight = this.questionTarget.getBoundingClientRect().height;

        this.itemTarget.style.setProperty("--question-height", this.questionHeight+ "px")
        this.itemTarget.style.setProperty("--answer-height", this.answerHeight + "px")
    }

    disconnect() {

    }

    toggle() {
        this.itemTarget.classList.toggle("faq-open")
    }
}