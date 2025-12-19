// Sample patient data for testing search functionality
  const testPatients = [
    { firstName: "John", lastName: "Doe", phoneNumber: "07123456789", email: "john.doe@example.com", birthDate: "01/02/1985", weight: 80, height: 180, bmiCategory: "Normal (18.5-24.9)", gender: "Male"},
    { firstName: "Jane", lastName: "Smith", phoneNumber: "07987654321", email: "jane.smith@sky.co.uk", birthDate: "01/02/1990", weight: 65, height: 165, bmiCategory: "Normal (18.5-24.9)", gender: "Female"},
    { firstName: "Alice", lastName: "Johnson", phoneNumber: "07456789012", email: "alice.johnson@bt.co.uk", birthDate: "01/02/1975", weight: 70, height: 170, bmiCategory: "Normal (18.5-24.9)", gender: "Female" },
    { firstName: "Bob", lastName: "Brown", phoneNumber: "07321098765", email: "bob.brown@aol.com", birthDate: "01/02/2000", weight: 90, height: 175, bmiCategory: "Overweight (25-29.9)", gender: "Male" },
    { firstName: "Emily", lastName: "Davis", phoneNumber: "07234567890", email: "emily.davis@gmail.com", birthDate: "01/02/1995", weight: 60, height: 160, bmiCategory: "Normal (18.5-24.9)", gender: "Female" },
    { firstName: "Michael", lastName: "Wilson", phoneNumber: "07567890123", email: "michael.wilson12@outlook.com", birthDate: "01/02/1980", weight: 85, height: 185, bmiCategory: "Overweight (25-29.9)", gender: "Male" },
    { firstName: "Sarah", lastName: "Moore", phoneNumber: "07678901234", email: "sarahmoore1@bt.co.uk", birthDate: "01/02/1988", weight: 90, height: 160, bmiCategory: "Obese (>=30)", gender:"Female" },
    { firstName: "David", lastName: "Taylor", phoneNumber: "07789012345", email: "david.taylor@bt.co.uk", birthDate: "01/02/1992", weight: 100, height: 190, bmiCategory: "Overweight (25-29.9)", gender: "Male" },
    ];

      console.log("Test Patients:", testPatients);

// Contact class with validation
class Contact {
  constructor(firstName, lastName, phoneNumber, email, birthDate, height, weight, healthNotes, gender) {
    this.firstName = Contact.validateFirstName(firstName, "First Name");
    this.lastName = Contact.validateLastName(lastName, "Last Name");
    this.phoneNumber = Contact.validatePhone(phoneNumber);
    this.email = Contact.validateEmail(email);
    this.birthDate = Contact.validateBirthDate(birthDate);
    this.gender = gender;
    this.height = Contact.validateHeight(height);
    this.weight = Contact.validateWeight(weight);
    this.healthNotes = healthNotes;
    this.bmi = this.calculateBMI();
  }

// Instance method to calculate BMI
    calculateBMI() {
    const heightM = this.height / 100;
    return Number((this.weight / (heightM * heightM)).toFixed(1));
  }

// Static method for first name validation
  static validateFirstName(value, fieldLabel) {
    if (typeof value !== "string") {
      throw new TypeError(`${fieldLabel} must be a string.`);
    }
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 12) {
      throw new Error(`${fieldLabel} must be between 2 and 12 characters long.`);
    }
    return trimmed;
  }
// Static method for last name validation
 static validateLastName(value, fieldLabel) {
    if (typeof value !== "string") {
      throw new TypeError(`${fieldLabel} must be a string.`);
    }
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 20) {
      throw new Error(`${fieldLabel} must be between 2 and 20 characters long.`);
    }
    // Only allow letters, single hyphen and apostrophes; must start and end with a letter
    if (!/^[A-Za-z][A-Za-z'\-]*[A-Za-z]$/.test(trimmed)) {
      throw new Error(`${fieldLabel} must start and end with a letter and contain only letters, apostrophes or a hyphen.`);
    }
    // No consecutive punctuation
    if (/[-']{2,}/.test(trimmed)) {
      throw new Error(`${fieldLabel} must not contain consecutive hyphens or apostrophes.`);
    }
    const hyphenCount = (trimmed.match(/-/g) || []).length;
    const apostropheCount = (trimmed.match(/'/g) || []).length;
    if (hyphenCount > 1) {
      throw new Error(`${fieldLabel} may contain at most one hyphen.`);
    }
    if (apostropheCount > 2) {
      throw new Error(`${fieldLabel} may contain at most two apostrophes.`);
    }
    return trimmed;
  }
// Static method for phone number validation
static validatePhone(value) {
    const phonePattern = /^07\d{9}$/;
    if (!phonePattern.test(value)) {
      throw new Error("Phone number must be 11 digits and start with 07.");
    }
    return value;
  }
// Static method for email validation
static validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      throw new Error("Invalid email address format.");
    }
    return value;
  }
 // Static method for birth date validation
  static validateBirthDate(value) {
      if (value === undefined || value === null || value === "") {
        throw new Error("Birth date is required.");
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid birth date.");
      }
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      if (age < 0 || age > 120) {
        throw new Error("Age must be between 0 and 120 years.");
      }
      return date;
    }
// Static method for height validation
  static validateHeight(value) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new TypeError("Height must be a number.");
    }
    if (value < 30 || value > 200) {
      throw new Error("Height must be between 30 cm and 200 cm.");
    }
    return value;
  }
// Static method for weight validation
  static validateWeight(value) {
    if (typeof value !== "number" || isNaN(value)) {  
      throw new TypeError("Weight must be a number.");
    }
    if (value < 1 || value > 200) {
      throw new Error("Weight must be between 1 kg and 200 kg.");
    }     
    return value;
}
}
// Functions to create and validate contacts
function createContact(firstName, lastName) {
  try {
    return { ok: true, data: new Contact(firstName, lastName) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
function isValidContact(firstName, lastName) {
  try {
    Contact.validateName(firstName, "First Name");
    Contact.validateName(lastName, "Last Name");
    return true;
  } catch {
    return false;
  }
}
// DOM Elements - Email addition and form submission
const submit = document.getElementById('submit');
const addEmail = document.getElementById('email2');

if (addEmail) {
  addEmail.addEventListener('click', (e) => {
    e.preventDefault();
    const anchorLi = document.getElementById('email-li');
    const ul = anchorLi ? anchorLi.parentElement : document.querySelector('ul');
    if (!ul) return;

    const newLi = document.createElement('li');
    const newLabel = document.createElement('label');
    const newInput = document.createElement('input');

    newInput.type = 'email';
    newInput.className = 'email-class';
    newInput.placeholder = 'Enter email';
    // Allow multiple emails to be submitted as an array
    newInput.name = 'email[]';

    newLabel.textContent = 'Email: ';
    newLabel.appendChild(newInput);
    newLi.appendChild(newLabel);

    // Insert the new li right after the original email li, or append to end
    if (anchorLi && anchorLi.nextSibling) {
      ul.insertBefore(newLi, anchorLi.nextSibling);
    } else {
      ul.appendChild(newLi);
    }
  });
}

if (submit) {
  submit.addEventListener('click', (e) => {
  e.preventDefault();

  // Collect Patient Details from the form
  const first = (document.getElementById('fname') || {}).value || '';
  const last = (document.getElementById('lname') || {}).value || '';
  const phone = (document.getElementById('number') || {}).value || '';
  const dob = (document.getElementById('dob') || {}).value || '';
  const healthNotes = (document.getElementById('health-notes') || {}).value || '';
  const weightVal = (document.getElementById('weight') || {}).value || '';
  const heightVal = (document.getElementById('height') || {}).value || '';
  const gender = document.querySelector('input[name="gender"]:checked')?.value || '';

  // Generate UUID for patient record
  const generatedId = crypto.randomUUID();

  // Collect all email inputs on the page (support multiple added emails)
  const emailEls = Array.from(document.querySelectorAll('input[type="email"]'));
  const emails = emailEls.map(el => (el.value || '').trim()).filter(v => v !== '');

  // Validate and prepare a patient object; use Contact static validators where available
  try {
    const validFirst = Contact.validateFirstName ? Contact.validateFirstName(first, 'First Name') : first.trim();
    const validLast = Contact.validateLastName ? Contact.validateLastName(last, 'Last Name') : last.trim();

  //Phone validation (will throw if invalid)
    if (Contact.validatePhone) Contact.validatePhone(phone);

  // Validate each Email (will throw on first invalid)
    if (Contact.validateEmail) {
      for (const em of emails) Contact.validateEmail(em);
    }
  // DOB validation
    const validDob = Contact.validateBirthDate ? Contact.validateBirthDate(dob) : new Date(dob);

  // Height and weight validation
    const parsedWeight = Number(weightVal);
    const parsedHeight = Number(heightVal);
    if (!isFinite(parsedWeight) || parsedWeight <= 0) throw new Error('Weight must be a positive number');
    if (!isFinite(parsedHeight) || parsedHeight <= 0) throw new Error('Height must be a positive number');
    if (Contact.validateHeight) Contact.validateHeight(parsedHeight);
    if (parsedWeight < 1 || parsedWeight > 200) throw new Error('Weight must be between 1 and 200 kg');

  // Calculate BMI and category
  const bmiValue = calculateBMI(parsedWeight, parsedHeight);
  const bmiCategory = getBMICategory(bmiValue);
  // Prepare patient object
  const patient = {
      id: generatedId,
      firstName: validFirst,
      lastName: validLast,
      phone,
      emails,
      birthDate: validDob instanceof Date && !isNaN(validDob.getTime()) ? validDob.toISOString().split('T')[0] : dob,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      gender,
      bmi: bmiValue,
      bmiCategory,
      healthNotes
    };
    // Store test patients in localStorage for search functionality
    let patients = JSON.parse(localStorage.getItem('patients') || '[]');
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));

    console.log('Submitted patient details:', patient);
    alert("Submission successful!");
    // Indicate success in console
    console.info('Contact submission successful.');
  } catch (err) {
    console.error('Contact submission failed:', err && err.message ? err.message : err);
    alert("Contact submission invalid: " + (err && err.message ? err.message : err) );
  }
  });
  } else {
  console.warn('Submit button not found; submit handler not attached.');
} 
// BMI calculation helper (weight in kg, height in cm)
function calculateBMI(weightKg, heightCm) {
  const w = Number(weightKg);
  const h = Number(heightCm);
  if (!isFinite(w) || w <= 0) {
    throw new Error('Weight must be a positive number');
  }
  if (!isFinite(h) || h <= 0) {
    throw new Error('Height must be a positive number');
  }
  const heightM = h / 100;
  const bmi = w / (heightM * heightM);
  return Number(bmi.toFixed(1));
}
// Return BMI category string using specified ranges
function getBMICategory(bmi) {
  if (!isFinite(bmi)) return 'Unknown';
  if (bmi < 18.5) return 'Underweight (<18.5)';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal (18.5-24.9)';
  if (bmi >= 25.0 && bmi <= 29.9) return 'Overweight (25.0-29.9)';
  return 'Obese (>=30)';
}
// Calculate BMI button
const calcBtn = document.getElementById('calc-bmi');
const bmiDisplay = document.getElementById('bmi-display');
const bmiCategoryEl = document.getElementById('bmi-category');
if (calcBtn && bmiDisplay) {
  calcBtn.addEventListener('click', () => {
    const weightEl = document.getElementById('weight');
    const heightEl = document.getElementById('height');
    const weight = weightEl ? parseFloat(weightEl.value) : NaN;
    const height = heightEl ? parseFloat(heightEl.value) : NaN;
    try {
      const bmi = calculateBMI(weight, height);
      bmiDisplay.value = bmi;
      if (bmiCategoryEl) bmiCategoryEl.value = getBMICategory(bmi);
    } catch (err) {
      bmiDisplay.value = 'Error: ' + err.message;
      if (bmiCategoryEl) bmiCategoryEl.value = '';
    }
  });
}
// Calculate BMI and category (re-using functions already on the page)
     let bmiValue = null;
     let bmiCategory = '';
     try {
       bmiValue = calculateBMI(parsedWeight, parsedHeight);
       bmiCategory = typeof getBMICategory === 'function' ? getBMICategory(bmiValue) : '';
     } catch (innerErr) {
       // ignore bmi calculation error here; we'll still log other details
       bmiValue = null;
       bmiCategory = '';
     }
// Calculate age
function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}
  function calculateAge(birthDate) {
  const today = new Date();
  const dob = new Date(birthDate);

  let age = today.getFullYear() - dob.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
  } ; 

// Search functionality
document.getElementById("searchBtn").addEventListener("click", () => {
  const name = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
// Get gender selection
const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
// Load saved patients + test patients
  const savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
  const patients = [...testPatients, ...savedPatients];

  const patient = patients.find(p => {
    const phone = p.phone ?? p.phoneNumber;
    const email = Array.isArray(p.emails) ? p.emails.join(", ") : p.email;
    const weight = p.weightKg ?? p.weight;
    const height = p.heightCm ?? p.height;
    const gender = p.gender ?? '';

    return (
      `${p.firstName}; ${p.lastName}; ${phone}; ${email}; ${p.birthDate}; ${weight}; ${height}; ${p.gender}; ${p.bmiCategory}; ${p.healthNotes ?? ""}`
        .toLowerCase()
        .includes(name)
    );
  });

  resultDiv.style.display = "block";

  if (!patient) {
    resultDiv.innerHTML = `<p>No patient found.</p>`;
    return;
  }

  // Normalise fields for display
  const phone = patient.phone ?? patient.phoneNumber;
  const email = Array.isArray(patient.emails) ? patient.emails.join(", ") : patient.email;
  const weight = patient.weightKg ?? patient.weight;
  const height = patient.heightCm ?? patient.height;

  let bmi;
  try {
    bmi = calculateBMI(weight, height);
  } catch {
    bmi = "N/A";
  }

  resultDiv.innerHTML = `
    <h3>Patient Details</h3>
    <input type="hidden" id="patient-id" value="${patient.id}">
    <p><strong>Name:</strong> ${patient.firstName} ${patient.lastName}</p>
    <p><strong>Age:</strong> ${calculateAge(patient.birthDate)}</p>
    <p><strong>BMI:</strong> ${bmi}</p>
    <p><strong>BMI Category:</strong> ${patient.bmiCategory}</p>

    <button class="editBtn" data-id="${patient.id}">Edit Record</button>
    <button class="deleteBtn" data-id="${patient.id}">Delete Record</button>
  `;
});

// Display All Patients Button functionality
document.getElementById("showPatientsBtn").addEventListener("click", () => {
  const container = document.getElementById("allPatients");

  const savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
  const patients = [...testPatients, ...savedPatients];

  let html = "<h3>All Patients</h3><ul>";
  patients.forEach(p => {
    const phone = p.phone ?? p.phoneNumber;
    const email = Array.isArray(p.emails) ? p.emails.join(", ") : p.email;
    const weight = p.weightKg ?? p.weight;
    const height = p.heightCm ?? p.height;
    const gender = p.gender ?? "Not specified";

    let bmi;
    try {
      bmi = calculateBMI(weight, height);
    } catch {}

    let age = "N/A";
    try {
      age = calculateAge(p.birthDate);
    } catch {}

    
    searchDiv.innerHTML += `
    <div class="patient-card">
      <p>
        <strong>Name:</strong> ${p.firstName} ${p.lastName}<br>
        <strong>Age:</strong> ${age}<br>
        <strong>BMI:</strong> ${bmi}<br>
        <strong>BMI Category:</strong> ${p.bmiCategory}<br>
      </p>
    </div> `;
  });
 });

 // Edit Patient Record functionality when Edit button clicked
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("editBtn")) {
    const id = e.target.dataset.id;

    const savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const patient = savedPatients.find(p => p.id === id);

    if (!patient) {
      alert("Patient not found.");
      return;
    }

    // Populate form
    document.getElementById("edit-id").value = patient.id;
    document.getElementById("edit-firstName").value = patient.firstName;
    document.getElementById("edit-lastName").value = patient.lastName;
    document.getElementById("edit-phone").value = patient.phone;
    document.getElementById("edit-email").value = Array.isArray(patient.emails) ? patient.emails.join(", ") : patient.email;
    document.getElementById("edit-birthDate").value = patient.birthDate;
    document.getElementById("edit-height").value = patient.heightCm;
    document.getElementById("edit-weight").value = patient.weightKg;
    document.getElementById("edit-gender").value = patient.gender;
    document.getElementById("edit-healthNotes").value = patient.healthNotes;

    // Display form
    document.getElementById("editFormContainer").style.display = "block";
  }
});

// Save chnanges from Edit form
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("edit-id").value;

  const updatedFields = {
    firstName: document.getElementById("edit-firstName").value,
    lastName: document.getElementById("edit-lastName").value,
    phone: document.getElementById("edit-phone").value,
    emails: document.getElementById("edit-email").value.split(",").map(e => e.trim()),
    birthDate: document.getElementById("edit-birthDate").value,
    heightCm: Number(document.getElementById("edit-height").value),
    weightKg: Number(document.getElementById("edit-weight").value),
    gender: document.getElementById("edit-gender").value,
    healthNotes: document.getElementById("edit-healthNotes").value
  };

  // Recalculate BMI
  try {
    updatedFields.bmi = calculateBMI(updatedFields.weightKg, updatedFields.heightCm);
    updatedFields.bmiCategory = getBMICategory(updatedFields.bmi);
  } catch {
    updatedFields.bmi = "N/A";
    updatedFields.bmiCategory = "Unknown";
  }

  // Load & update
  const savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
  const index = savedPatients.findIndex(p => p.id === id);

  if (index === -1) {
    alert("Error: Patient not found.");
    return;
  }

  // Merge (ID stays unchanged)
  savedPatients[index] = {
    ...savedPatients[index],
    ...updatedFields
  };

  localStorage.setItem("patients", JSON.stringify(savedPatients));

  alert("Patient record updated successfully!");

  // Hide form
  document.getElementById("editFormContainer").style.display = "none";
});

// Delete Patient Record functionality when Delete button clicked
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.dataset.id;

    // Confirm deletion
    const confirmDelete = confirm("Are you sure you want to delete this patient record?");
    if (!confirmDelete) return;

    // Load saved patients
    let savedPatients = JSON.parse(localStorage.getItem("patients")) || [];

    // Remove the patient
    savedPatients = savedPatients.filter(p => p.id !== id);

    // Save updated list
    localStorage.setItem("patients", JSON.stringify(savedPatients));

    alert("Patient record deleted successfully.");

    // Refresh user interface when deletion occurs
    const resultDiv = document.getElementById("result");
    if (resultDiv) resultDiv.style.display = "none";

    const allPatientsDiv = document.getElementById("allPatients");
    if (allPatientsDiv) allPatientsDiv.innerHTML = "";
  }
});

