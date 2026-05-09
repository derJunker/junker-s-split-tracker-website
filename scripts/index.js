import AOS from 'aos';
import 'aos/dist/aos.js';
import 'aos/dist/aos.css';

import './i18n.js';
import './header.js';
import './buttons.js';
import './speedrun/overlay-interface.js'
import './controllers/register-controller.js'
import {startSpeedrun} from "./speedrun/speedrun";

const fadeUpSelector = '.text-image .left, .text-image .right';
const staggeredListSelector = 'ul.animate-aos';

document.querySelectorAll(fadeUpSelector).forEach((element) => {
    element.dataset.aosDelay = '500';

    if (element.classList.contains('right')) {
        delete element.dataset.aosDelay;
        element.dataset.aos = 'fade-up';
    }
});

document.querySelectorAll(staggeredListSelector).forEach((list) => {
    let overallDelay = list.getAttribute('data-overall-aos-delay');
    if (overallDelay && !isNaN(Number(overallDelay))) {
        overallDelay = Number(overallDelay);
    } else {
        overallDelay = 0;
    }
    Array.from(list.children).forEach((item, index) => {
        if (item.tagName !== 'LI') {
            return;
        }

        item.dataset.aos = 'fade-up';
        item.dataset.aosDelay = String(overallDelay + index * 50);
    });
});

AOS.init({
    duration: 1500,
    once: true,
});

document.addEventListener('DOMContentLoaded', () => {
    startSpeedrun()
})