/**
 * Creates a responsive bar chart visualizing TV screen size distribution
 * @param {Array} data - Array of objects containing screen sizes and counts
 */
const createScreenSizeChart = (data) => {
    // --- Chart dimensions and configuration ---
    const viewW = 700;                           
    const viewH = 400;                           
    const margin = { top: 50, right: 30, bottom: 50, left: 60 };
    const width = viewW - margin.left - margin.right;
    const height = viewH - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(".screen-size-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", "900")
        .attr("height", "500")
        .style("background", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
        .style("border-radius", "12px")
        .style("box-shadow", "0 8px 32px rgba(0, 0, 0, 0.1)");

    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.size))
        .range([margin.left, width + margin.left])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([height + margin.top, margin.top]);

    // Create gradient for bars
    const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "sizeBarGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ffd700");

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ff8c00");

    // Add bars
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.size))
        .attr("y", height + margin.top)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", "url(#sizeBarGradient)")
        .attr("rx", 4)
        .style("filter", "drop-shadow(2px 2px 3px rgba(0,0,0,0.2))")
        .on("mouseover", function(event, d) {
            d3.select(this)
                .style("filter", "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))");

            const tooltip = svg.append("g")
                .attr("class", "tooltip");

            const tooltipBg = tooltip.append("rect")
                .attr("x", xScale(d.size))
                .attr("y", yScale(d.count) - 60)
                .attr("width", 130)
                .attr("height", 40)
                .attr("fill", "rgba(0,0,0,0.9)")
                .attr("rx", 6)
                .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))");

            tooltip.append("text")
                .attr("x", xScale(d.size) + 65)
                .attr("y", yScale(d.count) - 40)
                .attr("text-anchor", "middle")
                .style("fill", "white")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text(`${d.count} units`);

            tooltip.append("text")
                .attr("x", xScale(d.size) + 65)
                .attr("y", yScale(d.count) - 25)
                .attr("text-anchor", "middle")
                .style("fill", "#ffd700")
                .style("font-size", "10px")
                .style("font-weight", "600")
                .text(`${d.size}" Screen`);
        })
        .on("mouseout", function() {
            d3.select(this)
                .style("filter", "drop-shadow(2px 2px 3px rgba(0,0,0,0.2))");
            svg.select(".tooltip").remove();
        });

    // Animate bars
    bars.transition()
        .duration(1000)
        .attr("y", d => yScale(d.count))
        .attr("height", d => height + margin.top - yScale(d.count));

    // Add axes
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => d + '"');

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0,${height + margin.top})`)
        .call(xAxis)
        .style("color", "white")
        .selectAll("text")
        .style("font-size", "12px");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis)
        .style("color", "white")
        .selectAll("text")
        .style("font-size", "12px");

    // Add title
    svg.append("text")
        .attr("x", viewW / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("fill", "white")
        .style("text-shadow", "2px 2px 4px rgba(0,0,0,0.3)")
        .text("📺 TV Screen Size Distribution");
};

// Load and process the data
d3.csv("data/screenSize.csv", d => ({
    size: +d.size,
    count: +d.count
})).then(data => {
    // Sort data by screen size
    data.sort((a, b) => a.size - b.size);
    createScreenSizeChart(data);
});