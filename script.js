let floorLeft = 20;
let soundLeft = 20;

function claimTicket(section) {
  if(section === "Floor") {
    if(floorLeft <= 0) {
      alert("Floor tickets are sold out!");
      return;
    }
    floorLeft--;
    document.getElementById("floorLeft").innerText = `Tickets left: ${floorLeft}`;
  } else if(section === "Soundcheck") {
    if(soundLeft <= 0) {
      alert("Soundcheck tickets are sold out!");
      return;
    }
    soundLeft--;
    document.getElementById("soundLeft").innerText = `Tickets left: ${soundLeft}`;
  }

  // Generate reservation code
  const code = Math.random().toString(36).substring(2,8).toUpperCase();

  // Update reservation display
  document.getElementById("ticketStatus").innerText = `🎟️ ${section} Ticket Claimed! Code: ${code}`;
  document.getElementById("ticketCard").style.display = "block";
  document.getElementById("tSection").innerText = section;
  document.getElementById("tCode").innerText = code;
}

