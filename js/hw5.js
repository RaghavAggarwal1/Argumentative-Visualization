let data;
var startYear = 1975;
var endYear = 2021;
document.addEventListener("DOMContentLoaded", function () {
    
    Promise.all([
        d3.csv("data/Abortion Support.csv", (d) => {
            return {
                year: new Date(d["Poll Date"]),
                leagal: +d["Legal under any %"],
                illegal: +d["Illegal in all %"],
            };
          }),
    ]).then(function (values) {
        //save our data
        data = values[0];
        console.log(data);
        
        drawBarChart1();
        drawBarChart2();
    });
});

function drawBarChart1(){
    console.log("trace: barchart1");
    const barMargin = {top: 30, right: 10, bottom:40, left: 60};
    const barWidth = 530 - barMargin.right - barMargin.left;
    const barHeight = 470 - barMargin.bottom - barMargin.top;

    var svg = d3.select('#bar1_svg')
                .append("svg")
                    .attr("width", barWidth + barMargin.right + barMargin.left)
                    .attr("height", barHeight + barMargin.top + barMargin.bottom)
                .append("g")
                        .attr("transform", `translate(${barMargin.left}, ${barMargin.top})`);
                
    //creating X Scale for the bar chart
    var xScale = d3.scaleTime()
        .range([0, barWidth])
        .domain(d3.extent(data, d => d.year));

    //creating Y Scale for the bar chart
    var yScale = d3.scaleLinear()
        .domain([0.1, 0.35])
        .range([barHeight,0]);

    //appending the x axis
    svg.append("g")
        .attr("transform", "translate(0,"+barHeight+")")
        .call(d3.axisBottom(xScale));             

    //appending the Y axis
    svg.append("g")
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")));

    //creating the tooltip
    var barTooltip = d3.select('#bar1_div')
    .append("barTooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);

    svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.leagal))
    );

    svg.selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.leagal))
        .attr("r", 2)
        .attr("fill", "green")
        .on("mouseover", function(event, d) {
            barTooltip.html(`Year: ${d.year.getFullYear()} <br> Votes for Legalizing Abortion: ${d.leagal*100}%`);
            barTooltip.style("opacity", 0.9)
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function(event) {
            barTooltip.style("opacity", 0);
        });

        // Add x axis labels
        svg.append("text")
        .attr("x", barWidth / 2)
        .attr("y", barHeight +40)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .text("Year of Poll");

        //adding y axis label
        svg.append("text")
            .attr("x", -barHeight / 2)
            .attr("y", - 40)
            .attr("transform", `rotate(-90)`)
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .text("Votes for Legalizing Abortion");
        
}

function drawBarChart2(){
    console.log("trace: barchart2");
    const barMargin = {top: 30, right: 10, bottom:40, left: 60};
    const barWidth = 530 - barMargin.right - barMargin.left;
    const barHeight = 470 - barMargin.bottom - barMargin.top;

    var svg = d3.select('#bar2_svg')
                .append("svg")
                    .attr("width", barWidth + barMargin.right + barMargin.left)
                    .attr("height", barHeight + barMargin.top + barMargin.bottom)
                .append("g")
                        .attr("transform", `translate(${barMargin.left}, ${barMargin.top})`);
                
    //creating X Scale for the bar chart
    var xScale = d3.scaleTime()
        .range([0, barWidth])
        .domain(d3.extent(data, d => d.year));

    //creating Y Scale for the bar chart
    var yScale = d3.scaleLinear()
        .domain([0.1, 0.35])
        .range([barHeight,0]);

    //appending the x axis
    svg.append("g")
        .attr("transform", "translate(0,"+barHeight+")")
        .call(d3.axisBottom(xScale));             

    //appending the Y axis
    svg.append("g")
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")));

    //creating the tooltip
    var barTooltip = d3.select('#bar2_div')
    .append("barTooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);

    svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.illegal))
    );

    svg.selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.illegal))
        .attr("r", 2)
        .attr("fill", "red")
        .on("mouseover", function(event, d) {
            barTooltip.html(`Year: ${d.year.getFullYear()} <br> Votes for Illegalizing Abortion: ${d.illegal*100}%`);
            barTooltip.style("opacity", 0.9)
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function(event) {
            barTooltip.style("opacity", 0);
        });

        // Add x axis labels
        svg.append("text")
        .attr("x", barWidth / 2)
        .attr("y", barHeight +40)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .text("Year of Poll");

        //adding y axis label
        svg.append("text")
            .attr("x", -barHeight / 2)
            .attr("y", - 40)
            .attr("transform", `rotate(-90)`)
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .text("Votes for Illegalizing Abortion");
}