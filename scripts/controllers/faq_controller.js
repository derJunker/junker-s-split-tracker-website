import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['item', 'question', 'answer'];

    connect() {
        this.answerHeight = this.answerTarget.getBoundingClientRect().height;
        this.questionHeight = this.questionTarget.getBoundingClientRect().height;

        this.itemTarget.style.setProperty("--question-height", this.questionHeight+ "px")
        this.itemTarget.style.setProperty("--answer-height", this.answerHeight + "px")
    }

    disconnect() {
        console.log("FAQController disconnected");
    }

    toggle() {
        this.itemTarget.classList.toggle("faq-open")
    }
}