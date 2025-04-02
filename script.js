// import { initTopNav } from './top-nav.js';
// import { setupDCComponents } from './components.js';
// 
// import { setupTable } from './table.js';
// import { toggleTableDetails } from './table.js';
// import { filterTable } from './table.js';
// 
// // Temporarily store hash and clear it to prevent browser scroll
// const savedHash = window.location.hash;
// history.replaceState(null, "", window.location.pathname);
// 
// document.addEventListener("DOMContentLoaded", function () {
// 	initTopNav();
// 	setupDCComponents();
// 	setupTable();
// 
// 	// Restore and manually show section
// 	const targetSection = savedHash.replace("#", "") || "home";
// 	showSection(targetSection);
// 
// 	// "Learn about the DataWorks Commons" button
// 	const commonsLink = document.getElementById("commonsLink");
// 	const commonsNav = document.getElementById("commonsNav");
// 
// 	if (commonsLink && commonsNav) {
// 		commonsLink.addEventListener("click", (event) => {
// 			event.preventDefault();
// 			commonsNav.click();
// 		});
// 	}
// 
// 	// 🔥 Intercept custom solution buttons (no href, just data-target)
// 	document.querySelectorAll('[data-target^="item"]').forEach((btn) => {
// 		btn.addEventListener("click", (event) => {
// 			event.preventDefault();
// 			const target = btn.getAttribute("data-target");
// 			const navItem = document.getElementById(`${target}Nav`);
// 			if (navItem) navItem.click(); // full nav behavior
// 		});
// 	});
// });

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
	document.querySelectorAll('[data-target]').forEach((btn) => {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			const sectionId = btn.getAttribute("data-target"); // item5
			const anchorId = btn.getAttribute("href")?.replace("#", ""); // method1, method2
	
			// Show main section
			showSection(sectionId);
	
			// Hide all methodology blocks
			if (sectionId === "item5") {
				document.querySelectorAll(".methodology-section").forEach((el) =>
					el.classList.add("d-none")
				);
			}
	
			// Scroll to the right method block
			if (anchorId) {
				setTimeout(() => {
					const scrollTarget = document.getElementById(anchorId);
					if (scrollTarget) {
						scrollTarget.classList.remove("d-none");
						scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
					}
				}, 100);
			}
		});
	});
});

// ✅ Added missing showSection function
function showSection(sectionId) {
  document.querySelectorAll(".content, .content-section").forEach((el) => {
	el.classList.remove("active");
  });

  const section = document.getElementById(sectionId);
  if (section) {
	section.classList.add("active");
  }
}
