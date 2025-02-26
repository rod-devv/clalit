// Sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    role: "Patient",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Doctor",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Admin User",
    role: "Admin",
    email: "admin.user@example.com",
  },
];

// Show User Management view
function showUserManagement() {
  const dashboard = document.getElementById("dashboardContent");
  dashboard.innerHTML = `


         <div class="right-top">
          <div class="section-title">
            <br /><br />
            <i class="fa-solid fa-users"></i> User Management
          </div>
          <ul>
            <li>
              View comprehensive lists of patients, doctors, and other admins.
            </li>
            <li>Edit user details and update roles or permissions.</li>
            <li>Delete or suspend user accounts as needed.</li>
          </ul>
        </div>
          <div class="dashboard-section" id="user-management">
            
            <div class="section-content">
              <div class="filter-bar">
                <label for="roleFilter">Filter by Role:</label>
                <select id="roleFilter" onchange="filterUsers()">
                  <option value="all">All</option>
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="userTableBody">
                  ${users
                    .map(
                      (user) => `
                    <tr data-role="${user.role}">
                      <td>${user.id}</td>
                      <td>${user.name}</td>
                      <td>${user.role}</td>
                      <td>${user.email}</td>
                      <td class="action-buttons">
                        <button class="edit" onclick="editUser(${user.id})">Edit</button>
                        <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
                        <button class="promote" onclick="promoteUser(${user.id})">Promote</button>
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;
}

// Show Stats view
function showStats() {
  const dashboard = document.getElementById("dashboardContent");
  // Calculate stats based on sample data
  const doctorCount = users.filter(
    (u) => u.role === "Doctor" || u.role === "Admin"
  ).length;
  const patientCount = users.filter((u) => u.role === "Patient").length;
  dashboard.innerHTML = `
          <div class="dashboard-section" id="stats">
            <div class="section-title"><i class="fa-solid fa-chart-line"></i> Stats</div>
            <div class="section-content stats">
              <div class="stat-card">
                <h2>Doctors</h2>
                <p>${doctorCount}</p>
              </div>
              <div class="stat-card">
                <h2>Patients</h2>
                <p>${patientCount}</p>
              </div>
            </div>
          </div>
        `;
}

// Filter users based on dropdown selection
function filterUsers() {
  const filter = document.getElementById("roleFilter").value;
  const rows = document
    .getElementById("userTableBody")
    .getElementsByTagName("tr");
  Array.from(rows).forEach((row) => {
    const role = row.getAttribute("data-role");
    if (filter === "all" || role === filter) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Edit user: Simulate navigation to an edit page
function editUser(id) {
  alert("Navigate to edit page for user ID: " + id);
}

// Delete user: Remove the user from the data and refresh view
function deleteUser(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    showUserManagement();
  }
}

// Promote user: Change role to Admin and refresh view
function promoteUser(id) {
  const user = users.find((u) => u.id === id);
  if (user) {
    user.role = "Admin";
    showUserManagement();
  }
}

// Initialize with User Management view
showUserManagement();

let path_components = "components/";
let sections_folder = "main_sections/";

// ------------------- IMPORT COMPONENTS --------------------
function load_components() {
  let arr_components = ["topbar", "footer", "sidebar", "topbar-sub"];
  for (let i = 0; i < arr_components.length; i++) {
    let path = "../../../" + path_components + arr_components[i] + ".html";
    let name = arr_components[i];
    import_html(path, name);
  }
}

// ----- helper function to imports
function import_html(path, name) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(name).innerHTML = html;
    });
}

load_components();
