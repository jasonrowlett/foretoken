document.addEventListener("DOMContentLoaded", async function () {
  const ctx = document.getElementById("goldChart").getContext("2d");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec");
    const jsonData = await response.json();

    const labels = jsonData.map(entry => entry.timestamp);
    const tokenizedPrices = jsonData.map(entry => parseFloat(entry.tokenized));
    const physicalPrices = jsonData.map(entry => parseFloat(entry.physical));

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tokenized Gold (USD)",
            data: tokenizedPrices,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: "Physical Gold (USD)",
            data: physicalPrices,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderWidth: 2,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white"
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "white" }
          },
          y: {
            ticks: { color: "white" }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error loading chart:", error);
  }
});
