// script.js

const PROXY_URL = "https://api.jsonbin.io/v3/b/69072c8243b1c97be9938879"; // <-- replace with your deployed proxy URL

// Helper to get current tickets from proxy
async function getTickets() {
  const res = await fetch(`${PROXY_URL}/tickets`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to fetch tickets");
  return data.record;
}

// Update ticket counts in the UI
async function updateTicketCounts() {
  try {
    const tickets = await getTickets();
    const day = document.getElementById("daySelect").value;

    document.getElementById("floorLeft").textContent = `Tickets left: ${tickets[day].Floor}`;
    document.getElementById("soundLeft").textContent = `Tickets left: ${tickets[day].Soundcheck}`;

    // Show sold-out overlays if needed
    document.getElementById("floorSoldOut").style.display = tickets[day].Floor <= 0 ? "block" : "none";
    document.getElementById("soundSoldOut").style.display = tickets[day].Soundcheck <= 0 ? "block" : "none";
  } catch (err) {
    console.error("Error updating tickets:", err);
  }
}

// Claim a ticket (Floor or Soundcheck)
async function claimTicket(section) {
  const day = document.getElementById("daySelect").value;

  // Check if user already claimed a ticket
  if (localStorage.getItem("twizeTicketClaim")) {
    alert("You have already claimed a ticket!");
    return;
  }

  try {
    const res = await fetch(`${PROXY_URL}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day, section, clientId: "demoUser" }) // replace "demoUser" with Roblox username if needed
    });
    const data = await res.json();

    if (!data.success) {
      alert(data.error || "Failed to claim ticket");
      return;
    }

    // Save claim locally
    const claim = {
      day,
      section,
      code: data.code,
      claimedAt: new Date().toISOString()
    };
    localStorage.setItem("twizeTicketClaim", JSON.stringify(claim));

    // Update reservation display
    document.getElementById("ticketCard").style.display = "block";
    document.getElementById("tDay").textContent = day;
    document.getElementById("tSection").textContent = section;
    document.getElementById("tCode").textContent = data.code;
    document.getElementById("ticketStatus").textContent = "You have a reservation!";

    // Update counts
    updateTicketCounts();
  } catch (err) {
    console.error("Error claiming ticket:", err);
  }
}

// Update counts on page load and whenever day selection changes
document.getElementById("daySelect").addEventListener("change", updateTicketCounts);
updateTicketCounts();

// Optional: if user already claimed, show reservation on page load
window.addEventListener("DOMContentLoaded", () => {
  const claim = JSON.parse(localStorage.getItem("twizeTicketClaim") || "null");
  if (claim) {
    document.getElementById("ticketCard").style.display = "block";
    document.getElementById("tDay").textContent = claim.day;
    document.getElementById("tSection").textContent = claim.section;
    document.getElementById("tCode").textContent = claim.code;
    document.getElementById("ticketStatus").textContent = "You have a reservation!";
  }
});

