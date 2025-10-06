// t04-5-bars.js
const createBarChart = (data) => {
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 400") // temporary; we'll adjust layout soon
    .style("border", "1px solid black"); // dev-only border so we see the canvas
  
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log(d); // inspect each row in the Console
      return `bar bar-${d.count}`; // "bar bar-859"
    })
    .attr("width", d => d.count) // uses your numeric column directly
    .attr("height", 16); // constant bar height
};