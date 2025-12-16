const testPatients = [
    { firstName: "John", lastName: "Doe", phoneNumber: "07123456789", email: "john.doe@example.com", birthDate: "01/02/1985", weight: 80, height: 180, bmiCategory: "Normal (18.5-24.9)" },
    { firstName: "Jane", lastName: "Smith", phoneNumber: "07987654321", email: "jane.smith@sky.co.uk", birthDate: "01/02/1990", weight: 65, height: 165, bmiCategory: "Normal (18.5-24.9)" },
    { firstName: "Alice", lastName: "Johnson", phoneNumber: "07456789012", email: "alice.johnson@bt.co.uk", birthDate: "01/02/1975", weight: 70, height: 170, bmiCategory: "Normal (18.5-24.9)" },
    { firstName: "Bob", lastName: "Brown", phoneNumber: "07321098765", email: "bob.brown@aol.com", birthDate: "01/02/2000", weight: 90, height: 175, bmiCategory: "Overweight (25-29.9)" },
    { firstName: "Emily", lastName: "Davis", phoneNumber: "07234567890", email: "emily.davis@gmail.com", birthDate: "01/02/1995", weight: 60, height: 160, bmiCategory: "Normal (18.5-24.9)" },
    { firstName: "Michael", lastName: "Wilson", phoneNumber: "07567890123", email: "michael.wilson12@outlook.com", birthDate: "01/02/1980", weight: 85, height: 185, bmiCategory: "Overweight (25-29.9)" },
    { firstName: "Sarah", lastName: "Moore", phoneNumber: "07678901234", email: "sarahmoore1@bt.co.uk", birthDate: "01/02/1988", weight: 90, height: 160, bmiCategory: "Obese (>=30)" },
    { firstName: "David", lastName: "Taylor", phoneNumber: "07789012345", email: "david.taylor@bt.co.uk", birthDate: "01/02/1992", weight: 100, height: 190, bmiCategory: "Overweight (25-29.9)" },
    ];
// Contact class with validation
class Contact {
  constructor(firstName, lastName, phoneNumber, email, birthDate, height, weight, healthNotes) {
    this.firstName = Contact.validateFirstName(firstName, "First Name");
    this.lastName = Contact.validateLastName(lastName, "Last Name");
    this.phoneNumber = Contact.validatePhone(phoneNumber);
    this.email = Contact.validateEmail(email);
    this.birthDate = Contact.validateBirthDate(birthDate);
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

    // Prepare patient object
    const patient = {
      firstName: validFirst,
      lastName: validLast,
      phone,
      emails,
      birthDate: validDob instanceof Date && !isNaN(validDob.getTime()) ? validDob.toISOString().split('T')[0] : dob,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      bmi: bmiValue,
      bmiCategory,
      healthNotes
    };
    console.log('Submitted patient details:', patient);
    // Indicate success in console
    console.info('Contact submission successful.');
  } catch (err) {
    console.error('Contact submission failed:', err && err.message ? err.message : err);
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
// Search and display patient
document.getElementById("searchBtn").addEventListener("click", () => {
  const name = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");

  const patient = patients.find(p => p.name.toLowerCase() === name);

  if (!patient) {
    resultDiv.innerHTML = `<p style="color:red;">Patient not found.</p>`;
    return;
  }

  const age = calculateAge(patient.birthYear);
  const bmi = calculateBMI(patient.weight, patient.height);
  const category = bmiCategory(bmi);

  resultDiv.innerHTML = `
    <h3>Patient Details</h3>
    <p><strong>Name:</strong> ${patient.name}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>BMI:</strong> ${bmi}</p>
    <p><strong>Category:</strong> ${category}</p>
  `;
});
// Display all patients with Name, Age, BMI & Category 
function displayPatients(patients) {
  const container = document.getElementById("patientList");
  container.innerHTML = "";

  patients.forEach(p => {
    const card = document.createElement("div");
    card.className = "patient-card";

    card.innerHTML = `
      <h3>${p.firstName} ${p.lastName}</h3>
      <p><strong>Age:</strong> ${p.age}</p>
      <p><strong>BMI:</strong> ${p.bmi}</p>
      <p><strong>Category:</strong> ${p.bmiCategory}</p>
      <p><strong>Phone:</strong> ${p.phoneNumber}</p>
      <p><strong>Email:</strong> ${p.email}</p>
      <p><strong>Notes:</strong> ${p.healthNotes}</p>
    `;

    container.appendChild(card);
  });
}

