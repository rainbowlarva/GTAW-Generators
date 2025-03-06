/**
 * Toggles the "open" class on a collapsible section.
 * @param {string} sectionId - The ID of the container div to expand/collapse.
 */
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.classList.toggle('open');
  }  