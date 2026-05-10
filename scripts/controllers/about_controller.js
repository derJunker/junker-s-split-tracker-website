import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['speechParagraph', 'speechTextField', 'speech']
    static values = { index: Number, isSpeaking: Boolean, skipCurrentAnimation: Boolean }

    connect() {
        this.speechParagraphTargets.forEach(target => {
            console.log(target)
        })
    }

    next() {
        if (this.isSpeakingValue) {
            this.skipCurrentAnimationValue = true;
        } else {
            this.indexValue = (this.indexValue + 1) % this.speechParagraphTargets.length;
        }
    }

    indexValueChanged() {
        this.showCurrentText()
    }

    showCurrentText() {
        const target = this.speechParagraphTargets[this.indexValue]
        const targetWidth = target.offsetWidth;
        const targetHeight = target.offsetHeight;

        this.speechTarget.style.setProperty("--speech-width", targetWidth+"px");
        this.speechTarget.style.setProperty("--speech-height", targetHeight+"px");

        this.isSpeakingValue = true;
        this.animateText(target.textContent)
    }

    async animateText(text) {
        this.speechTextFieldTarget.innerHTML = "";
        return new Promise(async resolve => {
            /* timeout per character = speed */
            const startSpeed = 70;
            const endSpeed = 20;
            let i = 0;
            let speed = startSpeed;

            while (i < text.length) {
                this.speechTextFieldTarget.innerHTML += text.charAt(i);
                i++;
                await new Promise(r => setTimeout(r, speed));
                if (this.skipCurrentAnimationValue) {
                    speed = 0
                } else {
                    speed = Math.max(endSpeed, speed * .95)
                }
            }
            this.isSpeakingValue = false;
            this.skipCurrentAnimationValue = false;
            resolve();
        })
    }
}