function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  // Select all .dropdown-btn elements
  const dropdownButtons = document.querySelectorAll('.dropdown-btn');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find the parent .dropdown
      const dropdown = button.closest('.dropdown');
      // Toggle the "active" class
      dropdown.classList.toggle('active');
    });
  });
});