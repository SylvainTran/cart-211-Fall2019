function testCommand() {
  let consoleInputCommand = document.getElementsByClassName('consoleInput')[0].value;
  let friendsPictureDiv = document.getElementsByClassName('main__section__game--friends-picture')[0];
  let johnPic = "<img class=\"main__section__game--friends-picture\" src=\"img\\John.png\" alt=\"John\">";
  let annaPic = "<img class=\"main__section__game--friends-picture\" src=\"img\\Anna.png\" alt=\"Anna\">";
  let georgePic = "<img class=\"main__section__game--friends-picture\" src=\"img\\duckguy.png\" alt=\"George\">";

  switch(consoleInputCommand) {
    case "Call John":
      friendsPictureDiv.innerHTML = johnPic;
      break;
    case "Call Anna":
      friendsPictureDiv.innerHTML = annaPic;
      break;
    case "Call George":
      friendsPictureDiv.innerHTML = georgePic;
      break;
    default:
      break;
  }
}
