async function fetchSilverData() {
  const response = await fetch("https://script.google.com/macros/s/AKfycbwVq44QxnKWSxXFZKx38-fwTI4I0Sp-euacurUTNSlzBOE9TaQdI86NqZqlZcsvDqcS_A/exec");
  const data = await response.json();

  const labels = data.map(row => row.Date);
  const physical = data.map(row => row.Physical_Silver);
  const tokenized = data.map(row => row.Tokenized_Silver);

  const ctx = document.getElementById("concourseChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Tokenized Silver (USD)",
          borderColor: "#38bdf8",
          data: tokenized,
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Physical Silver (USD)",
          borderColor: "#facc15",
          data: physical,
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.3,
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
            color: "white"
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
}

document.addEventListener("DOMContentLoaded", fetchSilverData);
