import { Application } from "@hotwired/stimulus"

import FaqController from "./faq_controllers"

window.Stimulus = Application.start()
Stimulus.register("faq", FaqController)