import { initFaqs } from "./modules/faq.js";
import { initAnimations } from "./modules/animations.js";
import { initMobileMenu } from "./modules/mobile-menu.js";
import { initTranslations } from "./modules/translations.js";
import { initLazyLoading } from "./modules/lazy-loading.js";

document.addEventListener("DOMContentLoaded", function () {
	// Inicializa cada módulo
	initFaqs();
	initAnimations();
	initMobileMenu();
	initTranslations();
	initLazyLoading();
});
