// == CONFIG ==
const BIN_ID = "69072c8243b1c97be9938879"; // your JSONBin ID
const JSONBIN_KEY = "$2a$10$1Pa9mQ4kXZ86/RPnzie7AOtSXvzCdh1D5ovzcFR2uA8Qh/KpeXT8q"; // your master key
const BASE_URL = `https://api.jsonbin.io/v3/b/69072c8243b1c97be9938879/latest`;

// == HELPERS ==
async function fetchTickets() {
  const res = await fetch(`${BASE_URL}/latest`, {
    headers: { "X-Master-Key": JSONBIN_KEY }
  });
  const data = await res.json();
  return data.record;
}

async function saveTickets(updated) {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_KEY
    },
    body: JSON.stringify(updated)
  });
  const data = await res.json();
  return data;
}

// == UPDATE UI ==
async function updateTicketCounts() {
  try {
    const tickets = await fetchTickets();
    const day = document.getElementById("daySelect").value;

    document.getElementById("floorLeft").textContent = `Tickets left: ${tickets[day].Floor}`;
    document.getElementById("soundLeft").textContent = `Tickets left: ${tickets[day].Soundcheck}`;

    document.getElementById("floorSoldOut").style.display = tickets[day].Floor <= 0 ? "block" : "none";
    document.getElementById("soundSoldOut").style.display = tickets[day].Soundcheck <= 0 ? "block" : "none";
  } catch (err) {
    console.error("Error fetching tickets:", err);
  }
}

// == CLAIM TICKET ==
async function claimTicket(section) {
  const day = document.getElementById("daySelect").value;

  // check if user already claimed
  if (localStorage.getItem("twizeTicketClaim")) {
    alert("You already claimed a ticket!");
    return;
  }

  try {
    const tickets = await fetchTickets();

    if (tickets[day][section] <= 0) {
      alert("Sold out!");
      return;
    }

    // decrement the ticket
    tickets[day][section] -= 1;

    await saveTickets(tickets);

    // create reservation code
    const code = `${section.substring(0,2).toUpperCase()}${day.replace(/[^0-9]/g,"")}-${Date.now().toString().slice(-6)}`;

    // save locally
    localStorage.setItem("twizeTicketClaim", JSON.stringify({ day, section, code }));

    // show reservation
    document.getElementById("ticketCard").style.display = "block";
    document.getElementById("tDay").textContent = day;
    document.getElementById("tSection").textContent = section;
    document.getElementById("tCode").textContent = code;
    document.getElementById("ticketStatus").textContent = "You have a reservation!";

    // update counts
    updateTicketCounts();

  } catch (err) {
    console.error("Error claiming ticket:", err);
    alert("Could not claim ticket. See console for details.");
  }
}

// == EVENT LISTENERS ==
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
