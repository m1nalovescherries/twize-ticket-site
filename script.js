// Ticket codes for each day and section
const ticketCodes = {
  "Jan 3, 2026": {
    "Floor": ["FL03-01","FL03-02","FL03-03","FL03-04","FL03-05","FL03-06","FL03-07","FL03-08","FL03-09","FL03-10",
              "FL03-11","FL03-12","FL03-13","FL03-14","FL03-15","FL03-16","FL03-17","FL03-18","FL03-19","FL03-20"],
    "Soundcheck": ["SC03-01","SC03-02","SC03-03","SC03-04","SC03-05","SC03-06","SC03-07","SC03-08","SC03-09","SC03-10",
                   "SC03-11","SC03-12","SC03-13","SC03-14","SC03-15","SC03-16","SC03-17","SC03-18","SC03-19","SC03-20"]
  },
  "Jan 4, 2026": {
    "Floor": ["FL04-01","FL04-02","FL04-03","FL04-04","FL04-05","FL04-06","FL04-07","FL04-08","FL04-09","FL04-10",
              "FL04-11","FL04-12","FL04-13","FL04-14","FL04-15","FL04-16","FL04-17","FL04-18","FL04-19","FL04-20"],
    "Soundcheck": ["SC04-01","SC04-02","SC04-03","SC04-04","SC04-05","SC04-06","SC04-07","SC04-08","SC04-09","SC04-10",
                   "SC04-11","SC04-12","SC04-13","SC04-14","SC04-15","SC04-16","SC04-17","SC04-18","SC04-19","SC04-20"]
  }
};

// Track remaining tickets locally
const ticketsLeft = {
  "Jan 3, 2026": { Floor: 20, Soundcheck: 20 },
  "Jan 4, 2026": { Floor: 20, Soundcheck: 20 }
};

// Update ticket counts on the main page
function updateTicketCounts() {
  const day = document.getElementById("daySelect").value;
  document.getElementById("floorLeft").textContent = `Tickets left: ${ticketsLeft[day].Floor}`;
  document.getElementById("soundLeft").textContent = `Tickets left: ${ticketsLeft[day].Soundcheck}`;

  document.getElementById("floorSoldOut").style.display = ticketsLeft[day].Floor <= 0 ? "block" : "none";
  document.getElementById("soundSoldOut").style.display = ticketsLeft[day].Soundcheck <= 0 ? "block" : "none";
}

// Claim a ticket
function claimTicket(section) {
  const day = document.getElementById("daySelect").value;

  if (localStorage.getItem("twizeTicketClaim")) {
    alert("You already claimed a ticket on this device!");
    return;
  }

  if (ticketsLeft[day][section] <= 0) {
    alert("Sold out!");
    return;
  }

  ticketsLeft[day][section] -= 1;

  // Pop the next available code for this section/day
  const code = ticketCodes[day][section].shift();

  // Save reservation locally
  localStorage.setItem("twizeTicketClaim", JSON.stringify({ day, section, code }));

  // Redirect to billing page
  window.location.href = "billing.html";
}

// Initialize main page
document.getElementById("daySelect").addEventListener("change", updateTicketCounts);

window.addEventListener("DOMContentLoaded", () => {
  const claim = JSON.parse(localStorage.getItem("twizeTicketClaim") || "null");
  if (claim) {
    document.getElementById("ticketCard").style.display = "block";
    document.getElementById("tDay").textContent = claim.day;
    document.getElementById("tSection").textContent = claim.section;
    document.getElementById("tCode").textContent = claim.code;
    document.getElementById("ticketStatus").textContent = "You have a reservation!";
  }
  updateTicketCounts();
});
