// Unique prefix for property release page fields
const prefix = "propertyRelease-";

document.addEventListener("DOMContentLoaded", function() {
  const totalFixedFields = 10;

  // Load saved values for the top fields
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
  const clearButton = document.getElementById("clearButton");

  // Load existing property items from localStorage
  let propertyArray = JSON.parse(localStorage.getItem(prefix + "propertyArray")) || [];

  // Creates one row with 3 inputs: EL NO., Description, Quantity
  function createPropertyRow(elNo = "", desc = "", qty = "") {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("property-entry");

    const elInput = document.createElement("input");
    elInput.type = "text";
    elInput.placeholder = "EL NO.";
    elInput.value = elNo;
    elInput.addEventListener("input", saveData);
    rowDiv.appendChild(elInput);

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Description of Article";
    descInput.value = desc;
    descInput.addEventListener("input", saveData);
    rowDiv.appendChild(descInput);

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

  // Clear all fields + localStorage
  function clearAll() {
    console.log("Clear button clicked!"); // For debugging
    // 1) Clear the top 10 fields
    for (let i = 1; i <= totalFixedFields; i++) {
      const field = document.getElementById("field" + i);
      if (field) {
        field.value = "";
        localStorage.removeItem(prefix + "field" + i);
      }
    }
    // 2) Clear the dynamic property array
    propertyArray = [];
    localStorage.removeItem(prefix + "propertyArray");
    propertyList.innerHTML = "";

    // 3) Clear the output text
    const outputElement = document.getElementById("bbcodeOutput");
    if (outputElement) {
      outputElement.textContent = "";
    }
  }

  // Attach button listeners
  addPropertyBtn.addEventListener("click", addProperty);
  removePropertyBtn.addEventListener("click", removeProperty);
  clearButton.addEventListener("click", clearAll);

  // Initial render
  renderProperty();
});

// Generate the BBCode
function generateBBCode() {
  let templateTop = `[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
[size=120][color=black][b]PROPERTY TRANSFER RECEIPT
[/b][/font][/color][/size]
[/center]
... (rest of the template)`;

  // Insert placeholders for fields 1..8
  for (let i = 1; i <= 8; i++) {
    const val = document.getElementById("field" + i)?.value || "";
    templateTop = templateTop.replace("NAMEHERE", val);
  }
  // Insert placeholders 9..10
  for (let i = 9; i <= 10; i++) {
    const val = document.getElementById("field" + i)?.value || "";
    templateTop = templateTop.replace("NAMEHERE", val);
  }

  let propertyArray = JSON.parse(localStorage.getItem("propertyRelease-propertyArray")) || [];
  let output = templateTop;

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

  const outputElement = document.getElementById("bbcodeOutput");
  outputElement.textContent = output;

  if (window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(outputElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}