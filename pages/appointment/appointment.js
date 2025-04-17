/***********************
 * Fake Data & Helpers *
 ***********************/

// Fake data for doctors with workingTime and pre-booked appointments.
let doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    experties: "Cardiology",
    location: "Hospital A",
    workingTime: [{ day: "Monday", start_time: "09:00", end_time: "16:00" }],
    appointments: [
      // {
      //   appointment_time: "09:40",
      //   appointment_id: "apt1",
      //
      // {
      //   appointment_time: "14:20",
      //   appointment_id: "apt2",
      //
      // },
    ],
  },
  {
    id: 2,
    name: "Dr. Ja222",
    experties: "Dermatology",
    location: "Hospital B",
    workingTime: [{ day: "Monday", start_time: "10:00", end_time: "18:00" }],
    appointments: [
      // {
      //   appointment_time: "11:20",
      //   appointment_id: "apt3",
      //
      // },
      // {
      //   appointment_time: "16:00",
      //   appointment_id: "apt4",
      //
      // },
    ],
  },

  {
    id: 3,
    name: "Dr. 333",
    experties: "kokooo",
    location: "Hospital C",
    workingTime: [{ day: "Monday", start_time: "09:00", end_time: "16:00" }],
    appointments: [
      // {
      //   appointment_time: "09:40",
      //   appointment_id: "apt1",
      //
      // },
      // {
      //   appointment_time: "14:20",
      //   appointment_id: "apt2",
      //
      // },
    ],
  },
  {
    id: 4,
    name: "Dr. 44444444",
    experties: "DODO",
    location: "Hospital B",
    workingTime: [{ day: "Monday", start_time: "10:00", end_time: "18:00" }],
    appointments: [
      // {
      //   appointment_time: "11:20",
      //   appointment_id: "apt3",
      //
      // },
      // {
      //   appointment_time: "16:00",
      //   appointment_id: "apt4",
      //
      // },
    ],
  },

  {
    id: 5,
    name: "Dr. 555555555",
    experties: "SOSO",
    location: "Hospital C",
    workingTime: [{ day: "Monday", start_time: "09:00", end_time: "16:00" }],
    appointments: [
      // {
      //   appointment_time: "09:40",
      //   appointment_id: "apt1",
      //
      // },
      // {
      //   appointment_time: "14:20",
      //   appointment_id: "apt2",
      //
      // },
    ],
  },
  {
    id: 6,
    name: "Dr. 6666666",
    experties: "QOQO",
    location: "Hospital B",
    workingTime: [{ day: "Monday", start_time: "10:00", end_time: "18:00" }],
    appointments: [
      // {
      //   appointment_time: "11:20",
      //   appointment_id: "apt3",
      //
      // },
      // {
      //   appointment_time: "16:00",
      //   appointment_id: "apt4",
      //
      // },
    ],
  },

  {
    id: 7,
    name: "Dr. 77777",
    experties: "Cardiology",
    location: "Hospital A",
    workingTime: [{ day: "Monday", start_time: "09:00", end_time: "16:00" }],
    appointments: [
      // {
      //   appointment_time: "09:40",
      //   appointment_id: "apt1",
      //
      // },
      // {
      //   appointment_time: "14:20",
      //   appointment_id: "apt2",
      //
      // },
    ],
  },
  {
    id: 8,
    name: "Dr.8888",
    experties: "Dermatology",
    location: "Hospital B",
    workingTime: [{ day: "Monday", start_time: "10:00", end_time: "18:00" }],
    appointments: [
      // {
      //   appointment_time: "11:20",
      //   appointment_id: "apt3",
      //
      // },
      // {
      //   appointment_time: "16:00",
      //   appointment_id: "apt4",
      //
      // },
    ],
  },
];

// Array to hold the appointments booked by the user.
let userAppointments = [];

// Helper functions to work with time strings.
function timeStringToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTimeString(minutes) {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;
  return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
}

// Generate slots (each 40 minutes long) between start and end times.
// A slot is valid only if (start + 40 minutes) is less than or equal to end_time.
function generateSlots(start, end) {
  let slots = [];
  let startMinutes = timeStringToMinutes(start);
  let endMinutes = timeStringToMinutes(end);
  while (startMinutes + 40 <= endMinutes) {
    slots.push(minutesToTimeString(startMinutes));
    startMinutes += 40;
  }
  return slots;
}

// --------- UI Rendering Logic  ---------------

// Populate the hospital dropdown based on doctor data.
function populateHospitalDropdown() {
  const hospitalSelect = document.getElementById("hospitalSelect");
  let hospitals = new Set();
  doctors.forEach((doc) => hospitals.add(doc.location));
  hospitals.forEach((hosp) => {
    let option = document.createElement("option");
    option.value = hosp;
    option.textContent = hosp;
    hospitalSelect.appendChild(option);
  });
}

// Render the available appointment slots based on the selected hospital.
function updateAvailableAppointments() {
  const container = document.getElementById("availableAppointments");
  container.innerHTML = "";
  const selectedHospital = document.getElementById("hospitalSelect").value;
  const selectedExpertise = document.getElementById("expertiseSelect").value;

  // Filter doctors by hospital and expertise selection.
  let filteredDoctors = doctors.filter((doc) => {
    return (
      (selectedHospital === "all" || doc.location === selectedHospital) &&
      (selectedExpertise === "all" || doc.experties === selectedExpertise)
    );
  });

  filteredDoctors.forEach((doc) => {
    let card = document.createElement("div");
    card.className = "doctor-card";

    let header = document.createElement("h3");
    header.textContent =
      doc.name + " (" + doc.experties + ") - " + doc.location;
    card.appendChild(header);

    // Loop over each working time block for this doctor.
    doc.workingTime.forEach((timeBlock) => {
      let subHeader = document.createElement("h4");
      subHeader.textContent =
        timeBlock.day +
        " (" +
        timeBlock.start_time +
        " - " +
        timeBlock.end_time +
        ")";
      card.appendChild(subHeader);

      let slotsDiv = document.createElement("div");
      slotsDiv.className = "slots";
      let slots = generateSlots(timeBlock.start_time, timeBlock.end_time);
      console.log("slots==", slots);
      console.log("doctors==", doctors);
      slots.forEach((slotTime) => {
        let slotDiv = document.createElement("div");
        slotDiv.className = "slot";
        slotDiv.textContent = slotTime;

        // Check if this slot is already occupied.
        let appointment = doc.appointments.find(
          (app) => app.appointment_time === slotTime
        );
        if (appointment) {
          if (appointment.byUser) {
            slotDiv.classList.add("user");
            let btn = document.createElement("button");
            btn.textContent = "Delete Appointment";
            btn.onclick = () =>
              deleteAppointment(doc.id, appointment.appointment_id);
            slotDiv.appendChild(document.createElement("br"));
            slotDiv.appendChild(btn);
          } else {
            slotDiv.classList.add("occupied");
            let span = document.createElement("span");
            span.textContent = " (Occupied)";
            slotDiv.appendChild(span);
          }
        } else {
          // The slot is available.
          slotDiv.classList.add("available");
          let btn = document.createElement("button");
          btn.textContent = "Make Appointment";
          btn.onclick = () => makeAppointment(doc.id, slotTime);
          slotDiv.appendChild(document.createElement("br"));
          slotDiv.appendChild(btn);
        }
        slotsDiv.appendChild(slotDiv);
      });
      card.appendChild(slotsDiv);
    });

    container.appendChild(card);
  });
}

// Render the user's booked appointments.
function updateUserAppointments() {
  const list = document.getElementById("appointmentList");
  list.innerHTML = "";
  userAppointments.forEach((app) => {
    let li = document.createElement("li");
    li.textContent = app.doctorName + " - " + app.location + " on " + app.time;
    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = () => deleteAppointment(app.doctorId, app.appointment_id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

//   Appointment Actions

// Function to book an appointment.
function makeAppointment(doctorId, time) {
  // Find the doctor
  let doc = doctors.find((d) => d.id === doctorId);
  if (!doc) return;

  // Verify if the slot is still available
  let existing = doc.appointments.find((app) => app.appointment_time === time);
  if (existing) {
    alert("Slot already occupied!");
    return;
  }

  // Create a new appointment object
  let appointmentId = "apt" + Date.now();
  let newAppointment = {
    appointment_time: time,
    appointment_id: appointmentId,
    byUser: true,
  };
  doc.appointments.push(newAppointment);

  // Also add it to the user's appointments list.
  userAppointments.push({
    doctorId: doc.id,
    doctorName: doc.name,
    location: doc.location,
    time: time,
    appointment_id: appointmentId,
  });

  alert(
    "You made an appointment on " +
      time +
      " at " +
      doc.location +
      " with " +
      doc.name
  );
  updateAvailableAppointments();
  updateUserAppointments();
}

// Function to cancel an appointment.
function deleteAppointment(doctorId, appointmentId) {
  let doc = doctors.find((d) => d.id === doctorId);
  if (!doc) return;

  // Remove the appointment from the doctor's list.
  doc.appointments = doc.appointments.filter(
    (app) => app.appointment_id !== appointmentId
  );

  // Remove the appointment from the user's list (if it exists there).
  userAppointments = userAppointments.filter(
    (app) => app.appointment_id !== appointmentId
  );

  updateAvailableAppointments();
  updateUserAppointments();
}

//-------------------- Initialization      -----------------------//

function populateExpertiseDropdown() {
  const expertiseSelect = document.getElementById("expertiseSelect");
  let expertises = new Set();
  doctors.forEach((doc) => expertises.add(doc.experties));
  expertises.forEach((exp) => {
    let option = document.createElement("option");
    option.value = exp;
    option.textContent = exp;
    expertiseSelect.appendChild(option);
  });
}

document
  .getElementById("hospitalSelect")
  .addEventListener("change", updateAvailableAppointments);
document
  .getElementById("expertiseSelect")
  .addEventListener("change", updateAvailableAppointments);

populateHospitalDropdown();
populateExpertiseDropdown();
updateAvailableAppointments();
updateUserAppointments();

let path_components = "components/";
let sections_folder = "main_sections/";

// ------------------- IMPORT COMPONENTS --------------------
function load_components() {
  let arr_components = ["topbar", "footer", "sidebar", "topbar-sub"];
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
