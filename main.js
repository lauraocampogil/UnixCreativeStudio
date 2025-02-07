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
