let soundLeft = 20;

function claimTicket(section) {
  if(section === "Soundcheck") {
    if(soundLeft <= 0) {
      alert("Soundcheck tickets are sold out!");
      return;
    }
    soundLeft--;
    document.getElementById("soundLeft").innerText = `Soundcheck spots left: ${soundLeft}`;
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  document.getElementById("ticketStatus").innerText = `🎟️ ${section} Ticket Claimed! Code: ${code}`;
  
  document.getElementById("ticketCard").style.display = "block";
  document.getElementById("tSection").innerText = section;
  document.getElementById("tCode").innerText = code;
}
