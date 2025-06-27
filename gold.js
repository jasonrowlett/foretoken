// LINE 1
document.addEventListener("DOMContentLoaded", () => {
  const endpoint = "https://script.googleusercontent.com/a/macros/foretoken.co/echo?user_content_key=AehSKLhy7m5EVnBhw4xPXXRNiMQ4mCpUJcRoyq1vjttG1ND8Ph0WXz_RATtP6QOHFB_r6bE1dWIfeDoXvqCjZwERjh2blurDKox9n4WgA7D4BcqmgYQg9r46KSlN9-o7LgnXF9wx8IsvgnynGtMlfUXmRt-OWVwGr9UNf0IvKL0sgMoWzHXyJo6LBX_C8GG5WVKg58U3VK3l58HutRyng0890mBTpgQg9ZIdjRXY0tHuyjlYayVyTAHa2qYnHu1DcLxSkCFzImzp8n8BNflBVilkNtzJPQF_elv4iIUcdSz6yypf8Dld1QBtnXrSmN1uFA&lib=MotHaa_POeJ4AJP0vIwToN_Dd4ZPdTta9";
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
    console.log("Raw API response:", rawData);
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

    if (entry["Date"] && (!isNaN(physical) || !isNaN(paxg))) {
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
      }
    }
  });
}
