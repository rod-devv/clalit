let path_components = "components/";
let sections_folder = "main_sections/";

// ------------------- IMPORT COMPONENTS --------------------
function load_components() {
  let arr_components = ["topbar", "footer"];
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
