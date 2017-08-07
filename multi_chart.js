function update_multichart(pen_dict) {
  xmax0=Math.max(...pen_dict.distance);
  xmax=Math.ceil(xmax0/5.)*5;
  xcount=xmax/5+1;
  xtick=[];
  var lineChartData = {
      //  labels: ["January", "February", "March", "April", "May", "June", "July"],
      labels:pen_dict.distance,
        datasets: [{
            label: "My First dataset",
//            borderColor: window.chartColors.red,
  //          backgroundColor: window.chartColors.red,
            fill: false,
            data: [
                pen_dict.armor_vert
            ],
            yAxisID: "y-axis-1",
        }, {
            label: "My Second dataset",
//            borderColor: window.chartColors.blue,
//            backgroundColor: window.chartColors.blue,
            fill: false,
            data: [
              1,2,3,4,5,6
            ],
            yAxisID: "y-axis-2"
        }]
    };
  for (i=0;i<xcount;i++){
    xtick.push(i*5);
  }
   var ctx = document.getElementById("canvas").getContext("2d");
   var myLineChart = Chart.Line(ctx, {
     type: 'line',
     data: lineChartData,
     options: {
                responsive: true,
                hoverMode: 'index',
                stacked: false,
                title:{
                    display: true,
                    text:'Chart.js Line Chart - Multi Axis'
                },
                scales: {
                    yAxes: [{
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "right",
                        id: "y-axis-2",

                        // grid line settings
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    }],
                }
            }
 });
}
