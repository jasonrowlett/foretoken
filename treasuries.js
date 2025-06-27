// treasuries.js

fetch("https://script.google.com/macros/s/AKfycbywNH3QFWNKmxRMUzOstgJCU7AtDSeAkDWeRScb35Eg4jLh7VH_PSh4Wt8f9aZ3pcnd/exec")
  .then(response => response.json())
  .then(data => {
    const ctx = document.getElementById('comparisonChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.Date),
        datasets: [
          {
            label: 'Tokenized Treasuries (USD)',
            data: data.map(d => d.Tokenized),
            borderColor: 'violet',
            fill: false
          },
          {
            label: 'T-Bills (USD)',
            data: data.map(d => d.Physical),
            borderColor: 'yellow',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'x'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            }
          },
          y: {
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });
  });
