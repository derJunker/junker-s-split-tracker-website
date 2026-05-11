import {Controller} from "@hotwired/stimulus";

// Controller for the whole FAQ section. Watches child faq items for the
// 'faq-open' class and remembers which items have been opened at least once.
// When every faq item has been opened at least once the controller adds the
// class 'all-opened' to the section element.
export default class extends Controller {
    connect() {
        // Set of faq item elements that have been opened at least once
        this.openedItems = new Set();

        // Collect faq items inside this section (kept as snapshot but we will re-query when needed)
        this.items = Array.from(this.element.querySelectorAll('.faq-item'));
        this.total = this.items.length;

        // MutationObserver to watch for class changes on faq items
        this.observer = new MutationObserver(mutations => this.handleMutations(mutations));
        this.observer.observe(this.element, {
            attributes: true,
            attributeFilter: ['class'],
            attributeOldValue: true,
            subtree: true
        });

        // initial scan in case some items are open on load
        this.items.forEach((item, idx) => {
            if (item.classList.contains('faq-open')) {
                this.markOpened(item);
            }
        });

        this.checkAllOpened();
    }

    disconnect() {
        if (this.observer) this.observer.disconnect();
    }

    handleMutations(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;

                // Only consider elements that are faq items
                if (!target.classList || !target.classList.contains('faq-item')) continue;

                const oldClasses = mutation.oldValue ? mutation.oldValue.split(' ') : [];
                const wasOpenBefore = oldClasses.includes('faq-open');
                const isOpenNow = target.classList.contains('faq-open');

                // If it has just been opened now, remember it
                if (!wasOpenBefore && isOpenNow) {
                    this.markOpened(target);
                    this.checkAllOpened();
                }
            }
        }
    }

    markOpened(item) {
        this.openedItems.add(item);
        // mark DOM so it's visible to CSS/debugging if needed
        item.setAttribute('data-faq-opened', 'true');
    }

    checkAllOpened() {
        // Re-query current set of faq items to support dynamic changes
        this.items = Array.from(this.element.querySelectorAll('.faq-item'));
        this.total = this.items.length;

        if (this.total > 0 && this.openedItems.size >= this.total) {
            this.element.classList.add('all-opened');
        }
    }

    reset() {
        this.items.forEach(item => {
            item.classList.remove('faq-open')
        })
        this.element.classList.remove('all-opened')
    }
}


