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

// // Updated fake specialists data: two specialists per expertise
// var fakeSpecialists = [
//   // Cardiology Specialists
//   {
//     id: 1,
//     name: "Dr. Cardio",
//     expertise: "cardiology",
//     address: "123 Heart St",
//     details: "Expert in heart diseases with 15 years of experience.",
//   },
//   {
//     id: 5,
//     name: "Dr. Heart",
//     expertise: "cardiology",
//     address: "222 Heart Ln",
//     details:
//       "Cardiology expert with advanced training in interventional procedures.",
//   },
//   // Neurology Specialists
//   {
//     id: 2,
//     name: "Dr. Neuro",
//     expertise: "neurology",
//     address: "456 Brain Ave",
//     details:
//       "Specialist in neurological disorders with an advanced research background.",
//   },
//   {
//     id: 6,
//     name: "Dr. Brain",
//     expertise: "neurology",
//     address: "789 Neuro St",
//     details:
//       "Leading neurologist known for innovative treatments in neurodegenerative diseases.",
//   },
//   // Dermatology Specialists
//   {
//     id: 3,
//     name: "Dr. Derm",
//     expertise: "dermatology",
//     address: "789 Skin Blvd",
//     details: "Experienced dermatologist focused on skin care and treatment.",
//   },
//   {
//     id: 7,
//     name: "Dr. Skin",
//     expertise: "dermatology",
//     address: "321 Derm Ave",
//     details:
//       "Dermatologist with expertise in cosmetic dermatology and skin cancer prevention.",
//   },
//   // Pediatrics Specialists
//   {
//     id: 4,
//     name: "Dr. Child",
//     expertise: "pediatrics",
//     address: "101 Kid Rd",
//     details: "Pediatrician dedicated to child health and wellness.",
//   },
//   {
//     id: 8,
//     name: "Dr. Kid",
//     expertise: "pediatrics",
//     address: "555 Child Care Rd",
//     details: "Pediatric specialist committed to comprehensive child care.",
//   },
// ];

// function populateSpecialistList(specialists) {
//   const container = document.getElementById("specialistsContainer");
//   container.innerHTML = "";
//   if (specialists.length === 0) {
//     container.innerHTML = "<p>No specialists found.</p>";
//   } else {
//     specialists.forEach(function (spec) {
//       const specDiv = document.createElement("div");
//       specDiv.className = "specialist-item";
//       specDiv.style.cursor = "pointer";
//       specDiv.style.border = "1px solid #ddd";
//       specDiv.style.padding = "10px";
//       specDiv.style.marginBottom = "10px";
//       specDiv.innerHTML = `<p><strong>${spec.name}</strong> - ${spec.expertise} - ${spec.address}</p>`;
//       specDiv.addEventListener("click", function () {
//         showSpecialistDetails(spec);
//       });
//       container.appendChild(specDiv);
//     });
//   }
// }

// // Combined function to apply both filters
// function applyFilters() {
//   const expertise = document.getElementById("expertiseSelect").value;
//   const addressQuery = document
//     .getElementById("addressInput")
//     .value.toLowerCase();
//   const filtered = fakeSpecialists.filter(function (spec) {
//     const matchesExpertise = expertise === "" || spec.expertise === expertise;
//     const matchesAddress =
//       addressQuery === "" || spec.address.toLowerCase().includes(addressQuery);
//     return matchesExpertise && matchesAddress;
//   });
//   populateSpecialistList(filtered);
// }

// function showSpecialistDetails(spec) {
//   const detailsSection = document.getElementById("specialistDetails");
//   const detailsContent = document.getElementById("specialistDetailsContent");
//   detailsContent.innerHTML = `
//       <p><strong>Name:</strong> ${spec.name}</p>
//       <p><strong>Expertise:</strong> ${spec.expertise}</p>
//       <p><strong>Address:</strong> ${spec.address}</p>
//       <p><strong>Details:</strong> ${spec.details}</p>
//     `;
//   detailsSection.style.display = "block";
// }

// function closeSpecialistDetails() {
//   document.getElementById("specialistDetails").style.display = "none";
// }
