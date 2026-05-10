import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['speechParagraph', 'speechTextField', 'speech', 'avatarOpened', 'avatarDefault']
    static values = { index: Number, isSpeaking: Boolean, skipCurrentAnimation: Boolean }

    connect() {
        if (this.speechParagraphTargets.length > 1) this.speechTarget.classList.add('has-next-text')
        this.showDefaultAvatar();
    }

    next() {
        if (this.isSpeakingValue) {
            this.skipCurrentAnimationValue = true;
        } else {
            if (this.indexValue === this.speechParagraphTargets.length-2) {
                this.element.classList.add('dialog-done')
                this.speechTarget.classList.remove('has-next-text')
            } else this.speechTarget.classList.add('has-next-text')
            this.indexValue = (this.indexValue + 1) % this.speechParagraphTargets.length;
        }
    }

    indexValueChanged() {
        this.showCurrentText()
    }

    showCurrentText() {
        const target = this.speechParagraphTargets[this.indexValue]
        const targetWidth = target.offsetWidth+1; // dont ask me why but sometimes there is a 1px diff
        const targetHeight = target.offsetHeight+1;

        this.speechTarget.style.setProperty("--speech-width", targetWidth+"px");
        this.speechTarget.style.setProperty("--speech-height", targetHeight+"px");

        this.isSpeakingValue = true;
        this.animateText(target.textContent.trim())
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
                const char = text.charAt(i);
                this.speechTextFieldTarget.innerHTML += char;
                i++;
                const timeout = this.decideTimeoutDuration(char, speed);
                await new Promise(r => setTimeout(r, timeout));
                if (this.skipCurrentAnimationValue) {
                    speed = 0
                } else {
                    speed = Math.max(endSpeed, speed * .95)
                }
                // Speaking "animation"
                if (i % 5 === 4) {
                    this.switchAvatars();
                }
            }
            this.isSpeakingValue = false;
            this.skipCurrentAnimationValue = false;
            this.showDefaultAvatar()
            resolve();
        })
    }

    // When talking slow down after a comma, stop,etc.
    decideTimeoutDuration(char, speed) {
        switch (char) {
            case '.':
            case '!':
            case '?':
                return speed*15;
            case ',':
                return speed*7.5;
            default:
                return speed;
        }
    }

    showDefaultAvatar() {
        this.avatarDefaultTarget.style.display = '';
        this.avatarOpenedTarget.style.display = 'none';
    }

    switchAvatars() {
        if (this.avatarOpenedTarget.style.display === 'none') {
            this.avatarOpenedTarget.style.display = '';
            this.avatarDefaultTarget.style.display = 'none';
        } else {
            this.avatarOpenedTarget.style.display = 'none';
            this.avatarDefaultTarget.style.display = '';
        }

    }
}