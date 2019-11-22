let width = 1000;
let height = 800;

let svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', 'canvas');

let colors = ["red", "orange", "yellow", "green", "blue", " purple",
    "black", "white", "brown"]
let strokes = ['2', '4', '6', '9', '12']

let boxSize = 40;
let selectedColor = 'red';
let selectedStroke = '2';


svg.selectAll('.colorButton')
    .data(colors)
    .enter()
    .append('rect')
    .attr('class', 'colorButton pointer')
    .attr('x', 10)
    .attr('y', (d, i) => { return i * (boxSize + 10) + 10; })
    .attr('width', boxSize)
    .attr('height', boxSize)
    .attr('fill', (d) => { return d; })
    .attr('stroke', (d) => {
        if (d == selectedColor) return '#000000';
        else return null;
    })
    .attr('stroke-width', (d) => {
        if (d == selectedColor) return 3;
    })
    .on('click', (d) => {
        selectedColor = d;
    });

svg.selectAll('.stroke')
    .data(strokes)
    .enter()
    .append('circle')
    .attr('class', 'stroke')
    .attr('cx', 79)
    .attr('cy', (d, i) => { return i * (boxSize + 10) + 30; })
    .attr('r', (d) => { return d })
    .attr('height', boxSize)
    .attr('fill', 'black')


svg.selectAll('.strokeButton')
    .data(strokes)
    .enter()
    .append('rect')
    .attr('class', 'strokeButton pointer')
    .attr('x', 60)
    .attr('y', (d, i) => { return i * (boxSize + 10) + 10; })
    .attr('width', boxSize)
    .attr('height', boxSize)
    .attr('fill', 'transparent')
    .attr('stroke', '#000000')
    .attr('stroke-width', (d) => {
        if (d == selectedStroke) return 3
        else return 1;
    })
    .on('click', (d) => {
        // selectedColor = d;
    });

svg.append('text')
    .attr('font-family', 'FontAwesome')
    .attr('font-size', 30)
    .attr('x', 960)
    .attr('y', 40)
    .attr('class', 'pointer')
    .text(function (d) { return '\uf2ed' })


