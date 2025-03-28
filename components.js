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
		? `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22Count_of_Persons_Violent%22%7D" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">Explore The DataWorks Commons</a>`
		: `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22PercentofStudentsEconomicallyDisadvantaged%22%7D" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">Explore The DataWorks Commons</a>`;
	  downloadButton.dataset.modified = "true";
	  changesMade = true;
	}

	if (sourceElement && !sourceElement.dataset.modified) {
	  sourceElement.innerHTML = isHomepageMap
		? `<strong style="font-size: 8px; color: black;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 8px;"><em>Oklahoma Department of Corrections</em></a>`
		: `<strong style="font-size: 8px; color: black;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 8px;"><em>Oklahoma Office of Educational Quality and Accountability</em></a>`;
	  sourceElement.dataset.modified = "true";
	  changesMade = true;
	}

	if (changesMade) obs.disconnect();
  });

  observer.observe(shadowRoot, { childList: true, subtree: true });
});

	
	document.querySelectorAll("datacommons-line").forEach((chart) => {

		const shadowRoot = chart.shadowRoot;

		if (shadowRoot) {
			console.log("✅ Shadow root detected for line chart. Applying all modifications...");
			// Observe changes to the shadow DOM
			const observer = new MutationObserver((mutations, obs) => {
				let changesMade = false;

				mutations.forEach((mutation) => {
					// Modify Download Button
					const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
					if (downloadButton && !downloadButton.dataset.modified) {
						downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dtimeline%26place%3DgeoId%2F40143___geoId%2F40109%26placeType%3DTown%26sv%3D%7B%22dcid%22%3A%22Count_of_Persons_F%22%7D" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">Explore The DataWorks Commons</a>`;
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
						downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22PercentofStudentsEconomicallyDisadvantaged%22%7D" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">Explore The DataWorks Commons</a>`;
						downloadButton.dataset.modified = "true";
						changesMade = true;
					}

					// Modify Source Text
					const sourceElement = shadowRoot.querySelector("div[class*='source']");
					if (sourceElement && !sourceElement.dataset.modified) {
						sourceElement.innerHTML = `<strong style="font-size: 8px; color: black;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 8px;"><em>Oklahoma Office of Educational Quality and Accountability</em></a>`;
						sourceElement.dataset.modified = "true";
						changesMade = true;
					}

					// Modify Tooltip Styles
					let tooltip = shadowRoot.querySelector(".tooltip");
					if (tooltip && !tooltip.dataset.modified) {
						tooltip.style.fontFamily = "Arial, sans-serif";
						tooltip.style.fontSize = "2px"; /* Updated font size */
						tooltip.style.fontWeight = "bold";
						tooltip.style.color = "white";
						tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
						tooltip.style.padding = "10px";
						tooltip.style.borderRadius = "5px";
						tooltip.dataset.modified = "true";
						changesMade = true;
					}
				});

				if (changesMade) obs.disconnect();
			});

			observer.observe(shadowRoot, { childList: true, subtree: true });

			// Inject Custom Tooltip Styles
			const style = document.createElement("style");
			style.textContent = `
				.tooltip {
					font-family: "Arial, sans-serif" !important;
					font-size: 2px !important; /* Updated font size */
					font-weight: bold !important;
					color: white !important;
					background-color: rgba(0, 0, 0, 0.8) !important;
					padding: 10px !important;
					border-radius: 5px !important;
					box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) !important;
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
				const colors = ["#3d5a78"]; // use your own palette
			
				circles.forEach((circle, index) => {
					circle.style.fill = colors[index % colors.length];
					circle.dataset.modified = "true";
				});
			};

			// 3️⃣ Modify Axis Label Font Sizes
			const updateAxisLabels = () => {
			  const axisLabels = shadowRoot.querySelectorAll("svg text");
			  axisLabels.forEach((label) => {
				if (!label.dataset.modified) {
				  // Mobile-friendly size logic
				  const isMobile = window.innerWidth <= 576;
				  label.style.fontSize = isMobile ? "6px" : "6px";
				  label.style.fontWeight = "bold";
				  label.style.fill = "black";
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
				svg.style.height = "auto";
			
				// Optional: Recalculate viewBox to adapt to new space
				const bbox = svg.getBBox();
				svg.setAttribute("viewBox", `+20 0 ${bbox.width + 10} ${bbox.height + 20}`); // 🔧 add 40px bottom padding
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


			// 4️⃣ Modify Legend Text Font Size
			const updateLegendText = () => {
				const legendTexts = shadowRoot.querySelectorAll("#density-legend text");
				legendTexts.forEach((text) => {
					if (!text.dataset.modified) {
						text.style.fontSize = "9px"; // Adjust this as needed
						text.style.fontWeight = "normal";
						text.style.fill = "black";
						text.dataset.modified = "true";
						console.log("🎨 Legend text updated!");
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
			};

			// 6️⃣ Replace Download Button with DataWorks Commons
			const modifyDownloadButton = () => {
				const downloadButton = shadowRoot.querySelector(".outlink-item.download-outlink");
				if (downloadButton && !downloadButton.dataset.modified) {
					downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dscatter%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22Property_Crime_Rate_per_100k%22%7D___%7B%22dcid%22%3A%22Violent_Crime_Rate_per_100k%22%7D" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">Explore The DataWorks Commons</a>`;
					downloadButton.dataset.modified = "true";
					console.log("✅ Download button replaced with The DataWorks Commons!");
				}
			};

			// 7️⃣ Modify Source Text
			const modifySourceText = () => {
				const sourceElement = shadowRoot.querySelector("div[class*='source']");
				if (sourceElement && !sourceElement.dataset.modified) {
					sourceElement.innerHTML = `<strong style="font-size: 8px; color: black;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 8px;"><em>FBI, Bureau of Justice Statistics</em></a>`;
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
					svg.removeAttribute("width");  // clear any hardcoded width
					svg.style.width = "100%";      // let it fill the container
					svg.setAttribute("preserveAspectRatio", "xMidYMid meet"); // keep ratio
				}
			};



			// 8️⃣ Keep Changes Applied Even If The Chart Updates
			setTimeout(() => {
				resizeChart();
				removeLegend();
				removeLegendContainer();
				expandChartAfterLegendRemoval();
				updateAxisLabels();
				updateLegendText();
				updateCustomText();
				modifyDownloadButton();
				modifySourceText();
				updateDotColors();
			}, 500);
		
			setInterval(() => {
				resizeChart();
				removeLegend();
				removeLegendContainer();
				expandChartAfterLegendRemoval();
				updateAxisLabels();
				updateLegendText();
				updateCustomText();
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
				updateAxisLabels();
				updateLegendText();
				updateCustomText();
				modifyDownloadButton();
				modifySourceText();
				updateDotColors();
			});
			observer.observe(shadowRoot, { childList: true, subtree: true });

			// 🔟 Inject CSS to Ensure Custom Styles Persist
			const style = document.createElement("style");
			style.textContent = `
			  svg {
				width: 100% !important;
				max-width: 100% !important;
			  }
			  svg text {
				font-family: "Garamond, sans-serif" !important;
				font-size: 10px !important;
				font-weight: normal !important;
				fill: black !important;
			  }
			  .tooltip {
				font-family: "Garamond, sans-serif" !important;
				font-size: 8px !important;
				font-weight: bold !important;
				color: white !important;
				background-color: rgba(0, 0, 0, 0.8) !important;
				padding: 3px !important;
				border-radius: 2px !important;
				box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) !important;
			  }
			  @media (max-width: 576px) {
				svg text {
				  font-size: 6px !important;
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
					downloadButton.innerHTML = `<a href="https://data-dev-datacommons-web-service-a6wrkh5rha-uc.a.run.app/tools/visualization#visType%3Dmap%26place%3DgeoId%2F40%26placeType%3DCounty%26sv%3D%7B%22dcid%22%3A%22Count_of_Persons_Violent%22%7D" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">Explore The DataWorks Commons</a>`;
					downloadButton.dataset.modified = "true";
					changesMade = true;
				}
	
				// Modify Source Text
				const sourceElement = shadowRoot.querySelector("div[class*='source']");
				if (sourceElement && !sourceElement.dataset.modified) {
					sourceElement.innerHTML = `<strong style="font-size: 8px; color: black;">Source:</strong> <a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 8px;"><em>Oklahoma Department of Corrections</em></a>`;
					sourceElement.dataset.modified = "true";
					changesMade = true;
				}
	
				// Modify Tooltip Styles
				let tooltip = shadowRoot.querySelector(".tooltip");
				if (tooltip && !tooltip.dataset.modified) {
					tooltip.style.fontFamily = "Arial, sans-serif";
					tooltip.style.fontSize = "2px"; /* Updated font size */
					tooltip.style.fontWeight = "bold";
					tooltip.style.color = "white";
					tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
					tooltip.style.padding = "10px";
					tooltip.style.borderRadius = "5px";
					tooltip.dataset.modified = "true";
					changesMade = true;
				}
			});
	
			if (changesMade) obs.disconnect();
		});
	
		observer.observe(shadowRoot, { childList: true, subtree: true });
	
		// Inject Custom Tooltip Styles
		const style = document.createElement("style");
		style.textContent = `
			.tooltip {
				font-family: "Arial, sans-serif" !important;
				font-size: 2px !important; /* Updated font size */
				font-weight: bold !important;
				color: white !important;
				background-color: rgba(0, 0, 0, 0.8) !important;
				padding: 10px !important;
				border-radius: 5px !important;
				box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) !important;
			}
		`;
		shadowRoot.appendChild(style);
	}
	
}