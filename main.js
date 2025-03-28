// animation scroll
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} else {
			entry.target.classList.remove("show");
		}
	});
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// Translation functionality
let translations = {};

async function loadTranslations() {
	try {
		const response = await fetch("translations.json");
		translations = await response.json();

		// Get the saved language or default to "es"
		const storedLang = localStorage.getItem("selectedLanguage") || "es";

		// Apply translations
		setLanguage(storedLang);
	} catch (error) {
		console.error("Error loading translations:", error);
	}
}

function setLanguage(language) {
	// Store the selected language preference
	localStorage.setItem("selectedLanguage", language);
	document.documentElement.lang = language;

	// Update text content for elements with data-i18n attribute
	const elements = document.querySelectorAll("[data-i18n]");
	elements.forEach((element) => {
		const keys = element.getAttribute("data-i18n").split(".");
		let translation = translations[language];

		for (const key of keys) {
			translation = translation?.[key];
		}

		if (translation) {
			if (element.tagName.toLowerCase() === "option") {
				element.text = translation;
			} else {
				element.innerHTML = translation;
			}
		}
	});

	// Update placeholders
	const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
	placeholderElements.forEach((element) => {
		const keys = element.getAttribute("data-i18n-placeholder").split(".");
		let translation = translations[language];

		for (const key of keys) {
			translation = translation?.[key];
		}

		if (translation) {
			element.placeholder = translation;
		}
	});

	// Update current language display
	const currentLangElements = document.querySelectorAll(".current-lang");
	currentLangElements.forEach((el) => {
		el.textContent = language.toUpperCase();
	});

	// Update active class in language options
	const langOptions = document.querySelectorAll(".lang-option");
	langOptions.forEach((option) => {
		if (option.getAttribute("data-lang") === language) {
			option.classList.add("active");
		} else {
			option.classList.remove("active");
		}
	});
}

// Modified changeLanguage function to integrate with translations
function changeLanguage(lang) {
	setLanguage(lang);
}

// Enhance your existing code with these modifications
document.addEventListener("DOMContentLoaded", function () {
	// First load translations
	loadTranslations();

	// Mobile language selector toggle
	const mobileLangSelector = document.querySelector(".mobile-language-selector");
	const mobileLangToggle = document.querySelector(".mobile-language-toggle");

	// Desktop language selector toggle
	const desktopLangSelector = document.querySelector(".language-selector");
	const desktopLangToggle = document.querySelector(".language-toggle");

	if (desktopLangToggle) {
		desktopLangToggle.addEventListener("click", function (e) {
			e.stopPropagation();
			desktopLangSelector.classList.toggle("active");
		});
	}

	if (mobileLangToggle) {
		mobileLangToggle.addEventListener("click", function (e) {
			e.stopPropagation();
			mobileLangSelector.classList.toggle("active");
		});
	}

	// Change language functionality
	const langOptions = document.querySelectorAll(".lang-option");

	langOptions.forEach((option) => {
		option.addEventListener("click", function (e) {
			e.preventDefault();

			// Get the language code
			const lang = this.getAttribute("data-lang");

			// Change language (now calls setLanguage internally)
			changeLanguage(lang);

			// Close the dropdowns
			if (mobileLangSelector) {
				mobileLangSelector.classList.remove("active");
			}
			if (desktopLangSelector) {
				desktopLangSelector.classList.remove("active");
			}
		});
	});

	// Close language dropdowns when clicking outside
	document.addEventListener("click", function (e) {
		if (mobileLangSelector && !mobileLangSelector.contains(e.target)) {
			mobileLangSelector.classList.remove("active");
		}
		if (desktopLangSelector && !desktopLangSelector.contains(e.target) && !desktopLangToggle.contains(e.target)) {
			desktopLangSelector.classList.remove("active");
		}
	});
});
// For lord-icon scripts
document.addEventListener("DOMContentLoaded", function () {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const script = document.createElement("script");
				script.src = "https://cdn.lordicon.com/lordicon.js";
				document.body.appendChild(script);
				observer.disconnect();
			}
		});
	});
	observer.observe(document.querySelector(".features"));
});
