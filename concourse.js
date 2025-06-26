document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("goldChart");

  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  const ctx = canvas.getContext("2d");
  
  console.log("Canvas context:", ctx);
  console.log("Chart is:", Chart);
  
  const goldChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["10:00", "10:05", "10:10", "10:15", "10:20"],
      datasets: [
        {
          label: "Tokenized Gold (XAUT)",
          data: [2300, 2312, 2305, 2320, 2315],
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          tension: 0.4,
        },
        {
          label: "Physical Gold",
          data: [2295, 2301, 2300, 2310, 2308],
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#fff",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#fff",
          },
        },
        y: {
          ticks: {
            color: "#fff",
          },
        },
      },
    },
  });
});
