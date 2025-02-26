// translator.js

// ===========================
// Configuration - Replace with your Azure credentials
// ===========================
const subscriptionKey =
  "5SKjdSwh7sOG8GpgMowzvIVzDBRUma8KkDzyqhzAN3Q4V0F5YJldJQQJ99BBAC8vTInXJ3w3AAAbACOGOrOo"; // Replace with key1 (or key2)
const region = "westus2"; // Replace with your resource's region (e.g., "westus2")
const endpoint = "https://api.cognitive.microsofttranslator.com/";

// ========== GLOBAL REGISTRY ==========
let textNodeRegistry = [];

// ========== UTILITY FUNCTION ==========
// Recursively collects all text nodes from a given node,
// ignoring nodes within SCRIPT, STYLE, NOSCRIPT,
// and also skipping text nodes that are inside language buttons.
function getTextNodes(node) {
  let textNodes = [];
  const ignoreTags = ["SCRIPT", "STYLE", "NOSCRIPT"];
  if (ignoreTags.includes(node.nodeName)) return textNodes;

  // If this is a text node with non-empty text...
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
    // Check if its parent element is a language button (has class "topside-btn").
    if (
      node.parentElement &&
      node.parentElement.classList.contains("topside-btn")
    ) {
      // Skip this text node so we don't translate the language options.
      return textNodes;
    }
    textNodes.push(node);
  } else {
    // Otherwise, recursively check child nodes.
    node.childNodes.forEach((child) => {
      textNodes = textNodes.concat(getTextNodes(child));
    });
  }
  return textNodes;
}

// ========== INITIALIZATION ==========
function initTextNodes() {
  // Clear any existing registry.
  textNodeRegistry = [];
  // Collect all text nodes from document.body.
  const nodes = getTextNodes(document.body);
  nodes.forEach((node) => {
    // Store the original text (if not already stored) in a custom property.
    if (typeof node._originalText === "undefined") {
      node._originalText = node.nodeValue;
    }
    textNodeRegistry.push(node);
  });
  console.log("Initialized text nodes:", textNodeRegistry.length);
}

// ========== TRANSLATION FUNCTION ==========
async function translatePage(targetLang) {
  // Initialize registry if it hasn't been set yet.
  if (!textNodeRegistry.length) {
    initTextNodes();
  }
  // Use the stored original text for translation.
  const textsToTranslate = textNodeRegistry.map((node) => node._originalText);
  if (textsToTranslate.length === 0) return;

  const url = `${endpoint}/translate?api-version=3.0&to=${targetLang}`;
  const requestBody = textsToTranslate.map((text) => ({ Text: text }));

  console.log("Requesting translation to", targetLang);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Ocp-Apim-Subscription-Region": region,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Translation API error: " + response.statusText);
    }

    const data = await response.json();
    console.log("Translation response received:", data);

    // Update each text node with its translated version.
    data.forEach((item, index) => {
      if (item.translations && item.translations.length > 0) {
        textNodeRegistry[index].nodeValue = item.translations[0].text;
      }
    });
  } catch (error) {
    console.error("Error during translation:", error);
  }
}

// ========== LANGUAGE BUTTON HANDLING ==========
const langMap = {
  العربية: "ar",
  Русский: "ru",
  English: "en",
  עברית: "he",
};

// function attachLangListeners() {
//   const langButtons = document.querySelectorAll(".topbar-left .topside-btn");
//   if (!langButtons.length) {
//     console.warn("No language buttons found inside .topbar-left");
//     return;
//   }
//   langButtons.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const buttonText = this.textContent.trim();
//       const langCode = langMap[buttonText];
//       if (langCode) {
//         console.log(`Translating page to ${langCode}...`);
//         translatePage(langCode);
//       } else {
//         console.warn(`No language code mapped for: ${buttonText}`);
//       }
//     });
//   });
// }

function attachLangListeners() {
  const langButtons = document.querySelectorAll(".topbar-left .topside-btn");
  if (!langButtons.length) {
    console.warn("No language buttons found inside .topbar-left");
    return;
  }
  langButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const buttonText = this.textContent.trim();
      const langCode = langMap[buttonText];
      if (langCode) {
        // Save the selected language
        localStorage.setItem("targetLanguage", langCode);
        console.log(`Translating page to ${langCode}...`);
        translatePage(langCode);
      } else {
        console.warn(`No language code mapped for: ${buttonText}`);
      }
    });
  });
}

// // ========== OBSERVE TOPBAR ==========
// function observeTopbar() {
//   const topbar = document.getElementById("topbar");
//   if (!topbar) {
//     console.error("No element with id 'topbar' found.");
//     return;
//   }

//   const observer = new MutationObserver((mutationsList, observerInstance) => {
//     // When the topbar has loaded content (for example, an element with class .topbar-left)
//     if (topbar.querySelector(".topbar-left")) {
//       console.log("Topbar loaded. Attaching language button listeners.");
//       attachLangListeners();
//       observerInstance.disconnect();
//       // Also initialize text nodes once the topbar and other components are loaded.
//       initTextNodes();
//     }
//   });

//   observer.observe(topbar, { childList: true, subtree: true });
// }

function observeTopbar() {
  const topbar = document.getElementById("topbar");
  if (!topbar) {
    console.error("No element with id 'topbar' found.");
    return;
  }

  const observer = new MutationObserver((mutationsList, observerInstance) => {
    // When the topbar has loaded content (e.g., an element with class .topbar-left)
    if (topbar.querySelector(".topbar-left")) {
      console.log("Topbar loaded. Attaching language button listeners.");
      attachLangListeners();
      observerInstance.disconnect();
      // Initialize text nodes once the topbar and other components are loaded.
      initTextNodes();

      // Check for a saved language and translate if one exists.
      const savedLang = localStorage.getItem("targetLanguage");
      if (savedLang) {
        console.log("Saved language found, translating page to " + savedLang);
        translatePage(savedLang);
      }
    }
  });

  observer.observe(topbar, { childList: true, subtree: true });
}

// ========== INITIALIZATION ON DOM LOAD ==========
// document.addEventListener("DOMContentLoaded", function () {
//   observeTopbar();
// });

document.addEventListener("DOMContentLoaded", function () {
  observeTopbar();
});
