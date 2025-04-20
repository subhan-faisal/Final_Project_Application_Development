// Wait for the page to fully load
window.addEventListener("DOMContentLoaded", () => {
    // Fetch data from your backend
    fetch('http://localhost:3000/lots')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("lot-container");
        container.innerHTML = ""; // Clear loading message
  
        // Loop through the data and display each parking lot
        data.forEach(lot => {
          const div = document.createElement("div");
          div.innerHTML = `
            <h3>${lot.name}</h3>
            <p>Total Slots: ${lot.totalSlots}</p>
            <p>Available Slots: ${lot.availableSlots}</p>
            <hr/>
          `;
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error("Failed to fetch data:", error);
        document.getElementById("lot-container").innerHTML = "<p>Error loading parking lots.</p>";
      });
  });
  