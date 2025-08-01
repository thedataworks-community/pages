export function setupDCComponents() {
  document.querySelectorAll("datacommons-map").forEach((chart) => {
	const shadowRoot = chart.shadowRoot;

	if (!shadowRoot) return;

	const isHomepageMap = chart.closest("#home-dcmap");

	const observer = new MutationObserver((mutations, obs) => {
	  let changesMade = false;

	  const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
	  const sourceElement = shadowRoot.querySelector("div[class*='source']");

	  if (downloadButton && !downloadButton.dataset.modified) {
		downloadButton.innerHTML = isHomepageMap
		  ? `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22Count_of_Persons_Violent%22%7D" target="_blank" style="color: white; text-decoration: none; font-size: 12px; font-weight: regular;">Explore Data</a>`
		  : `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22PercentofStudentsEconomicallyDisadvantaged%22%7D" target="_blank" style="color: white; text-decoration: none; font-size: 12px; font-weight: regular;">Explore Data</a>`;
		downloadButton.dataset.modified = "true";
		changesMade = true;
	  }

	  if (sourceElement && !sourceElement.dataset.modified) {
		sourceElement.innerHTML = isHomepageMap
		  ? `<strong style="font-size: 8px; color: white;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: white; text-decoration: none; font-size: 8px;"><em>Oklahoma Department of Corrections</em></a>`
		  : `<strong style="font-size: 8px; color: white;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: white; text-decoration: none; font-size: 8px;"><em>Oklahoma Office of Educational Quality and Accountability</em></a>`;
		sourceElement.dataset.modified = "true";
		changesMade = true;
	  }

	  // Update all text elements to white for map charts
	  const allTextElements = shadowRoot.querySelectorAll("text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title");
	  allTextElements.forEach((text) => {
		if (!text.dataset.whiteTextModified) {
		  text.style.fill = "white";
		  text.style.color = "white";
		  text.dataset.whiteTextModified = "true";
		  changesMade = true;
		}
	  });

	  if (changesMade) obs.disconnect();
	});

	observer.observe(shadowRoot, {
	  childList: true,
	  subtree: true
	});

	// Inject CSS for white text styling
	const style = document.createElement("style");
	style.textContent = `
	  text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title,
	  g[class*='legend'] text,
	  .legend text,
	  [class*='legend'] text,
	  .axis text,
	  [class*='axis'] text,
	  [class*='title'] {
		fill: white !important;
		color: white !important;
	  }
	`;
	shadowRoot.appendChild(style);
  });


  // --- DATAMMONS LINE CHART MODIFICATIONS ---
  document.querySelectorAll("datacommons-line").forEach((chart) => {
	const shadowRoot = chart.shadowRoot;

	if (!shadowRoot) return;

	console.log("✅ Shadow root detected for line chart. Applying all modifications...");

	// 1️⃣ Modify Download Button
	const modifyDownloadButton = () => {
	  const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
	  if (downloadButton && !downloadButton.dataset.modified) {
		downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dtimeline%26place%3DgeoId%2F40143___geoId%2F40109%26placeType%3DTown%26sv%3D%7B%22dcid%22%3A%22Count_of_Persons_F%22%7D" target="_blank" style="color: white; text-decoration: none; font-size: 12px; font-weight: regular;">Explore Data</a>`;
		downloadButton.dataset.modified = "true";
		console.log("✅ Line chart download button replaced!");
	  }
	};

	// 2️⃣ Modify Source Text
	const modifySourceText = () => {
	  const sourceElement = shadowRoot.querySelector("div[class*='source']");
	  if (sourceElement && !sourceElement.dataset.modified) {
		sourceElement.innerHTML = `<strong style="font-size: 8px; color: white;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: white; text-decoration: none; font-size: 8px;"><em>Oklahoma Department of Corrections</em></a>`;
		sourceElement.dataset.modified = "true";
		console.log("✅ Line chart source text updated!");
	  }
	};

	// Define colors for lines (assuming 'colors' array is defined elsewhere or define it here)
	// const colors = ["#ADD8E6", "#90EE90", "#FFD700", "#FF6347"]; // Example colors

	// 3️⃣ Modify Line Colors and Thickness
	const updateLineStyles = () => {
	  const svgPaths = shadowRoot.querySelectorAll("path[stroke]");

	  svgPaths.forEach((path, index) => {
		if (!path.dataset.modifiedLineStyle) { // Use a specific dataset attribute for line styles
		  path.style.stroke = colors[index % colors.length]; // Assign colors in sequence
		  path.style.strokeWidth = "3px"; // Optional: Increase line thickness
		  path.dataset.modifiedLineStyle = "true"; // Prevent duplicate changes
		  console.log(`🎨 Line ${index} color updated to ${colors[index % colors.length]} and thickness applied!`);
		}
	  });
	};

	// 4️⃣ Update all text elements to white for line charts
	const updateAllTextToWhite = () => {
	  const allTextElements = shadowRoot.querySelectorAll("text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title");
	  allTextElements.forEach((text) => {
		if (!text.dataset.whiteTextModified) {
		  text.style.fill = "white";
		  text.style.color = "white";
		  text.dataset.whiteTextModified = "true";
		  // console.log("📝 Text element updated to white!"); // Uncomment for debugging
		}
	  });
	};

	// 5️⃣ MutationObserver: Detect & Fix Any Re-Renders
	const observer = new MutationObserver(() => {
	  modifyDownloadButton();
	  modifySourceText();
	  updateLineStyles();
	  updateAllTextToWhite();
	});

	observer.observe(shadowRoot, {
	  childList: true,
	  subtree: true
	});

	// Initial application of styles and modifications
	setTimeout(() => {
	  modifyDownloadButton();
	  modifySourceText();
	  updateLineStyles();
	  updateAllTextToWhite();
	}, 500); // Give a small delay for the chart to render

	// You might want a setInterval if elements are frequently re-rendered,
	// but the MutationObserver should be more efficient.
	// setInterval(() => {
	//   modifyDownloadButton();
	//   modifySourceText();
	//   updateLineStyles();
	//   updateAllTextToWhite();
	// }, 1000);

	// 6️⃣ Inject CSS for white text styling to ensure persistence
	const style = document.createElement("style");
	style.textContent = `
	  text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title,
	  g[class*='legend'] text,
	  .legend text,
	  [class*='legend'] text,
	  .axis text,
	  [class*='axis'] text,
	  [class*='title'] {
		fill: white !important;
		color: white !important;
	  }
	  .chart-title { /* Explicitly target the title */
		font-family: "Garamond", sans-serif !important;
		font-size: 20px !important; /* Adjust as needed for desired title size */
		font-weight: bold !important; /* Adjust as needed */
	  }
	  .axis text { /* Tick labels */
		font-size: 12px !important; /* Matches line graph tick labels */
		font-weight: normal !important;
	  }
	  .axis-label { /* Axis titles/labels */
		font-size: 14px !important; /* Slightly larger than tick labels */
		font-weight: bold !important;
	  }
	`;
	shadowRoot.appendChild(style);
  });

  document.querySelectorAll("datacommons-map:not(#home-dcmap datacommons-map)").forEach((chart) => {
	const shadowRoot = chart.shadowRoot;

	if (shadowRoot) {
	  console.log("✅ Shadow root detected for map chart. Applying all modifications...");
	  const observer = new MutationObserver((mutations, obs) => {
		let changesMade = false;

		mutations.forEach((mutation) => {
		  // Modify Download Button
		  const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
		  if (downloadButton && !downloadButton.dataset.modified) {
			downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22PercentofStudentsEconomicallyDisadvantaged%22%7D" target="_blank" style="color: white; text-decoration: none; font-size: 12px; font-weight: regular;">Explore Data</a>`;
			downloadButton.dataset.modified = "true";
			changesMade = true;
		  }

		  // Modify Source Text
		  const sourceElement = shadowRoot.querySelector("div[class*='source']");
		  if (sourceElement && !sourceElement.dataset.modified) {
			sourceElement.innerHTML = `<strong style="font-size: 8px; color: white;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: white; text-decoration: none; font-size: 8px;"><em>Oklahoma Office of Educational Quality and Accountability</em></a>`;
			sourceElement.dataset.modified = "true";
			changesMade = true;
		  }

		  // Modify Tooltip Styles
		  let tooltip = shadowRoot.querySelector(".tooltip");
		  if (tooltip && !tooltip.dataset.modified) {
			tooltip.style.fontFamily = "Arial, sans-serif";
			tooltip.style.fontSize = "12px"; /* Increased font size for better visibility */
			tooltip.style.fontWeight = "bold";
			tooltip.style.color = "white";
			tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
			tooltip.style.padding = "10px";
			tooltip.style.borderRadius = "5px";
			tooltip.dataset.modified = "true";
			changesMade = true;
		  }

		  // Update all text elements to white for map charts
		  const allTextElements = shadowRoot.querySelectorAll("text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title");
		  allTextElements.forEach((text) => {
			if (!text.dataset.whiteTextModified) {
			  text.style.fill = "white";
			  text.style.color = "white";
			  text.dataset.whiteTextModified = "true";
			  changesMade = true;
			}
		  });
		});

		if (changesMade) obs.disconnect();
	  });

	  observer.observe(shadowRoot, {
		childList: true,
		subtree: true
	  });

	  // Inject Custom Tooltip Styles and White Text Styles
	  const style = document.createElement("style");
	  style.textContent = `
		.tooltip {
		  font-family: "Arial, sans-serif" !important;
		  font-size: 12px !important;
		  font-weight: bold !important;
		  color: white !important;
		  background-color: rgba(0, 0, 0, 0.8) !important;
		  padding: 10px !important;
		  border-radius: 5px !important;
		  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) !important;
		}
		text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title,
		g[class*='legend'] text,
		.legend text,
		[class*='legend'] text,
		.axis text,
		[class*='axis'] text,
		[class*='title'] {
		  fill: white !important;
		  color: white !important;
		}
		.chart-title { /* Explicitly target the title */
		  font-family: "Garamond", sans-serif !important;
		  font-size: 20px !important; /* Adjust as needed for desired title size */
		  font-weight: bold !important; /* Adjust as needed */
		}
	  `;
	  shadowRoot.appendChild(style);
	}
  });

  document.querySelectorAll("datacommons-scatter").forEach((chart) => {
	const shadowRoot = chart.shadowRoot;

	if (shadowRoot) {
	  console.log("✅ Shadow root detected for scatter chart. Applying all modifications...");

	  // 2️⃣ Remove the Legend
	  const removeLegend = () => {
		const legend = shadowRoot.querySelector("#density-legend");
		if (legend) {
		  console.log("🔥 Removing density legend!");
		  legend.remove();
		}
	  };

	  const updateDotColors = () => {
		const circles = shadowRoot.querySelectorAll("svg circle");
		const colors = ["#f58220"]; // Bright color for visibility on blue background

		circles.forEach((circle, index) => {
		  circle.style.fill = colors[index % colors.length];
		  circle.dataset.modified = "true";
		});
	  };

	  // 3️⃣ Modify Axis Label Font Sizes and make them white
	  // This function will be mostly replaced by the CSS injection for better control
	  const updateAxisLabels = () => {
		const axisLabels = shadowRoot.querySelectorAll("svg text.axis-label, svg text.axis text"); // Target both
		axisLabels.forEach((label) => {
		  if (!label.dataset.modified) {
			// The CSS will handle this more robustly, but this can serve as a fallback
			const isMobile = window.innerWidth <= 576;
			label.style.fontSize = isMobile ? "5px" : "5px";
			label.style.fontWeight = "normal"; // Match line graph tick labels
			label.style.fill = "white";
			label.style.color = "white";
			label.dataset.modified = "true";
		  }
		});
	  };


	  // 1️⃣ Resize Chart Width
	  const resizeChart = () => {
		const svg = shadowRoot.querySelector("svg");
		if (svg) {
		  // Let SVG fill the container
		  svg.removeAttribute("width");
		  svg.removeAttribute("height");
		  svg.style.width = "100%";
		  svg.style.height = "100%";

		  // Optional: Recalculate viewBox to adapt to new space
		  const bbox = svg.getBBox();
		  // Adjust viewBox for padding, especially if labels are being cut off
		  // This might require fine-tuning based on actual chart rendering
		  svg.setAttribute("viewBox", `0 0 ${bbox.width + 50} ${bbox.height + 5}`); // Added more padding
		  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
		}

		// Expand the container if needed
		const chartContainer = shadowRoot.querySelector(".chart-container");
		if (chartContainer) {
		  chartContainer.style.width = "100%";
		}

		// 🆕 Add padding to svg container to ensure x-axis labels aren't cut off
		const svgContainer = shadowRoot.querySelector(".svg-container");
		if (svgContainer) {
		  svgContainer.style.paddingBottom = "2.5rem"; // adjust as needed
		}
	  };


	  // 4️⃣ Modify Legend Text Font Size - Updated to make legend text white
	  const updateLegendText = () => {
		const legendTexts = shadowRoot.querySelectorAll("#density-legend text, g[class*='legend'] text, .legend text, [class*='legend'] text");
		legendTexts.forEach((text) => {
		  if (!text.dataset.modified) {
			text.style.fontSize = "12px"; // Increased for better visibility
			text.style.fontWeight = "normal";
			text.style.fill = "white"; // Changed to white
			text.style.color = "white"; // Added color property for extra coverage
			text.dataset.modified = "true";
			console.log("🎨 Legend text updated to white!");
		  }
		});
	  };

	  // 5️⃣ Modify Tooltip & Other Text Styles
	  const updateCustomText = () => {
		let tooltip = shadowRoot.querySelector(".tooltip");
		if (tooltip && !tooltip.dataset.modified) {
		  tooltip.style.fontFamily = "Arial, sans-serif";
		  tooltip.style.fontSize = "12px";
		  tooltip.style.fontWeight = "bold";
		  tooltip.style.color = "white";
		  tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		  tooltip.style.padding = "10px";
		  tooltip.style.borderRadius = "5px";
		  tooltip.dataset.modified = "true";
		}

		// Update all text elements to white
		// This is a more general catch-all for text elements
		const allTextElements = shadowRoot.querySelectorAll("text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title");
		allTextElements.forEach((text) => {
		  if (!text.dataset.whiteTextModified) {
			text.style.fill = "white";
			text.style.color = "white";
			text.dataset.whiteTextModified = "true";
		  }
		});

		// 🔧 Force-fix specific title that may not have a class
	  	const svgTextTitles = shadowRoot.querySelectorAll("svg text");
	  	svgTextTitles.forEach((t) => {
			if (
		  	t.textContent?.trim() === "Property vs Violent Crime Rate per 100K" &&
		  	!t.dataset.forceWhite
			) {
		  	t.style.fill = "white";
		  	t.style.color = "white";
		  	t.style.fontWeight = "bold";
		  	t.dataset.forceWhite = "true";
		  	console.log("✅ Forced scatter plot title to white.");
			}
	  	});

		// Explicitly target the chart title for scatter plots
		// DataCommons often puts the 'header' attribute content into a div with a specific class
		const chartHeaderDiv = shadowRoot.querySelector(".chart-title-container .chart-title"); // Common pattern
		if (chartHeaderDiv && !chartHeaderDiv.dataset.whiteTextModified) {
			chartHeaderDiv.style.color = "white";
			chartHeaderDiv.dataset.whiteTextModified = "true";
			console.log("🎨 Scatter chart header div explicitly set to white!");
		}
		// Also check for a direct div with just 'title' or 'header' class
		const genericTitleDiv = shadowRoot.querySelector("div.title, div.header");
		if (genericTitleDiv && !genericTitleDiv.dataset.whiteTextModified) {
			genericTitleDiv.style.color = "white";
			genericTitleDiv.dataset.whiteTextModified = "true";
			console.log("🎨 Scatter chart generic title div explicitly set to white!");
		}
		// And the SVG text element if it exists
		const svgChartTitle = shadowRoot.querySelector("svg .chart-title, svg .title");
		if (svgChartTitle && !svgChartTitle.dataset.whiteTextModified) {
			svgChartTitle.style.fill = "white";
			svgChartTitle.style.color = "white"; // For good measure
			svgChartTitle.dataset.whiteTextModified = "true";
			console.log("🎨 Scatter chart SVG title explicitly set to white!");
		}
	  };

	  // 6️⃣ Replace Download Button with DataWorks Commons
	  const modifyDownloadButton = () => {
		const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
		if (downloadButton && !downloadButton.dataset.modified) {
		  downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dscatter%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22Property_Crime_Rate_per_100k%22%7D___%7B%22dcid%22%3A%22Violent_Crime_Rate_per_100k%22%7D" target="_blank" style="color: white; text-decoration: none; font-size: 12px; font-weight: regular;">Explore Data</a>`;
		  downloadButton.dataset.modified = "true";
		  console.log("✅ Download button replaced with The DataWorks Commons!");
		}
	  };

	  // 7️⃣ Modify Source Text
	  const modifySourceText = () => {
		const sourceElement = shadowRoot.querySelector("div[class*='source']");
		if (sourceElement && !sourceElement.dataset.modified) {
		  sourceElement.innerHTML = `<strong style="font-size: 8px; color: white;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: white; text-decoration: none; font-size: 8px;"><em>FBI, Bureau of Justice Statistics</em></a>`;
		  sourceElement.dataset.modified = "true";
		  console.log("✅ Source text updated!");
		}
	  };

	  // 3️⃣ Remove Legend Container & Free Space
	  const removeLegendContainer = () => {
		const legendContainer = shadowRoot.querySelector(".legend-container"); // Adjust selector if needed
		if (legendContainer) {
		  legendContainer.style.display = "none"; // Hide it
		  legendContainer.style.height = "0px"; // Remove spacing
		  legendContainer.style.margin = "0";
		  legendContainer.style.padding = "0";
		  legendContainer.style.maxHeight = "0";
		  legendContainer.style.overflow = "hidden";
		  console.log("🛠️ Legend container hidden and space freed!");
		}
	  };

	  const expandChartAfterLegendRemoval = () => {
		const svg = shadowRoot.querySelector("svg");
		if (svg) {
		  console.log("📏 Resizing SVG after legend removal");
		  svg.removeAttribute("width"); // clear any hardcoded width
		  svg.style.width = "100%"; // let it fill the container
		  svg.setAttribute("preserveAspectRatio", "xMidYMid meet"); // keep ratio
		}
	  };



	  // 8️⃣ Keep Changes Applied Even If The Chart Updates
	  setTimeout(() => {
		resizeChart();
		removeLegend();
		removeLegendContainer();
		expandChartAfterLegendRemoval();
		updateAxisLabels(); // Keep this for immediate application, CSS will persist
		updateLegendText();
		updateCustomText(); // This is the function that updates all text to white.
		modifyDownloadButton();
		modifySourceText();
		updateDotColors();
	  }, 500);

	  setInterval(() => {
		resizeChart();
		removeLegend();
		removeLegendContainer();
		expandChartAfterLegendRemoval();
		updateAxisLabels(); // Keep this for immediate application, CSS will persist
		updateLegendText();
		updateCustomText(); // This is the function that updates all text to white.
		modifyDownloadButton();
		modifySourceText();
		updateDotColors();
	  }, 1000);

	  // 9️⃣ MutationObserver: Detect & Fix Any Re-Renders
	  const observer = new MutationObserver(() => {
		resizeChart();
		removeLegend();
		removeLegendContainer();
		expandChartAfterLegendRemoval();
		updateAxisLabels(); // Keep this for immediate application, CSS will persist
		updateLegendText();
		updateCustomText(); // This is the function that updates all text to white.
		modifyDownloadButton();
		modifySourceText();
		updateDotColors();
	  });
	  observer.observe(shadowRoot, {
		childList: true,
		subtree: true
	  });

	  // 🔟 Inject CSS to Ensure Custom Styles Persist - Updated with white text
	  const style = document.createElement("style");
	  style.textContent = `
		svg {
		  width: 100% !important;
		  max-width: 100% !important;
		}
		/* General text styling, including fallback for axis labels and ticks */
		svg text, text {
		  font-family: "Garamond", sans-serif !important;
		  fill: white !important;
		  color: white !important; /* Ensure text color is white */
		}

		/* Specific styling for chart title */
		.chart-title, .title {
		  font-family: "Garamond", sans-serif !important;
		  font-size: 20px !important; /* Matches suggested title size for line/map */
		  font-weight: bold !important; /* Matches suggested title style */
		  fill: white !important; /* For SVG text elements */
		  color: white !important; /* For HTML text elements (div, span) */
		}

		/* Styling for axis labels (e.g., "Violent Crime Rate") */
		.axis-label {
		  font-size: 10px !important; /* Slightly larger than tick labels */
		  font-weight: bold !important;
		  fill: white !important;
		  color: white !important;
		}

		/* Styling for axis tick labels (the numbers/values on the axes) */
		.axis text {
		  font-size: 8px !important; /* Matches line graph tick labels */
		  font-weight: normal !important;
		  fill: white !important;
		  color: white !important;
		}

		.tooltip {
		  font-family: "Garamond", sans-serif !important;
		  font-size: 12px !important;
		  font-weight: bold !important;
		  color: white !important;
		  background-color: rgba(0, 0, 0, 0.8) !important;
		  padding: 8px !important;
		  border-radius: 4px !important;
		  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) !important;
		}
		/* Legend text styling (though legend is removed, good to have consistent style) */
		#density-legend text,
		g[class*='legend'] text,
		.legend text,
		[class*='legend'] text {
		  fill: white !important;
		  color: white !important;
		  font-size: 12px !important;
		  font-weight: normal !important;
		}
		@media (max-width: 576px) {
		  .axis text {
			font-size: 10px !important; /* Mobile size for tick labels */
		  }
		  .axis-label {
			font-size: 8px !important; /* Mobile size for axis labels */
		  }
		  .chart-title, .title {
			font-size: 16px !important; /* Mobile size for title */
			fill: white !important; /* Ensure white on mobile too */
			color: white !important;
		  }
		}
	  `;

	  shadowRoot.appendChild(style);
	}
  });

  const chart = document.querySelector("#home-dcmap datacommons-map");
  const shadowRoot = chart?.shadowRoot;

  if (shadowRoot) {
	console.log("✅ Shadow root detected for homepage map chart. (Re-)applying all modifications...");
	const observer = new MutationObserver((mutations, obs) => {
	  let changesMade = false;

	  mutations.forEach((mutation) => {
		// Modify Download Button
		const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
		if (downloadButton && !downloadButton.dataset.modified) {
		  downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22Count_of_Persons_Violent%22%7D" target="_blank" style="color: white; text-decoration: none; font-size: 12px; font-weight: regular;">Explore Data</a>`;
		  downloadButton.dataset.modified = "true";
		  changesMade = true;
		}

		// Modify Source Text
		const sourceElement = shadowRoot.querySelector("div[class*='source']");
		if (sourceElement && !sourceElement.dataset.modified) {
		  sourceElement.innerHTML = `<strong style="font-size: 8px; color: white;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: white; text-decoration: none; font-size: 8px;"><em>Oklahoma Department of Corrections</em></a>`;
		  sourceElement.dataset.modified = "true";
		  changesMade = true;
		}

		// Modify Tooltip Styles
		let tooltip = shadowRoot.querySelector(".tooltip");
		if (tooltip && !tooltip.dataset.modified) {
		  tooltip.style.fontFamily = "Arial, sans-serif";
		  tooltip.style.fontSize = "12px"; /* Increased font size */
		  tooltip.style.fontWeight = "bold";
		  tooltip.style.color = "white";
		  tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		  tooltip.style.padding = "10px";
		  tooltip.style.borderRadius = "5px";
		  tooltip.dataset.modified = "true";
		  changesMade = true;
		}

		// Update all text elements to white for homepage map
		const allTextElements = shadowRoot.querySelectorAll("text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title");
		allTextElements.forEach((text) => {
		  if (!text.dataset.whiteTextModified) {
			text.style.fill = "white";
			text.style.color = "white";
			text.dataset.whiteTextModified = "true";
			changesMade = true;
		  }
		});
	  });

	  if (changesMade) obs.disconnect();
	});

	observer.observe(shadowRoot, {
	  childList: true,
	  subtree: true
	});

	// Inject Custom Tooltip Styles and White Text Styles
	const style = document.createElement("style");
	style.textContent = `
	  .tooltip {
		font-family: "Arial, sans-serif" !important;
		font-size: 12px !important;
		font-weight: bold !important;
		color: white !important;
		background-color: rgba(0, 0, 0, 0.8) !important;
		padding: 10px !important;
		border-radius: 5px !important;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) !important;
	  }
	  text, h1, h2, h3, h4, h5, h6, .title, .axis-label, .chart-title,
	  g[class*='legend'] text,
	  .legend text,
	  [class*='legend'] text,
	  .axis text,
	  [class*='axis'] text,
	  [class*='title'] {
		fill: white !important;
		color: white !important;
	  }
	  .chart-title { /* Explicitly target the title */
		font-family: "Garamond", sans-serif !important;
		font-size: 20px !important; /* Adjust as needed for desired title size */
		font-weight: bold !important; /* Adjust as needed */
	  }
	`;
	shadowRoot.appendChild(style);
  }

}