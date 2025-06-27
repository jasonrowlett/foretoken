// LINE 1
document.addEventListener("DOMContentLoaded", () => {
  const endpoint =
    "https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec";
  const ctx = document.getElementById("concourseChart").getContext("2d");
  const canvasEl = document.getElementById("concourseChart");
    console.log("Canvas Element:", canvasEl);
    const ctx = canvasEl.getContext("2d");

  fetchDataAndRenderChart(endpoint, ctx);
});

async function fetchDataAndRenderChart(endpoint, ctx) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Network response was not ok");
    const rawData = await response.json();
    const parsedData = parseChartData(rawData);
    renderChart(ctx, parsedData);
  } catch (error) {
    console.error("Chart error:", error);
    alert("Error loading chart data. Please try again later.");
  }
}

function parseChartData(data) {
  const labels = [];
  const physicalGold = [];
  const tokenizedGold = [];

  data.forEach(entry => {
    const date = new Date(entry["Date"]);
    const physical = parseFloat(entry["Physical Gold"]);
    const paxg = parseFloat(entry["PAXG"]);
    // const xaut = parseFloat(entry["XAUT"]); // if added later

    if (!isNaN(physical) && !isNaN(paxg)) {
      labels.push(date.toLocaleDateString("en-US"));
      physicalGold.push(physical);
      tokenizedGold.push(paxg); // Option: (paxg + xaut) / 2
    }
  });

  return { labels, physicalGold, tokenizedGold };
}

function renderChart(ctx, { labels, physicalGold, tokenizedGold }) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Tokenized Gold (USD)",
          data: tokenizedGold,
          borderColor: "#bb33ff",
          backgroundColor: "rgba(187, 51, 255, 0.3)",
          borderWidth: 2,
          pointRadius: 1.5,
          tension: 0.3,
        },
        {
          label: "Physical Gold (USD)",
          data: physicalGold,
          borderColor: "#f5d742",
          backgroundColor: "rgba(245, 215, 66, 0.3)",
          borderWidth: 2,
          pointRadius: 1.5,
          tension: 0.3,
        },
      ],
    },
   options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 600,
      easing: 'easeOutQuart',
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { color: "#ffffff" },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          boxWidth: 12,
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
  },
}
