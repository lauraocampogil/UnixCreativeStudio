export function initLazyLoading() {
	// For lord-icon scripts
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const script = document.createElement("script");
				script.src = "https://cdn.lordicon.com/lordicon.js";
				script.async = true;
				document.body.appendChild(script);
				observer.disconnect();
			}
		});
	});

	const features = document.querySelector(".features");
	if (features) {
		observer.observe(features);
	}
}
