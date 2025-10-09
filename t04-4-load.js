/* Load and process TV brand data from CSV */
/*global d3, createBarChart */

d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,                     // Brand name (string)
    count: +d.count                     // Convert count to number
})).then(data => {
    // Sort data by count (descending)
    data.sort((a, b) => d3.descending(a.count, b.count));
    
    // Create the visualization with original selector
    createBarChart(data);
});