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
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksAnchors = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	navLinks.classList.toggle("active");
});

// Close menu when clicking a link
navLinksAnchors.forEach((link) => {
	link.addEventListener("click", () => {
		hamburger.classList.remove("active");
		navLinks.classList.remove("active");
	});
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
	if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
		hamburger.classList.remove("active");
		navLinks.classList.remove("active");
	}
});
