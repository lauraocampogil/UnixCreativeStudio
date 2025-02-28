export function initMobileMenu() {
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
}
