export function initTopNav() {
	const sections = {
		home: document.getElementById("home"),
		commons: document.getElementById("commons"),
		about: document.getElementById("about"),
		item1: document.getElementById("item1"),
		item2: document.getElementById("item2"),
		item3: document.getElementById("item3"),
		item4: document.getElementById("item4")
	};

	window.showSection = function (section, updateURL = true) {
		console.log("SHOW SECTION", section);

		Object.values(sections).forEach(div => div.classList.remove("active"));
		if (sections[section]) {
			sections[section].classList.add("active");
		}

		// Toggle home layout mode
		const main = document.getElementById("main");
		if (section === "home") {
			main.classList.add("home-layout");
		} else {
			main.classList.remove("home-layout");
		}
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
		
		window.scrollTo({ top: 0, behavior: "smooth" }); // extra credit!
	};

	// Function to send an email
	window.sendEmail = function (subject) {
		const email = "info@thedataworks.org";
		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
		window.location.href = mailtoLink;
	};

	// Ensure we only update if a valid section exists
	const initialSection = window.location.hash.replace("#", "") || "home";
	if (Object.keys(sections).includes(initialSection)) {
		showSection(initialSection, false);
	}

	// Handle back/forward navigation
	window.addEventListener("popstate", function () {
		const section = window.location.hash.replace("#", "") || "home";
		showSection(section, false);
	});

	let lastActiveMenuItem = ""; // Stores the last selected menu item
	
	function setActiveMenuItem(selectedId) {
		// Remove "active" from all nav links
		document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
			link.classList.remove("active");
		});
	
		// If "Contact" was clicked, just remember the last active menu item
		if (selectedId === "contactNav") {
			return;
		}
	
		// Add "active" only to the selected item (except for "contactNav")
		if (selectedId) {
			const selectedLink = document.getElementById(selectedId);
			if (selectedLink) {
				selectedLink.classList.add("active");
				lastActiveMenuItem = selectedId; // Store last active item
			}
		}
	}
	
	// Navbar item event listeners
	document.getElementById("homeNav").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("home");
		setActiveMenuItem(""); // No item remains bold for home
	});

	document.getElementById("commonsNav").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("commons");
		setActiveMenuItem("commonsNav");
	});

	document.getElementById("aboutNav").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("about");
		setActiveMenuItem("aboutNav");
	});
	
	document.getElementById("contactNav").addEventListener("click", (event) => {
		event.preventDefault();
		sendEmail("Hello!");
	
		// Restore the last selected menu item after clicking "Contact"
		setTimeout(() => {
			setActiveMenuItem(lastActiveMenuItem);
		}, 500); // Small delay to ensure UI updates correctly
	});

	const solutionsToggle = document.getElementById("solutionsNav");
	
	solutionsToggle.addEventListener("click", (event) => {
		event.preventDefault();
	
		// Toggle Bootstrap dropdown manually
		const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(solutionsToggle);
		
		bsDropdown.show();
		setActiveMenuItem("solutionsNav");
	});

	// Dropdown item event listeners
	["item1Nav", "item2Nav", "item3Nav", "item4Nav"].forEach(id => {
		document.getElementById(id).addEventListener("click", (event) => {
			event.preventDefault();
			showSection(id.replace("Nav", ""));
			setActiveMenuItem("solutionsNav");
	
			// Hide dropdown after click
			const bsDropdown = bootstrap.Dropdown.getInstance(solutionsToggle);
			bsDropdown?.hide();
		});
	});

	document.addEventListener("click", (event) => {
		const dropdownMenu = document.querySelector(".dropdown-menu");
		const dropdownToggle = document.getElementById("solutionsNav");
		const dropdownParent = dropdownToggle.closest(".dropdown");
	
		// If click was inside dropdown, do nothing
		if (event.target.closest(".dropdown")) {
			return;
		}
	
		// Otherwise, close the dropdown
		if (dropdownMenu.classList.contains("show")) {
			const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
			bsDropdown.hide();
			dropdownToggle.classList.remove("active");
		}
	});
	
	// Ensure "Solutions" gets bolded when clicked
	document.getElementById("solutionsNav").addEventListener("click", (event) => {
		event.preventDefault();
		setActiveMenuItem("solutionsNav"); // Mark Solutions as active
	});
}