document.getElementById('yesBtn').onclick = () => {
  chrome.runtime.sendMessage({ action: "enableVPN" });
  window.close();
};

document.getElementById('noBtn').onclick = () => {
  window.close(); // Просто закриває вікно
};
