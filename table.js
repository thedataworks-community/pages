let caseData = [];

export async function setupTable() {
  const res = await fetch('./data/structured_case_data_with_labels.json');
  caseData = await res.json();
  renderTable(caseData);
  populateFilters(caseData);
  
  document.getElementById("tSearch").addEventListener("keyup", (event) => {
	filterTable();  
  });
  
  ["tCase", "tCounty", "tDisp","tWarrant"].forEach(id => {
  	document.getElementById(id).addEventListener("change", (event) => {
	  filterTable();
	});
  });
}

export function toggleTableDetails(id) {
  const row = document.getElementById(id);
  const toggleIcon = row.previousElementSibling.querySelector(".arrow");
  if (row.style.display === "table-row") {
	row.style.display = "none";
	toggleIcon.textContent = "▶";
  } else {
	row.style.display = "table-row";
	toggleIcon.textContent = "▼";
  }
}

export function filterTable() {
  const searchValue = document.getElementById("tSearch").value.toLowerCase();
  const Type_of_CaseFilter = document.getElementById("tCase").value;
  const countyFilter = document.getElementById("tCounty").value;
  const dispositionFilter = document.getElementById("tDisp").value;
  const warrantFilter = document.getElementById("tWarrant").value;

  const filtered = caseData.filter(row => {
	const values = Object.values(row).flatMap(val =>
	  Array.isArray(val)
		? val.map(obj => Object.entries(obj).map(([k, v]) => `${k} ${v}`).join(" ")).join(" ")
		: val
	).join(" ").toLowerCase();

	return (
	  (!searchValue || values.includes(searchValue)) &&
	  (!Type_of_CaseFilter || row.Type_of_Case === Type_of_CaseFilter) &&
	  (!countyFilter || row.County === countyFilter) &&
	  (!dispositionFilter || row.Case_Disposition === dispositionFilter) &&
	  (!warrantFilter || row.Warrant_Type === warrantFilter)
	);
  });

  renderTable(filtered);
}

function renderTable(data) {
  const headerRow = document.getElementById("table-header");
  const body = document.getElementById("table-body");
  body.innerHTML = "";

  const keys = ["Type_of_Case", "County", "Date_Filed", "Date_Closed", "Case_Disposition",  "Total_Fines_and_Fees", "Offense_Counts", "Bond_Type", "Bondsman_Payor", "Bond_Amount", "Warrant_Type", "Date_Warrant_Issued"];

  // Render headers
  headerRow.innerHTML = '<th></th>' + keys.map(key => `<th>${key.replace(/_/g, ' ')}</th>`).join('');

  data.forEach((row, index) => {
	const caseId = `case-${index}`;

	// Expandable main row
	const mainRow = document.createElement("tr");
	mainRow.className = "expandable-row";

	// mainRow.innerHTML = `<td class="arrow" onclick="toggleTableDetails('${caseId}')">▶</td>` + keys.map(key => `<td>${formatValue(row[key])}</td>`).join('');

	mainRow.innerHTML = `<td class="arrow">▶</td>` + keys.map(key => `<td>${formatValue(row[key])}</td>`).join('');
	mainRow.querySelector('.arrow').addEventListener('click', () => toggleTableDetails(caseId));

	// Details row
	const detailsRow = document.createElement("tr");
	detailsRow.id = caseId;
	detailsRow.className = "details-row";
	detailsRow.innerHTML = `<td colspan="${keys.length + 1}"><pre>${JSON.stringify(row, null, 2)}</pre></td>`;

	body.appendChild(mainRow);
	body.appendChild(detailsRow);
  });
}

function formatValue(val) {
  if (!val) return "";
  if (Array.isArray(val)) {
	return val.map(obj => Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join("<br>"))
			  .join("<hr style='border:none;border-top:1px solid #ccc'>");
  }
  return val;
}

function populateFilters(data) {
  const counties = new Set();
  const casetypes = new Set();
  const dispositions = new Set();
  const warrants = new Set();

  data.forEach(row => {
	if (row.Type_of_Case) casetypes.add(row.Type_of_Case);
	if (row.County) counties.add(row.County);
	if (row.Case_Disposition) dispositions.add(row.Case_Disposition);
	if (row.Warrant_Type) warrants.add(row.Warrant_Type);
  });

  fillSelect("tCase", casetypes);
  fillSelect("tCounty", counties);
  fillSelect("tDisp", dispositions);
  fillSelect("tWarrant", warrants);
}

function fillSelect(id, values) {
  const select = document.getElementById(id);
  Array.from(values).sort().forEach(val => {
	const opt = document.createElement("option");
	opt.value = val;
	opt.textContent = val;
	select.appendChild(opt);
  });
}
