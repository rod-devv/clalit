let path_components = "components/";
let sections_folder = "main_sections/";

// ------------------- IMPORT COMPONENTS --------------------
function load_components() {
  let arr_components = ["topbar", "footer", "sidebar"];
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

load_components();

// Wait for the entire page to load
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // Ensure the form is available before adding event listener
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form from submitting

      // Get the values of the input fields
      const email = document.getElementById("email").value;
      const name = document.getElementById("name").value;
      const message = document.getElementById("message").value;

      // Check if any field is empty and show an alert accordingly
      if (email === "" || name === "" || message === "") {
        if (email === "") {
          alert("You need to fill the email input.");
        } else if (name === "") {
          alert("You need to fill the name input.");
        } else if (message === "") {
          alert("You need to fill the message input.");
        }
      } else {
        // All fields are filled, show the success message
        alert("We will reply to you very soon.");
        // Optionally, reset the form or handle the form submission here
        form.reset(); // This will clear the form inputs after submission
      }
    });
  } else {
    console.log("Form element not found.");
  }
});
