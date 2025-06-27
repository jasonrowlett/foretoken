// silver.js

fetch("https://script.google.com/macros/s/AKfycbwVq44QxnKWSxXFZKx38-fwTI4I0Sp-euacurUTNSlzBOE9TaQdI86NqZqlZcsvDqcS_A/exec")
  .then(response => response.json())
  .then(data => {
    const ctx = document.getElementById('concourseChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.Date),
        datasets: [
          {
            label: 'Tokenized Silver (USD)',
            data: data.map(d => d.Tokenized),
            borderColor: 'deepskyblue',
            fill: false
          },
          {
            label: 'Physical Silver (USD)',
            data: data.map(d => d.Physical),
            borderColor: 'gold',
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
