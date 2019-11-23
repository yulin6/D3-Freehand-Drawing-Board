let width = 1000;
let height = 800;

let svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', 'canvas');


let ptdata = [];
let path;

let line = d3.svg.line()
    .interpolate("bundle")
    .tension(1)
    .x(function (d, i) { return d.x; })
    .y(function (d, i) { return d.y; });


svg.on("mousedown", listen)
    .on("mouseup", () => { svg.on("mousemove", null); })


function listen() {
    ptdata = [];
    path = svg.append("path")
        .data([ptdata])
        .attr("stroke", selectedColor)
        .attr('stroke-width', selectedStroke)
        .attr('fill', 'none')

    svg.on("mousemove", onmove);
}


function onmove() {
    // console.log(this)
    let point = d3.mouse(this);

    ptdata.push({ x: point[0], y: point[1] });
    path.attr("d", function (d) { return line(d); })
}


let colors = ["red", "orange", "yellow", "green", "blue", " purple",
    "black", "white", "brown"]
let strokeWidth = ['2', '4', '6', '9', '12']

let boxSize = 40;
let selectedColor = 'red';
let selectedStroke = '2';


let colorButtons = svg.selectAll('.colorButton')
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
        if (d == selectedColor || d == 'white') return '#000000';
        else return null;
    })
    .attr('stroke-width', (d) => {
        if (d == selectedColor) return 3;
    })
    .on('click', (d) => {
        selectedColor = d;
        reselect();
    });

svg.selectAll('.stroke')
    .data(strokeWidth)
    .enter()
    .append('circle')
    .attr('class', 'stroke')
    .attr('cx', 79)
    .attr('cy', (d, i) => { return i * (boxSize + 10) + 30; })
    .attr('r', (d) => { return d })
    .attr('height', boxSize)
    .attr('fill', selectedColor)


let strokeButtons = svg.selectAll('.strokeButton')
    .data(strokeWidth)
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
        selectedStroke = d;
        reselect();
    });

function reselect() {
    // console.log(selectedColor);
    svg.selectAll('.colorButton')
        .attr('stroke', (d) => {
            if (d == selectedColor || d == 'white') return '#000000';
            else return null;
        })
        .attr('stroke-width', (d) => {
            if (d == selectedColor) return 3;
        })

    svg.selectAll('.stroke')
        .attr('fill', selectedColor)
        .attr('stroke', () => { return selectedColor == 'white' ? '#000000' : null });


    svg.selectAll('.strokeButton')
        .attr('stroke', '#000000')
        .attr('stroke-width', (d) => {
            if (d == selectedStroke) return 3
            else return 1;
        })
}

svg.append('text')
    .attr('font-family', 'FontAwesome')
    .attr('font-size', 30)
    .attr('x', 960)
    .attr('y', 40)
    .attr('class', 'pointer')
    .text(function (d) { return '\uf2ed' })
    .on('click', () => {console.log('sdf')})
