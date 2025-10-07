/**
 * Updates the copyright year in the footer automatically
 * Runs when the DOM content is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();  // Set current year
  }
});
