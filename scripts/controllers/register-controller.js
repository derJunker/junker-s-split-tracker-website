import {Application} from "@hotwired/stimulus"

import FaqItemController from "./faq_item_controller"
import OverlayController from "./overlay_controller"
import FeaturesController from "./features_controller"
import ConfigureController from "./configure_controller"
import FaqSectionController from "./faq_controller"
import AboutSectionController from "./about_controller"
import DownloadController from "./download_controller"
import LanguageController from "./language_controller"
import HeaderController from "./header_controller"
import HeroController from "./hero_controller"

window.Stimulus = Application.start()
Stimulus.register("faq_item", FaqItemController)
Stimulus.register('overlay', OverlayController)
Stimulus.register('features', FeaturesController)
Stimulus.register('configure', ConfigureController)
Stimulus.register('faq', FaqSectionController)
Stimulus.register('about', AboutSectionController)
Stimulus.register('download', DownloadController)
Stimulus.register('language', LanguageController)
Stimulus.register('header', HeaderController)
Stimulus.register('hero', HeroController)

export function getSingularControllerForIdentifier(identifier) {
    const controllerEl = document.querySelector(`[data-controller="${identifier}"]`);
    if (!controllerEl) throw new Error(`No controller found for identifier ${identifier}`);
    return Stimulus.getControllerForElementAndIdentifier(
        controllerEl,
        identifier
    )
}