document.addEventListener("DOMContentLoaded", async function () {
  const ctx = document.getElementById("goldChart").getContext("2d");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec");
    const jsonData = await response.json();

    const labels = jsonData.timestamps;
    const tokenizedPrices = jsonData.tokenized;
    const physicalPrices = jsonData.physical;

    const goldChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tokenized Gold (XAUT)",
            data: tokenizedPrices,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            tension: 0.4
          },
          {
            label: "Physical Gold",
            data: physicalPrices,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#fff"
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#fff" }
          },
          y: {
            ticks: { color: "#fff" }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
  }
});
