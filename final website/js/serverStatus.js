// At start
let playersOnline = 59;
let clock = setInterval(updateServerStatus, 500);

function updateServerStatus() {
  let serverStatus = document.getElementById('testServerStatus');
  serverStatus.classList.add('bt__bt--primary__server--status');
  serverStatus.innerHTML = "Server Status: <span style=\"color:green\">" + playersOnline + "</span> online!";
  playersOnline++;
}
