// Set the user role to "admin" for this page
var userRole = "admin";

// Hide all dashboards initially (only adminDashboard exists on this page)
var dashboards = document.querySelectorAll(".dashboard");
dashboards.forEach((dashboard) => dashboard.classList.remove("active"));

var activeDashboard;
if (userRole === "admin") {
  activeDashboard = document.getElementById("adminDashboard");
}
if (activeDashboard) {
  activeDashboard.classList.add("active");

  // Dynamically populate the left sidebar with navigation items
  var navList = document.getElementById("navbarList");
  var sections = activeDashboard.querySelectorAll(".dashboard-section");

  sections.forEach((section, index) => {
    var titleElement = section.querySelector(".section-title");
    var iconElement = section.querySelector(".section-icon i");

    console.log("titleElement= ", titleElement, iconElement);
    if (titleElement && iconElement) {
      // Use the data-sidebar-title attribute if available
      var titleText =
        section.getAttribute("data-sidebar-title") || titleElement.textContent;
      var sectionId = "section" + index;
      section.setAttribute("id", sectionId);
      // Show only the first section initially; hide the others
      section.style.display = index === 0 ? "block" : "none";

      // Create sidebar navigation item with icon
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#";
      a.textContent = titleText;
      a.setAttribute("data-section", sectionId);
      a.addEventListener("click", function (event) {
        event.preventDefault();
        showSection(sectionId);
      });

      // Add the icon to the sidebar item
      var iconClone = iconElement.cloneNode(true);
      iconClone.style.marginRight = "10px";
      a.prepend(iconClone);

      li.appendChild(a);
      navList.appendChild(li);
    }
  });
}

// Function to display only the selected section
function showSection(sectionId) {
  var allSections = activeDashboard.querySelectorAll(".dashboard-section");
  allSections.forEach((section) => (section.style.display = "none"));

  var selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";
  }
}

// Dummy functions for user management actions using fake data
function editUser(userId) {
  alert("Edit user with ID " + userId);
}
function deleteUser(userId) {
  alert("Delete user with ID " + userId);
}
function suspendUser(userId) {
  alert("Suspend user with ID " + userId);
}

// Function to filter the user table based on the selected role
function filterUsers() {
  var filterValue = document.getElementById("roleFilter").value;
  var rows = document.querySelectorAll("#userTableBody tr");

  rows.forEach(function (row) {
    var role = row.getAttribute("data-role");
    if (filterValue === "all" || role === filterValue) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// -------- Import Components (e.g., topbar) --------
function load_components() {
  let arr_components = ["topbar-sub"];
  for (let i = 0; i < arr_components.length; i++) {
    let path = "../components/" + arr_components[i] + ".html";
    import_html(path, arr_components[i]);
  }
}
function import_html(path, name) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(name).innerHTML = html;
    });
}
load_components();
