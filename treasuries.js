async function fetchTreasuryData() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbywNH3QFWNKmxRMUzOstgJCU7AtDSeAkDWeRScb35Eg4jLh7VH_PSh4Wt8f9aZ3pcnd/exec");
        const data = await response.json();

        const labels = data.map(entry => entry.Date);
        const datasets = [
            {
                label: "ONDO (USD)",
                data: data.map(entry => parseFloat(entry.ONDO)),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 1,
            },
            {
                label: "MTBILL (USD)",
                data: data.map(entry => parseFloat(entry.MTBILL)),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 1,
            },
            {
                label: "TBILL (USD)",
                data: data.map(entry => parseFloat(entry.TBILL)),
                borderColor: "rgba(255, 206, 86, 1)",
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 1,
            },
            {
                label: "USTBL (USD)",
                data: data.map(entry => parseFloat(entry.USTBL)),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 1,
            },
            {
                label: "DTB3 (FRED Rate)",
                data: data.map(entry => parseFloat(entry.DTB3)),
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 1,
            },
            {
                label: "DTB6 (FRED Rate)",
                data: data.map(entry => parseFloat(entry.DTB6)),
                borderColor: "rgba(255, 159, 64, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 1,
            }
        ];

        const ctx = document.getElementById("treasuryChart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            color: "#ffffff",
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        ticks: {
                            color: "#ffffff"
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "#ffffff"
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error loading Treasury chart data:", error);
    }
}

fetchTreasuryData();
