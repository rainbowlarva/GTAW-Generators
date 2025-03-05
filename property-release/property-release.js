// Unique prefix for property release page fields
const prefix = "propertyRelease-";

document.addEventListener("DOMContentLoaded", function() {
  // We'll store data for the top fields (1..10) in localStorage
  const totalFixedFields = 10;
  for (let i = 1; i <= totalFixedFields; i++) {
    const field = document.getElementById("field" + i);
    if (field) {
      const saved = localStorage.getItem(prefix + "field" + i);
      if (saved !== null) {
        field.value = saved;
      }
      field.addEventListener("input", function() {
        localStorage.setItem(prefix + "field" + i, field.value);
      });
    }
  }

  // Dynamic property items
  const propertyList = document.getElementById("propertyList");
  const addPropertyBtn = document.getElementById("addProperty");
  const removePropertyBtn = document.getElementById("removeProperty");

  // Load existing property items from localStorage
  let propertyArray = JSON.parse(localStorage.getItem(prefix + "propertyArray")) || [];

  // Create one row with 3 inputs: EL NO., Description, Quantity
  function createPropertyRow(elNo = "", desc = "", qty = "") {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("property-entry");

    // EL NO
    const elInput = document.createElement("input");
    elInput.type = "text";
    elInput.placeholder = "EL NO.";
    elInput.value = elNo;
    elInput.addEventListener("input", saveData);
    rowDiv.appendChild(elInput);

    // Description
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Description of Article";
    descInput.value = desc;
    descInput.addEventListener("input", saveData);
    rowDiv.appendChild(descInput);

    // Quantity
    const qtyInput = document.createElement("input");
    qtyInput.type = "text";
    qtyInput.placeholder = "Quantity";
    qtyInput.value = qty;
    qtyInput.addEventListener("input", saveData);
    rowDiv.appendChild(qtyInput);

    return rowDiv;
  }

  // Render property items from propertyArray
  function renderProperty() {
    propertyList.innerHTML = "";
    propertyArray.forEach(item => {
      const row = createPropertyRow(item.elNo, item.desc, item.qty);
      propertyList.appendChild(row);
    });
  }

  // Add a new blank property row
  function addProperty() {
    propertyArray.push({ elNo: "", desc: "", qty: "" });
    renderProperty();
    saveData();
  }

  // Remove the last property row
  function removeProperty() {
    if (propertyArray.length > 0) {
      propertyArray.pop();
      renderProperty();
      saveData();
    }
  }

  // Save data for both top fields and dynamic property
  function saveData() {
    // Save top fields
    for (let i = 1; i <= totalFixedFields; i++) {
      const field = document.getElementById("field" + i);
      if (field) {
        localStorage.setItem(prefix + "field" + i, field.value);
      }
    }
    // Save property items
    const rows = document.querySelectorAll(".property-entry");
    propertyArray = [];
    rows.forEach(row => {
      const inputs = row.querySelectorAll("input");
      propertyArray.push({
        elNo: inputs[0].value,
        desc: inputs[1].value,
        qty:  inputs[2].value
      });
    });
    localStorage.setItem(prefix + "propertyArray", JSON.stringify(propertyArray));
  }

  // Attach button listeners
  addPropertyBtn.addEventListener("click", addProperty);
  removePropertyBtn.addEventListener("click", removeProperty);

  // Initial render
  renderProperty();
});

// Generate the BBCode
function generateBBCode() {
  // We'll break the property-release.txt template into two parts:
  // 1) Everything up to "ITEMS TO TRANSFER"
  // 2) The repeated block for each property item
  // We'll ignore the old placeholders for items in property-release.txt
  // and generate as many as needed.

  let templateTop = `[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
[size=120][color=black][b]PROPERTY TRANSFER RECEIPT
[/b][/font][/color][/size]
[/center]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,100,5]
[size=87][b]RELEASE AUTHORIZATION BY[/b][/size]
NAMEHERE
[/tdwidth]
[/tr][/table2]
[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,25,5]
[size=87][b]SERIAL NO[/b][/size]
NAMEHERE
[/tdwidth]

[tdwidth=1,black,transparent,top,left,35,5]
[size=87][b]DIVISION / ASSIGNMENT[/b][/size]
NAMEHERE
[/tdwidth]
[/tr]
[/table2]
[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[b][size=87]PERSON RECEIVING PROPERTY[/size][/b]
NAMEHERE
[/tdwidth]
[/tr]
[/table2]
[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87][b]AGENCY (IF APPLICABLE)[/size][/b]
NAMEHERE
[/tdwidth]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87][b]SERIAL NO.[/size][/b]
NAMEHERE
[/tdwidth][/tr]
[/table2]
[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,20,5]
[b][size=87]DATE RELEASED[/size][/b]
NAMEHERE
[/tdwidth]

[tdwidth=1,black,transparent,top,left,20,5]
[b][size=87]REASON FOR TRANSFER[/size][/b]
[size=60](EVIDENCE EXCHANGE / DESTRUCTION / HISTORIC INDEXING ETC.)[/size]
NAMEHERE
[/tdwidth][/tr]
[/table2]
[table2=1,black,transparent,Arial]
[tr][tdwidth=1,black,transparent,top,left,100,5]
[center][b][size=90]IF COURT REQUIRES PROPERTY FROM EVIDENCE, PROVIDE THE FOLLOWING[/size][/b][/center]
[/tdwidth][/tr][/table2]
[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,37,5]
[b][size=87]CASE OF PEOPLE VS.[/size][/b]
NAMEHERE
[/tdwidth]
[tdwidth=1,black,transparent,top,left,30,5]
[b][size=87]RECEIVED BY (COURT CLERK)[/size][/b]
NAMEHERE
[/tdwidth]
[/tr]
[/table2]
[table2=1,black,transparent,Arial]
[tr][tdwidth=1,black,transparent,top,left,100,5]
[center][b][size=90]ITEMS TO TRANSFER[/size][/b][/center]
[/tdwidth][/tr][/table2]`;

  // 1) Insert the top 8 placeholders
  for (let i = 1; i <= 8; i++) {
    const val = document.getElementById("field" + i)?.value || "";
    templateTop = templateTop.replace("NAMEHERE", val);
  }
  // 2) Insert placeholders 9..10 for court info
  for (let i = 9; i <= 10; i++) {
    const val = document.getElementById("field" + i)?.value || "";
    templateTop = templateTop.replace("NAMEHERE", val);
  }

  // Now we handle the dynamic property items
  let propertyArray = JSON.parse(localStorage.getItem(prefix + "propertyArray")) || [];

  // Build the final output
  let output = templateTop;

  // For each property item, append a [table2=1,black,transparent,Arial] block
  propertyArray.forEach(item => {
    output += `
[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,37,5]
[b][size=87]EL NO.[/size][/b]
${item.elNo}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,30,5]
[b][size=87]Description of Article[/size][/b]
${item.desc}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,25,5]
[b][size=87]Quantity[/size][/b]
${item.qty}
[/tdwidth]
[/tr]
[/table2]`;
  });

  // Output final
  const outputElement = document.getElementById("bbcodeOutput");
  outputElement.textContent = output;

  // Auto-select the text
  if (window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(outputElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
