// Fake data for appointments in Patient Dashboard
const fakeAppointments = [
  {
    date: "2025-04-15",
    time: "10:00 AM",
    location: "Room 101",
    doctor: "Dr. Smith",
    description: "General check-up appointment.",
  },
  {
    date: "2025-04-20",
    time: "2:30 PM",
    location: "Room 202",
    doctor: "Dr. Johnson",
    description: "Follow-up consultation regarding blood test results.",
  },
];

// Function to hide all content sections
function hideAllSections() {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
}

// Function to show a specific content section by its ID
function showSection(sectionId) {
  hideAllSections();
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "block";
  }
  // Remove any dynamic appointments details if switching away
  const dynamicAppts = document.getElementById("appointmentsSection");
  if (dynamicAppts) {
    dynamicAppts.remove();
    const trigger = document.getElementById("showAppointmentsTrigger");
    if (trigger) {
      trigger.innerHTML = "<h2>Show Appointments</h2>";
    }
  }
}

// Set up sidebar navigation event listeners
const navLinks = document.querySelectorAll("#navbarList a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute("data-section");
    showSection(sectionId);
  });
});

// Toggle the display of the appointment details inside Upcoming Appointments
const showAppointmentsTrigger = document.getElementById(
  "showAppointmentsTrigger"
);
if (showAppointmentsTrigger) {
  showAppointmentsTrigger.addEventListener("click", function () {
    let appointmentsSection = document.getElementById("appointmentsSection");
    if (appointmentsSection) {
      // If already visible, remove it and update trigger text
      appointmentsSection.remove();
      showAppointmentsTrigger.innerHTML = "<h2>Show Appointments</h2>";
    } else {
      // Create the appointments details section
      appointmentsSection = document.createElement("div");
      appointmentsSection.setAttribute("id", "appointmentsSection");
      appointmentsSection.className = "dashboard-section appointments-section";

      // Optional header for clarity
      let header = document.createElement("h2");
      header.textContent = "Upcoming Appointments Details";
      appointmentsSection.appendChild(header);

      // Populate with fake appointment data
      fakeAppointments.forEach((appt) => {
        const item = document.createElement("div");
        item.className = "appointment-item";
        item.innerHTML = `
            <p><strong>Date:</strong> ${appt.date}</p>
            <p><strong>Time:</strong> ${appt.time}</p>
            <p><strong>Location:</strong> ${appt.location}</p>
            <p><strong>Doctor:</strong> ${appt.doctor}</p>
            <p><strong>Description:</strong> ${appt.description}</p>
          `;
        // Create Cancel Appointment button
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel Appointment";
        cancelButton.addEventListener("click", function () {
          item.style.transition = "opacity 0.5s";
          item.style.opacity = 0;
          setTimeout(() => {
            item.remove();
          }, 500);
        });
        item.appendChild(cancelButton);
        appointmentsSection.appendChild(item);
      });

      // Insert the appointments details section right after the trigger
      showAppointmentsTrigger.parentNode.insertBefore(
        appointmentsSection,
        showAppointmentsTrigger.nextSibling
      );
      // Update trigger text
      showAppointmentsTrigger.innerHTML = "<h2>Hide Appointments</h2>";
    }
  });
}

function editProfileDetails() {
  // Enable editing for profile details fields
  let fields = [
    "profileName",
    "profileEmail",
    "profilePhone",
    "profileAddress",
  ];
  fields.forEach(function (id) {
    let element = document.getElementById(id);
    if (element) {
      element.contentEditable = "true";
      element.style.border = "1px solid #ccc"; // Visual cue that the field is editable
    }
  });
}

function saveProfileDetails() {
  // Disable editing for profile details fields and "save" the data
  let fields = [
    "profileName",
    "profileEmail",
    "profilePhone",
    "profileAddress",
  ];
  fields.forEach(function (id) {
    let element = document.getElementById(id);
    if (element) {
      element.contentEditable = "false";
      element.style.border = "none";
    }
  });
  alert("Profile details saved!");
}

function editMedicalInfo() {
  // Enable editing for medical information fields
  let fields = ["medications", "allergies", "lastCheckup", "height", "weight"];
  fields.forEach(function (id) {
    let element = document.getElementById(id);
    if (element) {
      element.contentEditable = "true";
      element.style.border = "1px solid #ccc";
    }
  });
}

function saveMedicalInfo() {
  // Disable editing for medical information fields and "save" the data
  let fields = ["medications", "allergies", "lastCheckup", "height", "weight"];
  fields.forEach(function (id) {
    let element = document.getElementById(id);
    if (element) {
      element.contentEditable = "false";
      element.style.border = "none";
    }
  });
  alert("Medical information saved!");
}

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
load_components();

setUserName("rodin");

function getUserNameAndDisplay(x) {
  const userName = localStorage.getItem("user_name");
  if (userName) {
    // Assign the retrieved user name to the element with id "x"
    document.getElementById(x).textContent = userName;
  } else {
    // If there is no user name in local storage, show a default message
    document.getElementById(x).textContent = "Not logged in";
  }
}

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

//
