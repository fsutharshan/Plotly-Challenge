# Plot.ly Homework - Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria.jpg)

In this assignment, we built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

1. Used the D3 library to read in `samples.json`.

2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    Used `sample_values` as the values for the bar chart`otu_ids` as the labels for the bar chart and `otu_labels` 
    as the hovertext for the chart.


3. Created a bubble chart that displays each sample.
 Used `otu_ids` for the x values, `sample_values` for the y values,`sample_values` for the marker size `otu_ids` for the marker colors and used the `otu_labels` for the text values.


* Updated the chart whenever a new sample is selected.

