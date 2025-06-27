document.addEventListener("DOMContentLoaded", () => {
  const endpoint = "https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec";
  const canvasEl = document.getElementById("concourseChart");

  fetch(endpoint)
    .then(res => res.json())
    .then(rwaData => {
      const labels = rwaData.map(row => row.Date);
      const tokenized = rwaData.map(row => parseFloat(row.Tokenized_Gold) || null);
      const physical = rwaData.map(row => parseFloat(row.Physical_Gold) || null);

      console.log("Gold Sample Data:", rwaData.slice(0, 5));

      new Chart(canvasEl, {
        type: "line",
        data: {
          labels,
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
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: "white" }
            }
          },
          scales: {
            x: { ticks: { color: "white" }},
            y: { ticks: { color: "white" }}
          }
        }
      });
    })
    .catch(error => {
      console.error("Gold Chart Error:", error);
    });
});
