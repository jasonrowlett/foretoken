// gold.js

fetch("https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec")
  .then(response => response.json())
  .then(data => {
    const ctx = document.getElementById('concourseChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.Date),
        datasets: [
          {
            label: 'Tokenized Gold (USD)',
            data: data.map(d => d.Tokenized),
            borderColor: 'purple',
            fill: false
          },
          {
            label: 'Physical Gold (USD)',
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
