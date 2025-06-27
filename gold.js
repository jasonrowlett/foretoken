// LINE 1
document.addEventListener("DOMContentLoaded", () => {
  const endpoint = "https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec"
  const canvasEl = document.getElementById("concourseChart");
  canvasEl.height = 400; // lock height for consistency

  fetch(endpoint)
    .then((res) => res.json())
    .then((rwaData) => {
      const labels = rwaData.map(row => row.Date);
      const tokenized = rwaData.map(row => row.Tokenized_Gold);
      const physical = rwaData.map(row => row.Physical_Gold);

      const chart = new Chart(canvasEl, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tokenized Gold (USD)",
              borderColor: "#a855f7",
              backgroundColor: "transparent",
              borderWidth: 2,
              data: tokenized,
              tension: 0.2,
            },
            {
              label: "Physical Gold (USD)",
              borderColor: "#facc15",
              backgroundColor: "transparent",
              borderWidth: 2,
              data: physical,
              tension: 0.2,
            }
          ],
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
              ticks: {
                color: "white",
                maxRotation: 45,
                minRotation: 45
              }
            },
            y: {
              ticks: {
                color: "white"
              }
            }
          }
        }
      });
    })
    .catch((error) => {
      alert("Error loading chart data. Please try again later.");
      console.error("Fetch or render error:", error);
    });
});
