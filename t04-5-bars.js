/**
 * Creates a responsive bar chart visualizing TV brand market share data
 * @param {Array} data - Array of objects containing brand names and unit counts
 */
const createBarChart = (data) => {
  // --- Chart dimensions and configuration ---
  const viewW = 700;                                    // Logical width for SVG viewBox
  const viewH = Math.max(300, data.length * 35);       // Dynamic height based on data
  const displayW = 900;                                // Physical display width
  const displayH = Math.min(500, data.length * 30 + 80); // Physical display height

  // --- Create main SVG container with styling ---
  const svg = d3.select(".responsive-svg-container")  // Changed back to original selector
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`)          // Responsive scaling
    .attr("width", displayW)
    .attr("height", displayH)
    .style("background", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
    .style("border-radius", "12px")
    .style("box-shadow", "0 8px 32px rgba(0, 0, 0, 0.1)")
    .style("border", "none");

  // --- Define gradients for bars ---
  const defs = svg.append("defs");
  
  // Normal state gradient (pink)
  const barGradient = defs.append("linearGradient")
    .attr("id", "barGradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "100%").attr("y2", "0%");
    
  barGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ff9a9e");
    
  barGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#fecfef");

  // Hover state gradient (peach)
  const hoverGradient = defs.append("linearGradient")
    .attr("id", "hoverGradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "100%").attr("y2", "0%");
    
  hoverGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ffecd2");
    
  hoverGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#fcb69f");

  // --- Set up scales ---
  // X scale for bar widths (linear)
  const xMax = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    .range([0, viewW - 250]);                          // Leave space for labels
    
  // Y scale for bar positions (band)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))                    // Brand names
    .range([50, viewH - 30])                           // Vertical space
    .paddingInner(0.1)                                 // Space between bars
    .paddingOuter(0.05);                               // Space at edges

  // --- Add chart title ---
  svg.append("text")
    .text("📺 TV Brand Market Share Analysis")
    .attr("x", viewW / 2)
    .attr("y", 30)              // Moved up
    .attr("text-anchor", "middle")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "20px") // Slightly smaller
    .style("font-weight", "bold")
    .style("fill", "#ffffff")
    .style("text-shadow", "2px 2px 4px rgba(0,0,0,0.3)");

  // --- Create bar groups ---
  const labelX = 200;                                  // X position for labels
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`)
    .style("cursor", "pointer");

  // --- Add bars with animation ---
  const bars = barAndLabel
    .append("rect")
    .attr("x", labelX)
    .attr("y", 2)               // Tighter positioning
    .attr("width", 0)
    .attr("height", yScale.bandwidth() - 4) // Thinner bars
    .attr("fill", "url(#barGradient)")
    .attr("rx", 6)              // Smaller border radius
    .attr("ry", 6)
    .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))")
    .transition()
    .duration(1000)             // Faster animation
    .delay((d, i) => i * 100)   // Quicker stagger
    .attr("width", d => xScale(d.count));

  // --- Add interactive hover effects and tooltips ---
  barAndLabel
    .on("mouseover", function(event, d) {
      d3.select(this).select("rect")
        .attr("fill", "url(#hoverGradient)")
        .style("filter", "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))")
        .transition()
        .duration(150)
        .attr("height", yScale.bandwidth() - 2);
        
      // Smart tooltip positioning
      const barEndX = labelX + xScale(d.count);
      const tooltipWidth = 130;
      const tooltipX = barEndX + tooltipWidth > viewW - 20 
        ? barEndX - tooltipWidth - 10
        : barEndX + 15;
        
      // Show tooltip
      const tooltip = svg.append("g").attr("class", "tooltip");
      tooltip.append("rect")
        .attr("x", tooltipX)
        .attr("y", yScale(d.brand) - 12) // Moved up slightly
        .attr("width", tooltipWidth)
        .attr("height", 40)             // Shorter tooltip
        .attr("fill", "rgba(0,0,0,0.9)")
        .attr("rx", 6)
        .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))");
        
      tooltip.append("text")
        .attr("x", tooltipX + tooltipWidth/2)
        .attr("y", yScale(d.brand) + 2)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(`${d.count.toLocaleString()} units`);
        
      tooltip.append("text")
        .attr("x", tooltipX + tooltipWidth/2)
        .attr("y", yScale(d.brand) + 16)
        .attr("text-anchor", "middle")
        .style("fill", "#ffd700")
        .style("font-size", "10px")
        .style("font-weight", "600")
        .text(`${((d.count / d3.sum(data, d => d.count)) * 100).toFixed(1)}% share`);
    })
    .on("mouseout", function(event, d) {
      d3.select(this).select("rect")
        .attr("fill", "url(#barGradient)")
        .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))")
        .transition()
        .duration(150)
        .attr("height", yScale.bandwidth() - 4);
        
      svg.select(".tooltip").remove();
    });

  // --- Add brand labels ---
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", labelX - 12)
    .attr("y", yScale.bandwidth() / 2 + 1)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "13px")
    .style("font-weight", "600")
    .style("fill", "#ffffff")
    .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.5)")
    .style("opacity", 0)
    .transition()
    .duration(600)
    .delay((d, i) => i * 100 + 200)
    .style("opacity", 1);

  // --- Add value labels ---
  barAndLabel
    .append("text")
    .text(d => d.count.toLocaleString())
    .attr("x", d => labelX + xScale(d.count) + 10)
    .attr("y", yScale.bandwidth() / 2 + 1)
    .attr("dominant-baseline", "middle")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("fill", "#ffffff")
    .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.7)")
    .style("opacity", 0)
    .transition()
    .duration(600)
    .delay((d, i) => i * 100 + 300)
    .style("opacity", 1);

  // --- Add grid lines ---
  const gridLines = svg.selectAll(".grid-line")
    .data(xScale.ticks(5))
    .join("line")
    .attr("class", "grid-line")
    .attr("x1", d => labelX + xScale(d))
    .attr("x2", d => labelX + xScale(d))
    .attr("y1", 50)
    .attr("y2", viewH - 30)
    .style("stroke", "rgba(255,255,255,0.15)")
    .style("stroke-width", 0.5)
    .style("stroke-dasharray", "2,2");

  // --- Add x-axis labels ---
  svg.selectAll(".axis-label")
    .data(xScale.ticks(5))
    .join("text")
    .attr("class", "axis-label")
    .attr("x", d => labelX + xScale(d))
    .attr("y", viewH - 15)        // Moved up
    .attr("text-anchor", "middle")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "10px")
    .style("fill", "rgba(255,255,255,0.7)")
    .text(d => d.toLocaleString());
};