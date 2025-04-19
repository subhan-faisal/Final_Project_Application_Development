// ✅ Step 1: Initialize dummy data if not already in localStorage
if (!localStorage.getItem("parkingData")) {
    const initialData = [
        {
            lot: "Lot 5B",
            zone: "A",
            available: 34,
            capacity: 120,
            type: "Student",
            history: [50, 45, 40, 36, 34]
        },
        {
            lot: "Lot 3C",
            zone: "B",
            available: 12,
            capacity: 75,
            type: "Faculty",
            history: [20, 18, 16, 14, 12]
        },
        {
            lot: "Lot 7A",
            zone: "C",
            available: 98,
            capacity: 200,
            type: "Visitor",
            history: [110, 105, 102, 100, 98]
        }
    ];
    localStorage.setItem("parkingData", JSON.stringify(initialData));
}

// ✅ Step 2: Load shared dataset
let parkingData = JSON.parse(localStorage.getItem("parkingData"));

// ✅ Step 3: Build charts using the shared dataset

// Bar Chart: Parking Lot Capacity vs. Availability
const barCtx = document.getElementById('barChart');
new Chart(barCtx, {
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
        plugins: { title: { display: true, text: 'Parking Lot Capacity vs. Availability' } }
    }
});

// Pie Chart: Usage by Type (Student/Faculty/Visitor)
const pieCtx = document.getElementById('pieChart');
const typeCounts = {
    Student: 0,
    Faculty: 0,
    Visitor: 0
};
parkingData.forEach(lot => {
    typeCounts[lot.type] = (typeCounts[lot.type] || 0) + 1;
});
new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Student', 'Faculty', 'Visitor'],
        datasets: [{
            data: [typeCounts.Student, typeCounts.Faculty, typeCounts.Visitor],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)'
            ]
        }]
    },
    options: {
        plugins: { title: { display: true, text: 'Usage by Type' } }
    }
});

// Line Chart: Simulated Availability Trends (average of all lots)
const lineCtx = document.getElementById('lineChart');
const timePoints = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM'];
const avgHistory = [0, 0, 0, 0, 0];

parkingData.forEach(lot => {
    lot.history.forEach((val, idx) => {
        avgHistory[idx] += val;
    });
});
for (let i = 0; i < avgHistory.length; i++) {
    avgHistory[i] = avgHistory[i] / parkingData.length;
}

new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: timePoints,
        datasets: [{
            label: 'Average Availability',
            data: avgHistory,
            fill: false,
            borderColor: 'rgba(153, 102, 255, 0.8)',
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Parking Availability Trends Over Time' } }
    }
});
