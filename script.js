import { initTopNav } from './top-nav.js';
import { setupDCComponents } from './components.js';

document.addEventListener("DOMContentLoaded", function() {
	
	initTopNav();
		
	document.getElementById("commonsLink").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("commons");
	});

});


