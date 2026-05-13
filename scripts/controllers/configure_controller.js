import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['section', 'tile']

    toggle(event) {
        if (event.type.startsWith('keydown')) {
            event.preventDefault()
        }

        event.currentTarget.classList.toggle('selected')
        this.syncSelectionState()
    }

    syncSelectionState() {
        if (this.tileTargets.every(target => target.classList.contains('selected'))) {
            this.sectionTarget.classList.add('all-selected')
            return
        }

        this.sectionTarget.classList.remove('all-selected')
    }

    reset() {
        this.tileTargets.forEach(target => target.classList.remove('selected'))
        this.sectionTarget.classList.remove('all-selected')
    }
}