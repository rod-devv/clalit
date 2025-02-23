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

// User role can be "admin", "patient", or "doctor"
var userRole = "patient";

// Hide all dashboards initially
var dashboards = document.querySelectorAll(".dashboard");
dashboards.forEach((dashboard) => dashboard.classList.remove("active"));

var activeDashboard;
if (userRole === "admin") {
  activeDashboard = document.getElementById("adminDashboard");
} else if (userRole === "patient") {
  activeDashboard = document.getElementById("patientDashboard");
} else if (userRole === "doctor") {
  activeDashboard = document.getElementById("doctorDashboard");
}

if (activeDashboard) {
  activeDashboard.classList.add("active");

  // Populate the sidebar dynamically with each dashboard section
  var navList = document.getElementById("navbarList");
  var sections = activeDashboard.querySelectorAll(".dashboard-section");

  sections.forEach((section, index) => {
    var titleElement = section.querySelector(".section-title");
    var iconElement = section.querySelector(".section-icon i");
    if (titleElement && iconElement) {
      var titleText = titleElement.textContent;
      var sectionId = "section" + index;
      section.setAttribute("id", sectionId);
      // Show only the first section initially; hide others
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

  // If patient dashboard, add a new section labeled "Show Appointments"
  if (userRole === "patient") {
    const upcomingSection = activeDashboard.querySelector(
      "#upcomingAppointmentsSection"
    );
    if (upcomingSection && upcomingSection.parentNode) {
      // Create the trigger section for showing appointments
      const showAppointmentsTrigger = document.createElement("div");
      showAppointmentsTrigger.setAttribute("id", "showAppointmentsTrigger");
      showAppointmentsTrigger.className =
        "dashboard-section show-appointments-trigger";
      // This section reads "Show Appointments" initially
      showAppointmentsTrigger.innerHTML = "<h2>Show Appointments</h2>";

      // Insert the trigger immediately after the upcoming appointments section
      upcomingSection.parentNode.insertBefore(
        showAppointmentsTrigger,
        upcomingSection.nextSibling
      );

      // Add an event listener to toggle the appointment details section
      showAppointmentsTrigger.addEventListener("click", function () {
        let appointmentsSection = document.getElementById(
          "appointmentsSection"
        );
        if (appointmentsSection) {
          // If already visible, remove it and update trigger text
          appointmentsSection.remove();
          showAppointmentsTrigger.innerHTML = "<h2>Show Appointments</h2>";
        } else {
          // Create a new section element for the appointment details
          appointmentsSection = document.createElement("div");
          appointmentsSection.setAttribute("id", "appointmentsSection");
          appointmentsSection.className =
            "dashboard-section appointments-section";

          // Optional header for clarity
          let header = document.createElement("h2");
          header.textContent = "Upcoming Appointments Details";
          appointmentsSection.appendChild(header);

          // Populate the appointments details section with fake data
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
            // Create a Cancel Appointment button for each appointment
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

          // Update the trigger text to "Hide Appointments"
          showAppointmentsTrigger.innerHTML = "<h2>Hide Appointments</h2>";
        }
      });
    } else {
      console.error(
        "upcomingAppointmentsSection not found within patientDashboard"
      );
    }
  }
}

// Function to show only the selected dashboard section and remove any generated details
function showSection(sectionId) {
  var allSections = activeDashboard.querySelectorAll(".dashboard-section");
  allSections.forEach((section) => (section.style.display = "none"));
  // Remove any dynamically added appointments or trigger sections if present
  const appointmentsSection = document.getElementById("appointmentsSection");
  if (appointmentsSection) {
    appointmentsSection.remove();
  }
  const showAppointmentsTrigger = document.getElementById(
    "showAppointmentsTrigger"
  );
  if (showAppointmentsTrigger) {
    showAppointmentsTrigger.style.display = "none";
  }
  var selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";
  }
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
