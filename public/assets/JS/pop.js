const chatPopup = document.getElementById("chatPopup");
const AbrirChatButton = document.getElementById("AbrirChat");
const FecharChatButton = document.getElementById("FecharChat");

AbrirChatButton.addEventListener("click", () => {
  chatPopup.style.display = "block";
  carregarUsuarios();
});

FecharChatButton.addEventListener("click", () => {
  chatPopup.style.display = "none";
});

