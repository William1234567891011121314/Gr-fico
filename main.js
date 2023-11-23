const btconfirm = document.querySelector("button");
const input = document.querySelector("input");
const graph = document.querySelector("#gráfico");
var previousvacon = 0, cont = 0, xlayerunits = 20, ylayerunits = 10 , scale = 1000;

graph.style.gridTemplateColumns = `repeat(${xlayerunits}, 1fr)`;
graph.style.gridTemplateRows = `repeat(${ylayerunits}, 1fr)`;

for(let i = 0; i < xlayerunits * ylayerunits; i++) {
    graph.innerHTML += "<span></span>";
}

btconfirm.addEventListener('click', () => {
    graph.innerHTML += "<div></div>";
    let divgraph = graph.querySelector(":last-child");
    let ylayer = graph.clientHeight;
    let xlayer = graph.clientWidth / xlayerunits;
    let vacon = ylayer / scale * input.value;
    let divwidth = Math.sqrt(xlayer * xlayer + (previousvacon - vacon) * (previousvacon - vacon));
    divgraph.style.width = divwidth + "px";
    if(previousvacon > vacon) {
        divgraph.style.transform = `rotate(${Math.atan((previousvacon - vacon) / xlayer)}rad)`;
    } else {
        divgraph.style.transform = `rotate(-${Math.atan(-1*(previousvacon - vacon) / xlayer)}rad)`;
    }
    divgraph.style.bottom = previousvacon + "px";
    divgraph.style.left = cont * xlayer + "px";
    previousvacon = vacon;
    if(cont >= xlayerunits) {
        graph.removeChild(graph.querySelector("div:first-of-type"));
        let divgraphs = graph.querySelectorAll("div");
        let elstyle;
        divgraphs.forEach(el => {
            elstyle = window.getComputedStyle(el);
            leftel = parseFloat(elstyle.getPropertyValue("left"));
            el.style.left = leftel - xlayer + "px";
        });
    } else {
        cont++;
    }
});