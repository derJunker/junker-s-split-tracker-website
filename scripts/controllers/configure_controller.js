import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['section', 'tile']
    connect() {
        this.targetListeners = []
        this.tileTargets.forEach((target, index) => {
            const targets = this.tileTargets;
            const clickListener = () => {
                target.classList.toggle('selected')
                if (targets.every(target => target.classList.contains('selected'))) this.sectionTarget.classList.add('all-selected')
                else this.sectionTarget.classList.remove('all-selected')
            }
            target.addEventListener('click', clickListener)
            this.targetListeners.push({
                target,
                clickListener
            })
        })
    }

    disconnect() {
        this.targetListeners.forEach(({target, clickListener}) => {
            target.removeEventListener('click', clickListener)
        })
    }

    reset() {
        this.targetListeners.forEach(({target, clickListener}) => {
            target.classList.remove('selected')
            this.sectionTarget.classList.remove('all-selected')
        })
    }
}