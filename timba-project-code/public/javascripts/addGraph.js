document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myChart").getContext("2d");

  let chartData = {
    labels: ["Vision", "Selfcontrol", "Courage", "Sharp"],
    datasets: [{
        label: player.username,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        data: [player.vision, player.selfControl, player.courage, player.sharp]
       } 
      
    ]
  };
  let chartOption = {
    scale: {
      ticks: {
        beginAtZero: false,
        min: 0,
        max: 5,
        stepZise: 1
      }
    },
    pointLabels: {
      fontSize: 18
    },
    legend: {
      position: "bottom",
      fontSize: 18
    }
  };

  let printChart = (cData, cOption) => {
    new Chart(ctx, {
      type: "radar",
      data: cData,
      options: cOption
    });
  };
  
  printChart(chartData, chartOption);
});
