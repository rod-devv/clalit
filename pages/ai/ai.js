// Global object to store conversations by ID.
const conversationHistory = {};
// Track the active conversation ID.
let activeConversationId = null;

// Chat functionality
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");

function appendMessage(content, sender = "user") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message");
  if (sender === "user") {
    messageDiv.classList.add("user");
  }
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("message-content");
  contentDiv.textContent = content;
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  // Auto-scroll to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message !== "") {
    appendMessage(message, "user");
    chatInput.value = "";
  }
});

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});

// Sidebar toggle functionality with smooth transition
const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
const sidebar = document.getElementById("sidebar");
const chatContainer = document.getElementById("chatContainer");

toggleSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  if (sidebar.classList.contains("hidden")) {
    chatContainer.classList.add("full-width");
  } else {
    chatContainer.classList.remove("full-width");
  }
});

// New chat functionality:
// If there are messages, save the current conversation and clear the chat area.
const newChatBtn = document.getElementById("newChatBtn");
newChatBtn.addEventListener("click", () => {
  if (chatMessages.innerHTML.trim() !== "") {
    // Create a unique conversation ID if one isn't active
    if (!activeConversationId) {
      activeConversationId = "chat_" + Date.now();
    }
    // Save current conversation HTML
    conversationHistory[activeConversationId] = chatMessages.innerHTML;
    // Create a new history item if one doesn't exist yet
    let exists = false;
    const historyItems = document.querySelectorAll(".chat-history-item");
    historyItems.forEach((item) => {
      if (item.getAttribute("data-convo-id") === activeConversationId) {
        exists = true;
      }
    });
    if (!exists) {
      const timestamp = new Date().toLocaleTimeString();
      const historyItem = document.createElement("div");
      historyItem.classList.add("chat-history-item");
      historyItem.textContent = "Chat " + timestamp;
      historyItem.setAttribute("data-convo-id", activeConversationId);
      historyItem.addEventListener("click", () => {
        // Save current conversation before switching.
        conversationHistory[activeConversationId] = chatMessages.innerHTML;
        const convoId = historyItem.getAttribute("data-convo-id");
        chatMessages.innerHTML = conversationHistory[convoId] || "";
        activeConversationId = convoId;
      });
      const todaySection = document.getElementById("todaySection");
      todaySection.appendChild(historyItem);
    }
  }
  // Clear the chat area for a new conversation and set a new active conversation ID.
  chatMessages.innerHTML = "";
  activeConversationId = "chat_" + Date.now();
});

// Sidebar search functionality: filter chat-history items by text
const sidebarSearch = document.getElementById("sidebarSearch");
const searchBtn = document.getElementById("searchBtn");

function filterChats() {
  const filter = sidebarSearch.value.toLowerCase();
  const items = document.querySelectorAll(".chat-history-item");
  items.forEach((item) => {
    item.style.display = item.textContent.toLowerCase().includes(filter)
      ? "block"
      : "none";
  });
}

sidebarSearch.addEventListener("input", filterChats);
searchBtn.addEventListener("click", filterChats);
