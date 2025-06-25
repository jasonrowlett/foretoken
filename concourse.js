fetch("https://script.google.com/macros/s/AKfycbwGatO0iiamJHceCf9oo0f5ah9IJgpAfxK52BuwIf_c-poj64n8sWXjK7S7Yt5qXb5uAw/exec")
  .then(res => res.json())
  .then(data => {
    const labels = data.map(row => row.Date);
    const physical = data.map(row => parseFloat(row.Physical_Gold));
    const xaut = data.map(row => parseFloat(row.XAUT));
    const paxg = data.map(row => parseFloat(row.PAXG));
    const kau = data.map(row => parseFloat(row.KAU));

    const ctx = document.getElementById("goldChart").getContext("2d");
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Physical Gold",
            data: physical,
            borderColor: "gold",
            borderWidth: 2
          },
          {
            label: "XAUT",
            data: xaut,
            borderColor: "purple",
            borderWidth: 2
          },
          {
            label: "PAXG",
            data: paxg,
            borderColor: "green",
            borderWidth: 2
          },
          {
            label: "KAU",
            data: kau,
            borderColor: "orange",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Date' }
          },
          y: {
            title: { display: true, text: 'USD' },
            beginAtZero: false
          }
        }
      }
    });
  })
  .catch(err => console.error("Data fetch error:", err));
