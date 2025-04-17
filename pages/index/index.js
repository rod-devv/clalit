const path_components = "components/";
const sections_folder = "main_sections/";

// ---------------- IMPORT SECTIONS/PARTS ------------
function load_sections() {
  const arr_sections = ["1", "2", "4", "3", "5", "7"];
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
  const arr_components = ["topbar", "footer", "second-topbar"];
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

      if (name === "section-section4") {
        initializeSection4(); // Initialize transitions for section 4
      }

      // If the topbar is loaded, update the user-name title
      // if (name === "topbar") {
      //   setTitle();
      // }

      // If the topbar is loaded, update the user-name title

      let id_element = "user-name";
      if (name === "topbar") {
        getUserNameAndDisplay(id_element); // Ensure this function runs once topbar is loaded
      }
    });
}

function getUserNameAndDisplay(x) {
  const userName = localStorage.getItem("user_name");
  console.log("user ==> ", userName);
  if (userName) {
    // Assign the retrieved user name to the element with id "x"
    document.getElementById(x).textContent = userName;
  } else {
    // If there is no user name in local storage, show a default message
    document.getElementById(x).textContent = "Not logged in";
  }
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

// Function to reinitialize the transitions and animations for the section
function initializeSection4() {
  const descriptions = [
    "Transparent",
    "24/7 Access",
    "Free",
    "User-friendly",
    "Reliable",
    "Efficient",
    "Fast",
    "Smart",
    "Latest Tech",
    "Secure",
    "Expert",
    "Convenient",
    "Innovative",
    "Scalable",
    "Easy-to-use",
    "Time-saving",
    "Seamless experience",
    "Cost-effective",
    "Accessible",
    "Real-time updates",
    "High performance",
    "Data-driven",
    "Trusted",

    "Interactive",
    "Automated",
    "Intuitive",
    "Multilingual",
    "Privacy-focused",
    "Low maintenance",
    "Cross-platform",
  ];

  let index = 0;

  function changeDescriptions() {
    // Fade out the descriptions
    document.getElementById("desc1").style.opacity = 0;
    document.getElementById("desc2").style.opacity = 0;
    document.getElementById("desc3").style.opacity = 0;

    // Wait for the fade out to complete (0.5s transition duration)
    setTimeout(function () {
      // Change content for each description div
      document.getElementById("desc1").textContent =
        descriptions[index % descriptions.length];
      document.getElementById("desc2").textContent =
        descriptions[(index + 1) % descriptions.length];
      document.getElementById("desc3").textContent =
        descriptions[(index + 2) % descriptions.length];

      // Fade them back in
      document.getElementById("desc1").style.opacity = 1;
      document.getElementById("desc2").style.opacity = 1;
      document.getElementById("desc3").style.opacity = 1;

      index += 3; // Move to the next set of descriptions
    }, 500); // Wait for 0.5s before changing text
  }

  // Run the function immediately and then every 4 seconds
  changeDescriptions();
  setInterval(changeDescriptions, 3000);
}

// Ensure the DOM is fully loaded before importing components and sections
document.addEventListener("DOMContentLoaded", () => {
  load_sections();
  load_components();
});
