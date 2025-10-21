// console.js — a small pseudo-console that "logs in" and displays random
// messages and a short ASCII micro-animation. Works from widgets/dev-console.html

function el(id){ return document.getElementById(id); }

async function loadConsoleData() {
  try {
    const [mRes, aRes] = await Promise.all([
      fetch("../api/console/messages.json", {cache: "no-cache"}).then(r => r.ok ? r.json() : {messages: []}),
      fetch("../api/console/ascii.json", {cache: "no-cache"}).then(r => r.ok ? r.json() : {frames: []})
    ]);
    return {
      messages: Array.isArray(mRes.messages) ? mRes.messages.slice() : [],
      frames: Array.isArray(aRes.frames) ? aRes.frames.slice() : []
    };
  } catch (e) {
    console.error("DevPlayground console load error:", e);
    return { messages: ["Error loading console data."], frames: [] };
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runConsoleSequence(username) {
  const out = el("console");
  out.textContent = ""; // clear
  const { messages, frames } = await loadConsoleData();

  // Greeting
  out.textContent += `> login: ${username}\n`;
  await sleep(600);

  // Randomize message order slightly
  const msgs = messages.sort(() => 0.5 - Math.random());

  for (const msg of msgs) {
    out.textContent += `> ${msg}\n`;
    await sleep(700 + Math.floor(Math.random() * 600));
  }

  // Small ASCII animation: cycle frames with replacement (preserve spacing).
  if (frames.length) {
    out.textContent += `\n`; // spacer
    for (let i = 0; i < 6; i++) { // play a few frames
      const frame = frames[i % frames.length];
      // Replace the last block of ascii if present — to keep the output linear,
      // we append and let it scroll (matches Google Sites multiline style).
      out.textContent += `${frame}\n`;
      await sleep(450);
    }
  }

  out.textContent += `\n> Build complete. Grab more coffee. ☕\n`;
  // add a blinking cursor at the end visually by appending a small block character
  // but since pre preserves whitespace, we add nothing that breaks the style.
}

// Simple login handler
function initConsole() {
  const loginBtn = el("loginBtn");
  const usernameInput = el("username");

  loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim() || "dev";
    // disable login UI (keeps the page tidy and integrated)
    usernameInput.style.display = "none";
    loginBtn.style.display = "none";
    // start console sequence
    runConsoleSequence(username);
  });

  // Pressing Enter also triggers login
  usernameInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      loginBtn.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", initConsole);
