<template>
  <svg class="view-graphs__item__graph" :data-graph-id="index"></svg>
</template>

<script>
/* eslint-disable  */
import * as d3 from 'd3';

export default {
    name: 'ViewGraph',
    props: {
        index: Number,
        data: Object
    },
    mounted() {
        const total = Object.values(this.data).reduce((t, a) => t + Number(a), 0);
        // Define size & radius of donut pie chart

        const width = 192;
        const height = 192;
        const radius = Math.min(width, height) / 2;

        // Define arc colours
        const colour = function(index) {
            const colors = ['#fe8b04', '#2582ff', '#19ded3'];

            return colors[index];
        }

        // Define arc ranges
        const arcText = d3.scaleOrdinal()
        .range([0, width]);

        // Determine size of arcs
        const arc = d3.arc()
        .innerRadius(radius - 43)
        .outerRadius(radius - 16);

        // Create the donut pie chart layout
        const pie = d3.pie()
        .value(function (d) { return Number(d) * 100 / total; })
        .sort(null);

        // Append SVG attributes and append g to the SVG
        const svg = d3.select(`[data-graph-id='${this.index}']`)
        .attr("width", width)
        .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");

        const wrapGroup = svg.append('g')
            .attr('class', 'qqq')
            .attr("filter", `url(#filter${this.index}_d)`);

        const filter = svg.append('filter')
        .attr('id', `filter${this.index}_d`)
        .attr('x', '-168')
        .attr('y', '-168')
        .attr('width', '320')
        .attr('height', '320')
        .attr('filterUnits', 'userSpaceOnUse')
        .attr('color-interpolation-filters', 'sRGB');

        filter.append('feFlood')
        .attr('flood-opacity', '0')
        .attr('result', 'BackgroundImageFix');

        filter.append('feColorMatrix')
        .attr('in', 'SourceAlpha')
        .attr('type', 'matrix')
        .attr('values', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0');

        filter.append('feOffset')
        .attr('dy', '4');

        filter.append('feGaussianBlur')
        .attr('stdDeviation', '2');

        filter.append('feColorMatrix')
        .attr('type', 'matrix')
        .attr('values', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0');

        filter.append('feBlend')
        .attr('mode', 'normal')
        .attr('in2', 'BackgroundImageFix')
        .attr('result', 'effect1_dropShadow');

        filter.append('feBlend')
        .attr('mode', 'normal')
        .attr('in', 'SourceGraphic')
        .attr('in2', 'effect1_dropShadow')
        .attr('result', 'shape');

        // Calculate SVG paths and fill in the colours

        const g = wrapGroup.selectAll(".arc")
        .data(pie(Object.values(this.data)))
        .enter().append("g")
        .attr("class", "arc")

        //g.appendTo(wrapGroup);
               

            // Append the path to each g
            g.append("path")
            .attr("d", arc)
            .attr("fill", function(d, i) {
                return colour(i);
            });

            // Append text labels to each arc
            g.append("text")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".45em")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .attr("fill", "#fff")
                .text((d,i) => { return Object.values(this.data)[i] > 0 ? Object.values(this.data)[i] : ''; })
        
        g.selectAll(".arc text").call(wrap, arcText.range([0, width]));

        // Append text to the inner circle
        svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 44)
        .attr("fill", "transparent")
        .attr("stroke", "rgba(0, 0, 0, 0.15)");

        svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 87.5)
        .attr("fill", "transparent")
        .attr("stroke", "rgba(0, 0, 0, 0.15)");

        svg.append("line")
        .attr("x1", 0)
        .attr("y1", 62)
        .attr("x2", 62)
        .attr("y2", 0)
        .attr("fill", "transparent")
        .attr("transform", "translate(-31, -31)")
        .attr("stroke", "#D9D9D9");

        svg.append("text")
        .attr("dy", "22")
        .attr("transform", "translate(-18, -24)")
        .style("text-anchor", "middle")
        .style("font-size", "24px")
        .attr("class", "inner-circle")
        .attr("fill", "#0B2239")
        .text(() => { return total; });

        svg.append("text")
        .attr("dy", "22")
        .attr("transform", "translate(16, 4)")
        .style("text-anchor", "middle")
        .style("font-size", "24px")
        .attr("class", "inner-circle")
        .attr("fill", "#0B2239")
        .text(() => { return this.data.active; });
        //wrapGroup.innerHTML += g;

        // Wrap function to handle labels with longer text
        function wrap(text) {
            text.each(function() {
                const text = d3.select(this);
                const words = text.text().split(/\s+/).reverse();
                let word;
                const line = [];
                const lineNumber = 0;
                const lineHeight = 1.1; // ems
                const y = text.attr("y");
                const dy = parseFloat(text.attr("dy"));
                const tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > 90) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }
    },
}
</script>