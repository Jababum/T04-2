/**
 * Creates a responsive pie chart visualizing screen technology distribution
 * @param {Array} data - Array of objects containing technology types and counts
 */
const createPieChart = (data) => {
    // --- Chart dimensions and configuration ---
    const viewW = 700;                           // Match bar chart width
    const viewH = 400;                           // Adjusted height
    const radius = Math.min(viewW, viewH) / 3;   // Adjusted radius for better proportion

    // Enhanced color scheme for better contrast
    const colors = d3.scaleOrdinal()
        .domain(data.map(d => d.technology))
        .range(['#FF6B6B', '#4ECDC4', '#45B7D1']);

    // Create SVG container with matching bar chart dimensions
    const svg = d3.select(".pie-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", "900")                    // Match bar chart display width
        .attr("height", "500")                   // Match bar chart display height
        .style("background", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
        .style("border-radius", "12px")
        .style("box-shadow", "0 8px 32px rgba(0, 0, 0, 0.1)");

    // Adjust center position for larger width
    const g = svg.append("g")
        .attr("transform", `translate(${viewW/2}, ${viewH/2})`);

    // Calculate total for percentages
    const total = d3.sum(data, d => d.count);

    // Generate pie layout
    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    // Generate arc paths
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Generate label positioning
    const labelArc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1.1);

    // Add slices with animation and interactivity
    const arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .style("cursor", "pointer");

    // Add animated paths
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => colors(d.data.technology))
        .style("opacity", 0.9)
        .style("stroke", "white")
        .style("stroke-width", "2")
        .transition()
        .duration(1000)
        .attrTween("d", function(d) {
            const i = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function(t) {
                return arc(i(t));
            };
        });

    // Update tooltip positioning logic
    arcs.on("mouseover", function(event, d) {
        // Highlight slice
        d3.select(this).select("path")
            .style("opacity", 1)
            .style("filter", "drop-shadow(0 0 8px rgba(255,255,255,0.3))");

        // Calculate angle of the slice center
        const angle = (d.startAngle + d.endAngle) / 2;
        
        // Calculate initial tooltip position
        const tooltipRadius = radius * 1.2;
        let tooltipX = Math.cos(angle - Math.PI / 2) * tooltipRadius;
        let tooltipY = Math.sin(angle - Math.PI / 2) * tooltipRadius;

        // Adjust tooltip dimensions to match bar chart
        const tooltipWidth = 130;
        const tooltipHeight = 40;
        
        // Check boundaries and adjust if needed
        if (tooltipX + tooltipWidth/2 > viewW/2) {
            tooltipX = viewW/2 - tooltipWidth/2 - 20;
        }
        if (tooltipX - tooltipWidth/2 < -viewW/2) {
            tooltipX = -viewW/2 + tooltipWidth/2 + 20;
        }
        if (tooltipY + tooltipHeight > viewH/2) {
            tooltipY = viewH/2 - tooltipHeight - 20;
        }
        if (tooltipY - tooltipHeight < -viewH/2) {
            tooltipY = -viewH/2 + tooltipHeight + 20;
        }

        // Create tooltip group
        const tooltip = svg.append("g")
            .attr("class", "tooltip")
            .attr("transform", `translate(${viewW/2 + tooltipX},${viewH/2 + tooltipY})`);

        // Add tooltip background
        tooltip.append("rect")
            .attr("x", -tooltipWidth/2)
            .attr("y", -20)
            .attr("width", tooltipWidth)
            .attr("height", tooltipHeight)
            .attr("fill", "rgba(0,0,0,0.9)")
            .attr("rx", 6)
            .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))");

        // Add tooltip text - matching bar chart style
        tooltip.append("text")
            .attr("x", 0)
            .attr("y", -2)
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(`${d.data.count.toLocaleString()} units`);

        tooltip.append("text")
            .attr("x", 0)
            .attr("y", 16)
            .attr("text-anchor", "middle")
            .style("fill", "#ffd700")
            .style("font-size", "10px")
            .style("font-weight", "600")
            .text(`${d.data.percentage}% share`);
    })
    .on("mouseout", function() {
        // Reset slice appearance
        d3.select(this).select("path")
            .style("opacity", 0.9)
            .style("filter", "none");

        // Remove tooltip
        svg.select(".tooltip").remove();
    });

    // Add animated labels
    arcs.append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "white")
        .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.5)")
        .style("opacity", 0)
        .text(d => `${d.data.percentage}%`)
        .transition()
        .delay(1000)
        .duration(500)
        .style("opacity", 1);

    // Add title with same styling as bar chart
    svg.append("text")
        .attr("x", viewW / 2)
        .attr("y", 40)                           // Adjusted for better spacing
        .attr("text-anchor", "middle")
        .style("font-size", "22px")             // Match bar chart title size
        .style("font-weight", "bold")
        .style("fill", "white")
        .style("text-shadow", "2px 2px 4px rgba(0,0,0,0.3)")
        .text("📺 TV Screen Technology Distribution");
};

// Load and process the data
d3.csv("data/screenTech.csv", d => ({
    technology: d.technology,
    count: +d.count,
    percentage: +d.percentage
})).then(data => {
    createPieChart(data);
});