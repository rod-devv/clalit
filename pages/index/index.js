const path_components = "components/";
const sections_folder = "main_sections/";

// ---------------- IMPORT SECTIONS/PARTS ------------
function load_sections() {
  const arr_sections = ["1", "2", "3", "4", "5", "6", "7"];
  for (let i = 0; i < arr_sections.length; i++) {
    let path =
      "../../" +
      path_components +
      sections_folder +
      "s" +
      arr_sections[i] +
      ".html";
    let name = "section-section" + arr_sections[i];
    import_html(path, name);
  }
}

// ------------------- IMPORT COMPONENTS --------------------
function load_components() {
  const arr_components = ["topbar", "footer", "sidebar", "second-topbar"];
  for (let i = 0; i < arr_components.length; i++) {
    let path = "../../" + path_components + arr_components[i] + ".html";
    let name = arr_components[i];
    import_html(path, name);
  }
}

// ----- helper function to import HTML -------------
function import_html(path, name) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(name).innerHTML = html;
      // If the topbar is loaded, update the user-name title
      if (name === "topbar") {
        setTitle();
      }
    });
}

// ---------------- Local Storage Functions ----------------
function setUserRole(role) {
  // Always stringify the role value
  localStorage.setItem("userRole", JSON.stringify(role));
}

function getUserRole() {
  const userRole = localStorage.getItem("userRole");
  try {
    return JSON.parse(userRole);
  } catch (error) {
    console.error("Error parsing userRole:", error);
    return null;
  }
}

// Ensure the DOM is fully loaded before importing components and sections
document.addEventListener("DOMContentLoaded", () => {
  load_sections();
  load_components();
});
