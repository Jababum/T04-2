/* Stub: will draw the chart in T04-5 */
/*function createBarChart(data) {
  console.log("createBarChart received", data.length, "rows");
}*/
/* T04-4: Load Data */
/*global d3, createBarChart */

/* Load CSV, Convert Type, Quick Check */
d3.csv("data/tvBrandCount.csv", d => ({
  brand: d.brand,
  count: +d.count // '+' converts string to number
})).then(data => {
  // Quick check
  console.log(data); // whole array
  console.log("rows:", data.length);
  console.log("max:", d3.max(data, d => d.count));
  console.log("min:", d3.min(data, d => d.count));
  console.log("extent:", d3.extent(data, d => d.count)); // [min, max]
  
  // Optional: sort for easier reading (descending by count)
  data.sort((a, b) => d3.descending(a.count, b.count));
  
  // Hand off to the chart builder (implemented in t04-5-bars.js)
  createBarChart(data);
});