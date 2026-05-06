import AOS from 'aos';
import 'aos/dist/aos.js';
import 'aos/dist/aos.css';

import './i18n.js';
import './header.js';
import './buttons.js';

AOS.init({
    duration: 1500,
    once: true,
});