// Sample user data
let users = [
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

  {
    id: 4,
    name: "Jane Smith",
    role: "Doctor",
    email: "jane.smith@example.com",
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

      let id_element = "profie-tab-title";

      if (name === "topbar-sub") {
        getUserNameAndDisplay(id_element); // Display username
        updateTime(); // Update time immediately
        setInterval(updateTime, 1000);
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

// function setUserName(userName) {
//   localStorage.setItem("user_name", userName);
// }

// --------------------- Time Update Function ---------------------
function updateTime() {
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth() + 1;
  var year = now.getFullYear();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Pad single digits with a leading zero
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Format the date as DD.MM.YYYY | HH:MM
  var formattedDate =
    day + "." + month + "." + year + " | " + hours + ":" + minutes;
  document.getElementById("title-date").innerText = formattedDate;

  // Set greeting based on current hour
  var greeting = "";
  if (hours >= 5 && hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
  } else if (hours >= 17 && hours < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  document.getElementById("title-time").innerText = greeting;
}

// ------------------------------------------------
// Section 1: Patient vs Doctor Stats
// -----------------------------------------------------
function showPatientDoctorStats() {
  const container = document.createElement("div");
  container.classList.add("dashboard-section");
  container.id = "patientDoctorStats";
  container.innerHTML = `
          <div class="section-title">Patient vs Doctor Stats</div>
          <div class="section-content stats">
            <!-- Custom Legend Container -->
            <div id="customLegendPatient"></div>
            <!-- Chart Container -->
            <div class="chart-container">
              <canvas id="pieChartPatient"></canvas>
            </div>
          </div>

          <br> <br> 
        `;
  return container;
}

function renderPatientDoctorStats() {
  const doctorCount = users.filter((u) => u.role === "Doctor").length;
  const patientCount = users.filter((u) => u.role === "Patient").length;
  const total = doctorCount + patientCount;

  const ctx = document.getElementById("pieChartPatient").getContext("2d");

  const legendCallback = function (chart) {
    let text =
      '<ul style="list-style: none; padding: 0; margin: 0; display: flex; justify-content: center;">';
    chart.data.labels.forEach(function (label, index) {
      text += `<li style="margin: 0 10px; text-align: center;">
                      <div style="font-size: 14px; margin-bottom: 5px;">${label}</div>
                      <div style="width: 40px; height: 20px; background: ${chart.data.datasets[0].backgroundColor[index]}; margin: 0 auto;"></div>
                    </li>`;
    });
    text += "</ul>";
    return text;
  };

  const myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Doctors " + ((doctorCount / total) * 100).toFixed(2) + "%",
        "Patients " + ((patientCount / total) * 100).toFixed(2) + "%",
      ],
      datasets: [
        {
          data: [doctorCount, patientCount],
          backgroundColor: ["#aa00ff", "#334466"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });

  document.getElementById("customLegendPatient").innerHTML =
    legendCallback(myChart);
}

// -----------------------------------------------------
// Section 2: Doctor Stats by Category (Expertise or Location)
// -------------------------------------------------------------
const doctorsData = [
  {
    id: "1",
    expertise: "Cardiology",
    location: "Hospital A",
    workingTime: [
      { day: "Monday", start_time: "08:00", end_time: "16:00" },
      { day: "Tuesday", start_time: "08:00", end_time: "16:00" },
      { day: "Wednesday", start_time: "08:00", end_time: "16:00" },
      { day: "Thursday", start_time: "08:00", end_time: "16:00" },
      { day: "Friday", start_time: "08:00", end_time: "16:00" },
    ],
    appointments: [],
  },
  {
    id: "2",
    expertise: "Dermatology",
    location: "Hospital B",
    workingTime: [
      { day: "Monday", start_time: "10:00", end_time: "18:00" },
      { day: "Wednesday", start_time: "10:00", end_time: "18:00" },
      { day: "Friday", start_time: "10:00", end_time: "18:00" },
    ],
    appointments: [],
  },
  {
    id: "3",
    expertise: "Neurology",
    location: "Hospital C",
    workingTime: [
      { day: "Tuesday", start_time: "09:00", end_time: "17:00" },
      { day: "Thursday", start_time: "09:00", end_time: "17:00" },
    ],
    appointments: [],
  },
  {
    id: "4",
    expertise: "Pediatrics",
    location: "Hospital D",
    workingTime: [
      { day: "Monday", start_time: "08:30", end_time: "16:30" },
      { day: "Tuesday", start_time: "08:30", end_time: "16:30" },
      { day: "Thursday", start_time: "08:30", end_time: "16:30" },
      { day: "Friday", start_time: "08:30", end_time: "16:30" },
    ],
    appointments: [],
  },
  {
    id: "5",
    expertise: "Orthopedics",
    location: "Hospital E",
    workingTime: [
      { day: "Monday", start_time: "08:00", end_time: "14:00" },
      { day: "Wednesday", start_time: "08:00", end_time: "14:00" },
      { day: "Friday", start_time: "08:00", end_time: "14:00" },
    ],
    appointments: [],
  },
  {
    id: "6",
    expertise: "Cardiology",
    location: "Hospital F",
    workingTime: [
      { day: "Monday", start_time: "09:00", end_time: "17:00" },
      { day: "Thursday", start_time: "09:00", end_time: "17:00" },
    ],
    appointments: [],
  },
  {
    id: "7",
    expertise: "Dermatology",
    location: "Hospital G",
    workingTime: [
      { day: "Tuesday", start_time: "11:00", end_time: "19:00" },
      { day: "Thursday", start_time: "11:00", end_time: "19:00" },
    ],
    appointments: [],
  },
  {
    id: "8",
    expertise: "Neurology",
    location: "Hospital H",
    workingTime: [
      { day: "Monday", start_time: "07:00", end_time: "15:00" },
      { day: "Wednesday", start_time: "07:00", end_time: "15:00" },
      { day: "Friday", start_time: "07:00", end_time: "15:00" },
    ],
    appointments: [],
  },
  {
    id: "9",
    expertise: "Pediatrics",
    location: "Hospital I",
    workingTime: [
      { day: "Monday", start_time: "10:00", end_time: "18:00" },
      { day: "Thursday", start_time: "10:00", end_time: "18:00" },
    ],
    appointments: [],
  },
  {
    id: "10",
    expertise: "Orthopedics",
    location: "Hospital J",
    workingTime: [
      { day: "Tuesday", start_time: "09:30", end_time: "17:30" },
      { day: "Thursday", start_time: "09:30", end_time: "17:30" },
    ],
    appointments: [],
  },
];

function createDoctorStatsContainer() {
  const container = document.createElement("div");
  container.classList.add("dashboard-section");
  container.id = "doctorStats";

  // Create and append the dropdown
  const dropdown = document.createElement("select");
  dropdown.classList.add("dropdown");
  dropdown.innerHTML = `
          <option value="expertise">Expertise</option>
          <option value="location">Location</option>
        `;
  dropdown.addEventListener("change", (event) => {
    renderDoctorStats(event.target.value);
  });
  container.appendChild(dropdown);

  // Container for chart and legend
  const statsDiv = document.createElement("div");
  statsDiv.id = "doctorStatsContent";
  container.appendChild(statsDiv);

  return container;
}

function renderDoctorStats(category) {
  const statsDiv = document.getElementById("doctorStatsContent");
  statsDiv.innerHTML = `
          <div class="section-title"> <p style="text-align:center;">Doctor Stats by ${category}</p></div>
          <div class="section-content stats">
            <!-- Custom Legend Container -->
            <div id="customLegendDoctor"></div>
            <!-- Chart Container -->
            <div class="chart-container">
              <canvas id="pieChartDoctor"></canvas>
            </div>
          </div>
        `;

  // Calculate counts by category
  const counts = doctorsData.reduce((acc, doctor) => {
    acc[doctor[category]] = (acc[doctor[category]] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  const ctx = document.getElementById("pieChartDoctor").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels.map((label) => `${label} (${counts[label]})`),
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#334466",
            "#882211",
            "#336677",
            "#225599",
            "#665566",
            "#334466",
            "#882211",
            "#336677",
            "#225599",
            "#665566",
            "#334466",
            "#882211",
            "#336677",
            "#225599",
            "#665566",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });

  const legendCallback = function (chart) {
    let text =
      '<ul style="list-style: none; padding: 0; margin: 0; display: flex; justify-content: center;">';
    chart.data.labels.forEach(function (label, index) {
      text += `<li style="margin: 0 10px; text-align: center;">
                      <div style="font-size: 14px; margin-bottom: 5px;">${label}</div>
                      <div style="width: 40px; height: 20px; background: ${chart.data.datasets[0].backgroundColor[index]}; margin: 0 auto;"></div>
                    </li>`;
    });
    text += "</ul>";
    return text;
  };

  document.getElementById("customLegendDoctor").innerHTML =
    legendCallback(myChart);
}

// func(): Called when user clicks on the Stats link

function showStats() {
  const dashboard = document.getElementById("dashboardContent");
  dashboard.innerHTML = ""; // Clear any existing content

  // Append patient vs doctor stats section
  const patientDoctorSection = showPatientDoctorStats();
  dashboard.appendChild(patientDoctorSection);
  renderPatientDoctorStats();

  // Append a line divider between the sections
  const lineDivider = document.createElement("div");
  // lineDivider.classList.add("temp-line");
  lineDivider.style.height = "1px";
  lineDivider.style.width = "100%";
  lineDivider.style.backgroundColor = "#aaaaaa";
  lineDivider.style.marginBottom = "20px"; // Adds more space below the line

  dashboard.appendChild(lineDivider);

  // Append doctor stats section
  const doctorStatsSection = createDoctorStatsContainer();
  dashboard.appendChild(doctorStatsSection);
  renderDoctorStats("expertise"); // default to expertise stats
}
