const codes = [
  "FL01A9","FL02B8","FL03C7","FL04D6","FL05E5","FL06F4","FL07G3","FL08H2","FL09J1","FL10K0",
  "FL11L9","FL12M8","FL13N7","FL14P6","FL15Q5","FL16R4","FL17S3","FL18T2","FL19U1","FL20V0",
  "SC01A9","SC02B8","SC03C7","SC04D6","SC05E5","SC06F4","SC07G3","SC08H2","SC09J1","SC10K0",
  "SC11L9","SC12M8","SC13N7","SC14P6","SC15Q5","SC16R4","SC17S3","SC18T2","SC19U1","SC20V0"
];

let floorLeft = 20;
let soundLeft = 20;
let claimedCodes = [];

function claimTicket(section) {
  if(section === "Floor") {
    if(floorLeft <= 0) { alert("Floor sold out!"); return; }
    floorLeft--;
    document.getElementById("floorLeft").innerText = `Tickets left: ${floorLeft}`;
  } else if(section === "Soundcheck") {
    if(soundLeft <= 0) { alert("Soundcheck sold out!"); return; }
    soundLeft--;
    document.getElementById("soundLeft").innerText = `Tickets left: ${soundLeft}`;
  }

  // Pick the first unclaimed code from the array
  let code;
  for(let i = 0; i < codes.length; i++) {
    if(!claimedCodes.includes(codes[i])) {
      if((section === "Floor" && codes[i].startsWith("FL")) ||
         (section === "Soundcheck" && codes[i].startsWith("SC"))) {
        code = codes[i];
        claimedCodes.push(code);
        break;
      }
    }
  }

  if(!code) { alert("No codes left for this section!"); return; }

  document.getElementById("ticketStatus").innerText = `🎟️ ${section} Ticket Claimed! Code: ${code}`;
  document.getElementById("ticketCard").style.display = "block";
  document.getElementById("tSection").innerText = section;
  document.getElementById("tCode").innerText = code;
}


