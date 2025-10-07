/* Load and process TV brand data from CSV */
/*global d3, createBarChart */

/**
 * Loads TV brand count data and initializes visualization
 * Data format: CSV with columns 'brand' and 'count'
 */
d3.csv("data/tvBrandCount.csv", d => ({
  brand: d.brand,                     // Brand name (string)
  count: +d.count                     // Convert count to number
})).then(data => {
  // Log data statistics for verification
  console.log(data);                  // Full dataset
  console.log("rows:", data.length);  // Number of brands
  console.log("max:", d3.max(data, d => d.count));    // Highest count
  console.log("min:", d3.min(data, d => d.count));    // Lowest count
  console.log("extent:", d3.extent(data, d => d.count)); // [min, max] range
  
  // Sort data by count (descending) for better visualization
  data.sort((a, b) => d3.descending(a.count, b.count));
  
  // Create the visualization using sorted data
  createBarChart(data);
});