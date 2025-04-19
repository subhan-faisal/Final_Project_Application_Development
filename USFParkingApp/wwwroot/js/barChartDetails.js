const parkingData = JSON.parse(localStorage.getItem("parkingData"));

new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: parkingData.map(lot => lot.lot),
        datasets: [
            {
                label: 'Capacity',
                data: parkingData.map(lot => lot.capacity),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Available',
                data: parkingData.map(lot => lot.available),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: { display: true, text: 'Parking Lot Capacity vs. Availability' }
        }
    }
});
