function testCommand() {
  let consoleInputCommand = document.getElementsByClassName('consoleInput')[0].value;
  let friendsPictureDiv = document.getElementsByClassName('main__section__game--friends-picture')[0];
  let johnPic = "<img class=\"main__section__game--friends-picture\" src=\"img\\John.png\" alt=\"Johns profile pic\">";
  //alert(consoleInputCommand);
  switch(consoleInputCommand) {
    case "Call John":
      friendsPictureDiv.innerHTML = johnPic;
      break;
    case "Call Anna":
      document.write("Calling Anna");
      break;
    default:
      break;
  }
}
