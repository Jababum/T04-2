// Populate current year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
