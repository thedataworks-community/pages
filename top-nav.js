export function initTopNav() {
	
	const sections = {
		home: document.getElementById("home"),
		commons: document.getElementById("commons"),
		contact: document.getElementById("contact")
	};

	window.showSection = function (section, updateURL = true) {
	
		console.log("SHOW SECTION",section);
	
		Object.values(sections).forEach(div => div.classList.remove("active"));
		sections[section].classList.add("active");

		// Update the URL with the new hash, if needed
		if (updateURL) {
			history.pushState(null, "", `#${section}`);
		}
	
		// Collapse the navbar in mobile view
		const navbarToggler = document.querySelector(".navbar-toggler");
		const navbarCollapse = document.querySelector(".navbar-collapse");
		if (navbarCollapse.classList.contains("show")) {
			navbarToggler.click(); // Simulate a click to close the menu
		}
	}

	const initialSection = window.location.hash.replace("#", "") || "home";

	// Ensure we only update if a valid section exists
	if (Object.keys(sections).includes(initialSection)) {
		showSection(initialSection, false);
	}	
	
	// Handle back/forward navigation
	window.addEventListener("popstate", function () {
		const section = window.location.hash.replace("#", "") || "home";
		showSection(section, false); // Don't update URL when navigating via history
	});

	document.getElementById("homeNav").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("home");
	});
	document.getElementById("commonsNav").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("commons");
	});
	document.getElementById("contactNav").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("contact");
	});
}
