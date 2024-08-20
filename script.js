// script.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      form.reset();
      form.classList.remove("was-validated");
    } else {
      form.classList.add("was-validated");
    }
  });

  function validateForm() {
    let isValid = true;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const dob = document.getElementById("dob");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const captcha = document.getElementById("captcha");

    if (!validateField(fullName, "fullNameError")) isValid = false;
    if (!validateField(email, "emailError")) isValid = false;
    if (!validateField(phone, "phoneError")) isValid = false;
    if (!validateField(address, "addressError")) isValid = false;
    if (!validateField(dob, "dobError")) isValid = false;
    if (!validateField(password, "passwordError")) isValid = false;
    if (!validateField(confirmPassword, "confirmPasswordError"))
      isValid = false;
    if (!validateCaptcha(captcha, "captchaError")) isValid = false;

    return isValid;
  }

  function validateField(field, errorId) {
    let isValid = true;
    let errorMessage = "";

    if (field.id === "fullName") {
      if (field.value.trim().length < 5) {
        isValid = false;
        errorMessage = "Name must be at least 5 characters long.";
      }
    } else if (field.id === "email") {
      if (!field.value.includes("@")) {
        isValid = false;
        errorMessage = "Please enter a valid email address.";
      }
    } else if (field.id === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(field.value) || field.value === "1234567890") {
        isValid = false;
        errorMessage = "Please enter a valid 10-digit phone number.";
      }
    } else if (field.id === "address") {
      if (field.value.trim().length === 0) {
        isValid = false;
        errorMessage = "Please enter your address.";
      }
    } else if (field.id === "dob") {
      if (field.value.trim().length === 0) {
        isValid = false;
        errorMessage = "Please enter your date of birth.";
      }
    } else if (field.id === "password") {
      const fullName = document
        .getElementById("fullName")
        .value.trim()
        .toLowerCase();
      const passwordValue = field.value.trim().toLowerCase();
      if (
        passwordValue.length < 8 ||
        passwordValue === "password" ||
        passwordValue === fullName
      ) {
        isValid = false;
        errorMessage =
          "Password must be at least 8 characters long and cannot be 'password' or your name.";
      }
    } else if (field.id === "confirmPassword") {
      const password = document.getElementById("password").value;
      if (field.value !== password) {
        isValid = false;
        errorMessage = "Passwords do not match.";
      }
    }

    const errorElement = document.getElementById(errorId);
    if (!isValid) {
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");
      errorElement.textContent = errorMessage;
    } else {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
      errorElement.textContent = "";
    }

    return isValid;
  }

  function validateCaptcha(field, errorId) {
    let isValid = true;
    let errorMessage = "";

    if (field.value.trim() !== "8") {
      isValid = false;
      errorMessage = "Please enter the correct answer.";
    }

    const errorElement = document.getElementById(errorId);
    if (!isValid) {
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");
      errorElement.textContent = errorMessage;
    } else {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
      errorElement.textContent = "";
    }

    return isValid;
  }
});
