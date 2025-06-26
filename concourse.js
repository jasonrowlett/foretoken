// LINE 1
document.addEventListener("DOMContentLoaded", () => {
  const endpoint = "https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec"; // Replace with your full deployed URL
  const ctx = document.getElementById("concourseChart").getContext("2d");

  // LINE 6: Show loading spinner
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  fetch(endpoint)
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      // LINE 13: Hide loading after data loads
      loading.style.display = "none";

      const labels = [];
      const physicalGold = [];
      const tokenizedGold = [];

      // Filter out empty or malformed data rows
      data.forEach(entry => {
        const date = new Date(entry["Date"]);
        const physical = parseFloat(entry["Physical Gold"]);
        const paxg = parseFloat(entry["PAXG"]);
        // Optional: XAUT could be added here and averaged

        if (!isNaN(physical) && !isNaN(paxg)) {
          labels.push(date.toLocaleDateString("en-US"));
          physicalGold.push(physical);
          tokenizedGold.push(paxg); // Could change to avg of PAXG/XAUT
        }
      });

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
              tension: 0.3
            },
            {
              label: "Physical Gold (USD)",
              data: physicalGold,
              borderColor: "#f5d742",
              backgroundColor: "rgba(245, 215, 66, 0.3)",
              borderWidth: 2,
              pointRadius: 1.5,
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              ticks: { color: "#ffffff" }
            },
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 45,
                color: "#ffffff"
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: "#ffffff",
                boxWidth: 12,
                font: { size: 12 }
              }
            },
            tooltip: {
              mode: "index",
              intersect: false
            }
          }
        }
      });
    })
    .catch((error) => {
      loading.style.display = "none";
      console.error("Chart error:", error);
      alert("Error loading chart data. Please try again later.");
    });
});
