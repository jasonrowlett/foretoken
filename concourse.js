document.addEventListener("DOMContentLoaded", async function () {
  const ctx = document.getElementById("goldChart").getContext("2d");

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec');
    const data = await response.json();

    const filtered = data.filter(entry =>
      entry["Physical Gold"] && entry["PAXG"] &&
      !isNaN(parseFloat(entry["Physical Gold"])) &&
      !isNaN(parseFloat(entry["PAXG"]))
    );

    const labels = filtered.map(entry =>
      new Date(entry["Date"]).toLocaleDateString()
    );
    const physicalGold = filtered.map(entry => parseFloat(entry["Physical Gold"]));
    const paxgGold = filtered.map(entry => parseFloat(entry["PAXG"]));

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tokenized Gold (USD)",
            data: paxgGold,
            borderColor: "purple",
            borderWidth: 2,
            fill: false
          },
          {
            label: "Physical Gold (USD)",
            data: physicalGold,
            borderColor: "gold",
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  } catch (error) {
    console.error("Chart loading error:", error);
  }
});
