window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lot-container");
  const form      = document.getElementById("create-form");

  // Fetch & render all lots
  function fetchAndRender() {
    fetch("/lots")
      .then(res => res.json())
      .then(data => {
        container.innerHTML = ""; // clear old content

        data.forEach(lot => {
          const div = document.createElement("div");
          div.innerHTML = `
            <h3>${lot.name}</h3>
            <p>Total Slots: ${lot.totalSlots}</p>
            <p>Available Slots: ${lot.availableSlots}</p>
          `;

          // UPDATE button
          const updateBtn = document.createElement("button");
          updateBtn.textContent = "Update Slots";
          updateBtn.addEventListener("click", () => {
            const newAvail = prompt(
              `Enter new available slots for ${lot.name}:`,
              lot.availableSlots
            );
            if (newAvail !== null) {
              fetch(`/lots/${lot.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ availableSlots: Number(newAvail) })
              })
                .then(() => fetchAndRender())
                .catch(console.error);
            }
          });

          // DELETE button
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete Lot";
          deleteBtn.addEventListener("click", () => {
            if (confirm(`Delete ${lot.name}?`)) {
              fetch(`/lots/${lot.id}`, { method: "DELETE" })
                .then(() => fetchAndRender())
                .catch(console.error);
            }
          });

          div.append(updateBtn, deleteBtn, document.createElement("hr"));
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error("Fetch failed:", error);
        container.innerHTML = "<p>Error loading parking lots.</p>";
      });
  }

  // Handle Create form submission
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name          = document.getElementById("name").value.trim();
    const totalSlots    = Number(document.getElementById("totalSlots").value);
    const availableSlots= Number(document.getElementById("availableSlots").value);

    fetch("/lots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, totalSlots, availableSlots })
    })
      .then(res => {
        if (!res.ok) throw new Error("Create failed");
        return res.json();
      })
      .then(() => {
        form.reset();
        fetchAndRender();
      })
      .catch(error => {
        console.error("Create error:", error);
      });
  });

  // Initial load
  fetchAndRender();
});
