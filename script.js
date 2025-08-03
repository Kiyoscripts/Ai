const API_KEY = "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"; // Replace this

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  userInput.value = "";

  const reply = await getGPTReply(userMessage);
  appendMessage("assistant", reply);
});

function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getGPTReply(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful AI assistant named Nova." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't reply.";
}