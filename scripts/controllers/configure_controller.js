import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ['section', 'tile']
    connect() {
        this.tileTargets.forEach(target => {
            const targets = this.tileTargets;
            target.addEventListener('click', () => {
                target.classList.toggle('selected')
                if (targets.every(target => target.classList.contains('selected'))) this.sectionTarget.classList.add('all-selected')
                else this.sectionTarget.classList.remove('all-selected')
            })
        })
    }
}