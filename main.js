// faq
const faqs = document.querySelectorAll(".faq");
faqs.forEach((faq) => {
	faq.addEventListener("click", () => {
		faq.classList.toggle("active");
	});
});

// animation scroll
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry);
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} else {
			entry.target.classList.remove("show");
		}
	});
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// hamburgermenu
const hamburger = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu-links a");

hamburger.addEventListener("click", () => {
	mobileMenu.classList.add("active");
	document.body.style.overflow = "hidden";
	document.querySelector(".nav-container").style.display = "none";
});

closeMenu.addEventListener("click", () => {
	mobileMenu.classList.remove("active");
	document.body.style.overflow = "auto";
	document.querySelector(".nav-container").style.display = "flex";
});

mobileLinks.forEach((link) => {
	link.addEventListener("click", () => {
		mobileMenu.classList.remove("active");
		document.body.style.overflow = "auto";
		document.querySelector(".nav-container").style.display = "flex";
	});
});

// Language switcher functionality
document.addEventListener("DOMContentLoaded", function () {
	// Mobile language selector toggle
	const mobileLangSelector = document.querySelector(".mobile-language-selector");
	const mobileLangToggle = document.querySelector(".mobile-language-toggle");

	if (mobileLangToggle) {
		mobileLangToggle.addEventListener("click", function (e) {
			e.stopPropagation();
			mobileLangSelector.classList.toggle("active");
		});
	}

	// Change language functionality
	const langOptions = document.querySelectorAll(".lang-option");
	const currentLangElements = document.querySelectorAll(".current-lang");

	langOptions.forEach((option) => {
		option.addEventListener("click", function (e) {
			e.preventDefault();

			// Get the language code
			const lang = this.getAttribute("data-lang");

			// Update the current language display
			currentLangElements.forEach((el) => {
				el.textContent = lang.toUpperCase();
			});

			// Remove active class from all options
			langOptions.forEach((opt) => {
				opt.classList.remove("active");
			});

			// Add active class to clicked option
			this.classList.add("active");

			// Close the mobile dropdown
			if (mobileLangSelector) {
				mobileLangSelector.classList.remove("active");
			}

			// Change language logic
			changeLanguage(lang);
		});
	});

	// Close mobile language dropdown when clicking outside
	document.addEventListener("click", function (e) {
		if (mobileLangSelector && !mobileLangSelector.contains(e.target)) {
			mobileLangSelector.classList.remove("active");
		}
	});
});

// Function to handle language change
function changeLanguage(lang) {
	// Store the selected language in localStorage
	localStorage.setItem("selectedLanguage", lang);

	// Optionally redirect to language-specific URL
	// window.location.href = `/${lang}/index.html`;

	// Or if you're using a single-page approach with translations stored in JS:
	// loadTranslations(lang);

	console.log(`Language changed to: ${lang}`);
}

// Function to load the saved language on page load
function loadSavedLanguage() {
	const savedLang = localStorage.getItem("selectedLanguage");
	if (savedLang) {
		// Update UI to show saved language
		const currentLangElements = document.querySelectorAll(".current-lang");
		currentLangElements.forEach((el) => {
			el.textContent = savedLang.toUpperCase();
		});

		// Update active class in dropdowns
		const langOptions = document.querySelectorAll(".lang-option");
		langOptions.forEach((option) => {
			if (option.getAttribute("data-lang") === savedLang) {
				option.classList.add("active");
			} else {
				option.classList.remove("active");
			}
		});

		// Apply saved language to page
		// loadTranslations(savedLang);
	}
}

// Call the function to load saved language when page loads
document.addEventListener("DOMContentLoaded", loadSavedLanguage);
