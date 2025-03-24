export function setupDCComponents() {
	
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

	document.querySelectorAll("datacommons-map").forEach((chart) => {
		const shadowRoot = chart.shadowRoot;

		if (shadowRoot) {
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
			console.log("✅ Shadow root detected. Applying all modifications...");



			// 2️⃣ Remove the Legend
			const removeLegend = () => {
				const legend = shadowRoot.querySelector("#density-legend");
				if (legend) {
					console.log("🔥 Removing density legend!");
					legend.remove();
				}
			};

			// 3️⃣ Modify Axis Label Font Sizes
			const updateAxisLabels = () => {
				const axisLabels = shadowRoot.querySelectorAll("svg text");
				axisLabels.forEach((label) => {
					if (!label.dataset.modified) {
						label.style.fontSize = "14px"; // Adjust as needed
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
					svg.setAttribute("width", "800px"); 
					svg.style.width = "800px";
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
					downloadButton.innerHTML = `<a href="https://thedataworks.org" target="_blank" style="color: black; text-decoration: none; font-size: 12px; font-weight: regular;">The DataWorks Commons</a>`;
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
					console.log("🛠️ Legend container hidden and space freed!");
				}
			};

			// 8️⃣ Keep Changes Applied Even If The Chart Updates
			setTimeout(() => {
				resizeChart();
				removeLegend();
				updateAxisLabels();
				updateLegendText();
				updateCustomText();
				modifyDownloadButton();
				modifySourceText();
			}, 500);
		
			setInterval(() => {
				resizeChart();
				removeLegend();
				updateAxisLabels();
				updateLegendText();
				updateCustomText();
				modifyDownloadButton();
				modifySourceText();
			}, 1000);

			// 9️⃣ MutationObserver: Detect & Fix Any Re-Renders
			const observer = new MutationObserver(() => {
				resizeChart();
				removeLegend();
				updateAxisLabels();
				updateLegendText();
				updateCustomText();
				modifyDownloadButton();
				modifySourceText();
			});
			observer.observe(shadowRoot, { childList: true, subtree: true });

			// 🔟 Inject CSS to Ensure Custom Styles Persist
			const style = document.createElement("style");
			style.textContent = `
				svg {
					width: 400px !important;
					max-width: 100% !important;
				}
				svg text {
					font-family: "Garamond, sans-serif" !important;
					font-size: 10.5px !important;
					font-weight: normal !important;
					fill: black !important;
				}
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
			`;
			shadowRoot.appendChild(style);
		}
	});
}
