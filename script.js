document.addEventListener("DOMContentLoaded", function() {
	const sections = {
		home: document.getElementById("home"),
		commons: document.getElementById("commons"),
		contact: document.getElementById("contact")
	};

	function showSection(section) {
		Object.values(sections).forEach(div => div.classList.remove("active"));
		sections[section].classList.add("active");
	
		// Collapse the navbar in mobile view
		const navbarToggler = document.querySelector(".navbar-toggler");
		const navbarCollapse = document.querySelector(".navbar-collapse");
		if (navbarCollapse.classList.contains("show")) {
			navbarToggler.click(); // Simulate a click to close the menu
		}
	}

	document.getElementById("homeNav").addEventListener("click", () => showSection("home"));
	document.getElementById("commonsNav").addEventListener("click", () => showSection("commons"));
	document.getElementById("contactNav").addEventListener("click", () => showSection("contact"));
	
	document.querySelectorAll("datacommons-line").forEach((chart) => {
		const shadowRoot = chart.shadowRoot;
	
		if (shadowRoot) {
			// Observe changes to the shadow DOM
			const observer = new MutationObserver((mutations, obs) => {
				let changesMade = false;
	
				mutations.forEach((mutation) => {
					// Modify Download Button
					const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
					if (downloadButton && !downloadButton.dataset.modified) {
						downloadButton.innerHTML = `<a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">The DataWorks Commons</a>`;
						downloadButton.dataset.modified = "true";
						changesMade = true;
					}
	
					// Modify Source Text
					const sourceElement = shadowRoot.querySelector("div[class*='source']");
					if (sourceElement && !sourceElement.dataset.modified) {
						sourceElement.innerHTML = `<strong style="font-size: 8px; color: black;">Source:</strong> 
							<a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 8px;">
							<em>Oklahoma Department of Corrections</em></a>`;
						sourceElement.dataset.modified = "true";
						changesMade = true;
					}
	
					// Modify line colors
					const svgPaths = shadowRoot.querySelectorAll("path[stroke]");
					if (svgPaths.length > 0 && !svgPaths[0].dataset.modified) {
						const colors = ["#FF1493", "#2E86C1", "#28B463", "#E74C3C", "#8E44AD"]; // Pink, Blue, Green, Red, Purple
	
						svgPaths.forEach((path, index) => {
							path.style.stroke = colors[index % colors.length];  // Assign colors in sequence
							path.style.strokeWidth = "3px";  // Optional: Increase line thickness
							path.dataset.modified = "true";  // Prevent duplicate changes
						});
	
						changesMade = true;
					}
				});
	
				if (changesMade) obs.disconnect();
			});
	
			observer.observe(shadowRoot, { childList: true, subtree: true });
	
		}
	});
});
