import {Application} from "@hotwired/stimulus"

import FaqController from "./faq_controller"
import OverlayController from "./overlay_controller"
import PreviewController from "./preview_controller"
import ConfigureController from "./configure_controller"
import FaqSectionController from "./faq_section_controller"
import AboutSectionController from "./about_controller"

window.Stimulus = Application.start()
Stimulus.register("faq", FaqController)
Stimulus.register('overlay', OverlayController)
Stimulus.register('preview-list', PreviewController)
Stimulus.register('configure', ConfigureController)
Stimulus.register('faq-section', FaqSectionController)
Stimulus.register('about', AboutSectionController)

export function getSingularControllerForIdentifier(identifier) {
    const controllerEl = document.querySelector(`[data-controller="${identifier}"]`);
    if (!controllerEl) throw new Error(`No controller found for identifier ${identifier}`);
    return Stimulus.getControllerForElementAndIdentifier(
        controllerEl,
        identifier
    )
}