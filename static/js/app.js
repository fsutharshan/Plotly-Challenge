var jsonData;

d3.json('samples.json').then(data => {
    jsonData = data;

    data.names.forEach(name => {
        d3.select('select').append('option').text(name);
    });

    //showPanel(data.names[0])
});


      
// create the function to get the necessary data
function getDemoInfo(id) {
// read the json file to get data
    d3.json("samples.json").then((data)=> {
// get the metadata info for the demographic panel
        var metadata = data.metadata;
        // filter meta data info by id
        var result = metadata.filter(meta => meta.id == id)[0];
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getDemoInfo(id);
    getPlots(id);
    getDemoInfo(id);
}
        
// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}
        


function getPlots(id) {
        //Read samples.json
            d3.json("samples.json").then (sampledata =>{
                var sample = sampledata.samples.filter(obj => obj.id == id)[0];
                console.log(sample);
                
                var ids = sample.otu_ids;
                var sampleValues =  sample.sample_values.slice(0,10).reverse();
                var labels =  sample.otu_labels.slice(0,10);
            // get only top 10 otu ids for the plot OTU and reversing it. 
                var OTU_top = ( sample.otu_ids.slice(0, 10)).reverse();
            // get the otu id's to the desired form for the plot
                var OTU_id = OTU_top.map(d => "OTU " + d);
             // get the top 10 labels for the plot
                var labels =  sample.otu_labels.slice(0,10);
                var trace = {
                    x: sampleValues,
                    y: OTU_id,
                    text: labels,
                    marker: {
                    color: 'blue'},
                    type:"bar",
                    orientation: "h",
                };
                // create data variable
                var data = [trace];
        
                // create layout variable to set plots layout
                var layout = {
                    title: "Top 10 OTU",
                    yaxis:{
                        tickmode:"linear",
                    },
                    margin: {
                        l: 100,
                        r: 100,
                        t: 100,
                        b: 30
                    },
                    height: 600,
                    width: 1000
                };
        
                // create the bar plot
            Plotly.newPlot("bar", data, layout);

                //Create bubble chart
                var trace1 = {
                    x: sample.otu_ids,
                    y: sample.sample_values,
                    mode: "markers",
                    marker: {
                        size: sample.sample_values,
                        color: sample.otu_ids
                    },
                    text:  sample.otu_labels
        
                };
        
                // set the layout for the bubble plot
                var layout_2 = {
                    xaxis:{title: "OTU ID"},
                    height: 600,
                    width: 1000
                };
        
                // creating data variable 
                var data1 = [trace1];
        
            // create the bubble plot
            Plotly.newPlot("bubble", data1, layout_2); 

        var wfreq = sampledata.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        // The guage chart
  
        var data_g = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(wfreq),
            title: { text: `Weekly Washing Frequency ` },
            type: "indicator",
            
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9] },
                     steps: [
                      { range: [0, 2], color: "yellow" },
                      { range: [2, 4], color: "cyan" },
                      { range: [4, 6], color: "teal" },
                      { range: [6, 8], color: "lime" },
                      { range: [8, 9], color: "green" },
                    ]}
                
            }
          ];
          var layout_g = { 
              width: 700, 
              height: 500, 
              margin: { t: 20, b: 40, l:100, r:100 } 
            };
          Plotly.newPlot("gauge", data_g, layout_g);
            
        });
         
    }  
  
  
  init();

        
           