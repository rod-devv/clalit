// Variable to store basic registration data across steps
let basicData = {};
let working_days = [];
const registerForm = document.getElementById("registerForm");
const messageEl = document.getElementById("message");
const basicRegisterContainer = document.getElementById(
  "basicRegisterContainer"
);
const additionalInfoContainer = document.getElementById(
  "additionalInfoContainer"
);

const doctorInfoContainer = document.getElementById("doctorInfoContainer");

// Handle basic registration form submission
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageEl.textContent = "";

  // Gather basic form data
  basicData = {
    idPerson: document.getElementById("idPerson").value,
    Fname: document.getElementById("Fname").value,
    Lname: document.getElementById("Lname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    DateOfBirth: document.getElementById("DateOfBirth").value,
    address: document.getElementById("address").value,
    role: document.getElementById("role").value,
  };

  // Hide basic form and show additional information container
  basicRegisterContainer.style.display = "none";
  additionalInfoContainer.style.display = "block";
});

// Handle adding prescriptions
document.getElementById("addPrescription").addEventListener("click", () => {
  const prescriptionInput = document.getElementById("prescriptionInput");
  const prescriptionValue = prescriptionInput.value.trim();
  if (prescriptionValue !== "") {
    const li = document.createElement("li");
    li.textContent = prescriptionValue;
    document.getElementById("prescriptionsList").appendChild(li);
    prescriptionInput.value = "";
  }
});

// Handle adding diagnosis
document.getElementById("addDiagnosis").addEventListener("click", () => {
  const diagnosisInput = document.getElementById("diagnosisInput");
  const diagnosisValue = diagnosisInput.value.trim();
  if (diagnosisValue !== "") {
    const li = document.createElement("li");
    li.textContent = diagnosisValue;
    document.getElementById("diagnosisList").appendChild(li);
    diagnosisInput.value = "";
  }
});

// Handle final submission of additional info
document
  .getElementById("submitAdditionalInfo")
  .addEventListener("click", () => {
    // Gather additional patient info
    const additionalData = {
      height: document.getElementById("height").value,
      weight: document.getElementById("weight").value,
      bloodType: document.getElementById("bloodType").value,
      prescriptions: Array.from(
        document.getElementById("prescriptionsList").children
      ).map((li) => li.textContent),
      diagnosis: Array.from(
        document.getElementById("diagnosisList").children
      ).map((li) => li.textContent),
    };

    // Combine both steps of the registration data
    const fullRegistrationData = { ...basicData, ...additionalData };

    // For demonstration purposes, log the full data to the console.
    console.log("Full Registration Data:", fullRegistrationData);

    // You can now call your backend registration function.
    // Example:
    // await register(fullRegistrationData);

    // // Show success message and redirect if needed.
    // alert("Registration completed successfully!");
    // window.location.href = "login.html";

    if (basicData.role === "doctor") {
      additionalInfoContainer.style.display = "none";
      doctorInfoContainer.style.display = "block";
    } else {
      // Simulate backend registration for non-doctor roles
      console.log("Registration Data:", basicData);
      alert("Registration completed successfully!");
      window.location.href = "../login/login.html";
    }
  });

// Handle adding working hours for doctors
document.getElementById("addWorkingHour").addEventListener("click", () => {
  const day = document.getElementById("daySelect").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  if (working_days.includes(day)) {
    alert("Working day already selected");
  } else if (day && startTime && endTime) {
    working_days.push(day);

    const li = document.createElement("li");
    li.textContent = `${day} ${startTime} - ${endTime}`;
    document.getElementById("workingHoursList").appendChild(li);
    // Reset the inputs for next entry
    document.getElementById("daySelect").selectedIndex = 0;
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
  } else {
    alert("Please fill in day, start time, and end time.");
  }
});

// Handle final submission for doctor additional info
document.getElementById("submitDoctorInfo").addEventListener("click", () => {
  // Gather doctor-specific data
  const doctorData = {
    specialization: document.getElementById("specialization").value,
    workLocation: document.getElementById("workLocation").value,
    workingHours: Array.from(
      document.getElementById("workingHoursList").children
    ).map((li) => li.textContent),
  };

  // Combine basic registration data with doctor-specific info
  const fullRegistrationData = { ...basicData, ...doctorData };
  console.log("Full Doctor Registration Data:", fullRegistrationData);

  // Simulate backend registration for doctor
  alert("Doctor registration completed successfully!");
  window.location.href = "../login/login.html";
});
