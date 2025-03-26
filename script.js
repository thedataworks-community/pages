import { initTopNav } from './top-nav.js';
import { setupDCComponents } from './components.js';

import { setupTable } from './table.js';
import { toggleTableDetails } from './table.js';
import { filterTable } from './table.js';

document.addEventListener("DOMContentLoaded", function() {
	
	initTopNav();
		
	document.getElementById("commonsLink").addEventListener("click", (event) => {
		event.preventDefault();
		showSection("commons");
	});

	setupDCComponents();
	
	setupTable();
	
});
