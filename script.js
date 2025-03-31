import { initTopNav } from './top-nav.js';
import { setupDCComponents } from './components.js';

import { setupTable } from './table.js';
import { toggleTableDetails } from './table.js';
import { filterTable } from './table.js';

// Temporarily store hash and clear it to prevent browser scroll
const savedHash = window.location.hash;
history.replaceState(null, "", window.location.pathname);

document.addEventListener("DOMContentLoaded", function () {
	initTopNav();
	setupDCComponents();
	setupTable();

	// Restore and manually show section
	const targetSection = savedHash.replace("#", "") || "home";
	showSection(targetSection);

	// "Learn about the DataWorks Commons" button
	const commonsLink = document.getElementById("commonsLink");
	const commonsNav = document.getElementById("commonsNav");

	if (commonsLink && commonsNav) {
		commonsLink.addEventListener("click", (event) => {
			event.preventDefault();
			commonsNav.click();
		});
	}

	// 🔥 Intercept custom solution buttons (no href, just data-target)
	document.querySelectorAll('[data-target^="item"]').forEach((btn) => {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			const target = btn.getAttribute("data-target");
			const navItem = document.getElementById(`${target}Nav`);
			if (navItem) navItem.click(); // full nav behavior
		});
	});
});
