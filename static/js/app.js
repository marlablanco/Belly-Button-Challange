//Read in URL
const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//graph function
function bar_chart(sample){

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
console.log(data);

//Sample data 
let belly_button_df=data.samples.filter(item=>item.id==sample)
console.log(data.samples.filter(item=>item.id));

//Sample data variables
let ValueData=belly_button_df[0]
let sample_values=ValueData.sample_values;
let otu_ids=ValueData.otu_ids;
let otu_labels=ValueData.otu_labels;

console.log(sample_values.slice(0,10).reverse());

//Bar graph
let bar_graph={
    type:"bar",
    x:sample_values.slice(0,10).reverse(),
    y:otu_ids.slice(0,10).reverse(),
    text:otu_labels.slice(0,10).reverse(),
    orientation:"h"
    
};
//Bar graph layout
let layout={
    title:"Top 10 OTUsFound",
    xaxis:{title:"Sample Values"},
    yaxis:{title: "OTU IDs"},
    hovermode: "closest",
};
//Bubble graph
let bubble_graph={
    x:otu_ids.reverse(),
    y:sample_values.reverse(),
    text: otu_labels.reverse(),
    mode:"markers",
    marker: {
        color:otu_ids,
        size:sample_values,
        colorscale: "Earth"

    }
};
//Bubble graph layout
let layout2={
    xaxis:{title: "OTU Labels"},
    autosize:true,
};

graph=[bar_graph]
graph2=[bubble_graph]

//Plot graphs
Plotly.newPlot("bar",graph,layout);
Plotly.newPlot("bubble",graph2,layout2);
});
}

//Metadata
function metadata(meta_info) {
    d3.json(url).then(function(data) {
        let meta_data=data.metadata;
        let meta_data_id=meta_data.filter(item=>item.id==meta_info);
        let meta_html=d3.select("#sample-metadata");
        let result=meta_data_id[0];
        meta_html.html("");
        for (key in result){
            meta_html.append("h6").text(`${key.toUpperCase()}:${result[key]}`);
        };
    });
}
//Initialize dropdown
function init(){
    d3.json(url).then(function(data){
    let names=data.names;
    let dropdownMenu=d3.select("#selDataset");
    for(let i=0;i<names.length;i++){
        dropdownMenu
        .append('option')
        .text(names[i])
        .property("value",names[i]);
    }
let first_value=names[0]
bar_chart(first_value);
metadata(first_value)  
});

}

function optionChanged(update_sample){
    bar_chart(update_sample);
    metadata(update_sample);
}
//Initialize
init();