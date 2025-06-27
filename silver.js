async function fetchSilverData() {
  const response = await fetch("https://script.google.com/macros/s/AKfycbwVq44QxnKWSxXFZKx38-fwTI4I0Sp-euacurUTNSlzBOE9TaQdI86NqZqlZcsvDqcS_A/exec");
  const data = await response.json();

  const labels = data.map(row => row.Date);
  const physical = data.map(row => +row["Physical Silver"]);
  const kag = data.map(row => +row.KAG || null);
  const grams = data.map(row => +row.GRAMS || null);

  const ctx = document.getElementById("silverChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Physical Silver (USD)",
          data: physical,
          borderColor: "gray",
          backgroundColor: "gray",
          borderWidth: 2,
          pointRadius: 0,
        },
        {
          label: "KAG (USD)",
          data: kag,
          borderColor: "lightblue",
          backgroundColor: "lightblue",
          borderWidth: 2,
          pointRadius: 0,
        },
        {
          label: "GRAMS (USD)",
          data: grams,
          borderColor: "white",
          backgroundColor: "white",
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          ticks: { color: "white", maxRotation: 45, minRotation: 45 },
        },
        y: {
          ticks: { color: "white" },
        },
      },
    },
  });
}

fetchSilverData();
