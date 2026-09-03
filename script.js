//4:
const aboutField = document.getElementById("about");

const charCount = document.getElementById("charCount");

aboutField.addEventListener("input", () => {
    charCount.textContent = `${aboutField.value.length} / 200`;
});


function validateName(name) {
  const regex = /^[A-Za-z\s]{3,40}$/; 

    return regex.test(name.trim());
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

function validatePhone(phone) {
  const regex = /^\d{10}$/; 
    return regex.test(phone.trim());
}

function validateDOB(dob) {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) return false;

  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    }
    return age >= 15;
}

function validateGender() {
    return document.querySelector('input[name="gender"]:checked') !== null;
}

function validateCourse(course) {
    return course !== "";
}

function validateSkills() {
    return document.querySelectorAll('input[name="skills"]:checked').length > 0;
}

function validateAbout(about) {
    const trimmed = about.trim();
    
    return trimmed.length >= 20 && trimmed.length <=200;
}

function validatePhoto(photoInput) {
    if (!photoInput.files.length) return false;

    const file = photoInput.files[0];
    const validTypes =["image/jpeg", "image/png", "image/jpg"];
    return validTypes.includes(file.type);
}


const form = document.getElementById("studentForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const dob = document.getElementById("dob").value;

    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const course = document.getElementById("course").value;
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(s => s.value);
    const about = document.getElementById("about").value;
    const photoInput = document.getElementById("photo");

 
    if (!validateName(name)) {
    alert("Invalid Name: 3–40 letters only, no numbers/special chars.");
    return;
    }
    if (!validateEmail(email)) {
    alert("Invalid Email address.");
    return;
    }
    if (!validatePhone(phone)) {
    alert("Phone must be exactly 10 digits.");
    return;
    }
    if (!validateDOB(dob)) {
    alert("Invalid DOB: must be at least 15 years old and not in future.");
    return;
    }
    if (!validateGender()) {
    alert("Please select a gender.");
    return;
    }
     if (!validateCourse(course)) {
    alert("Please select a course.");
    return;
    }
    if (!validateSkills()) {
    alert("Select at least one skill.");
    return;
  }
    if (!validateAbout(about)) {
    alert("About Student must be 20–200 characters.");
    return;
    }
    if (!validatePhoto(photoInput)) {
    alert("Profile photo required (jpg/png).");
    return;
  }

    alert("Validation successful! Ready to store student data.");
});


// 5:
const students = [];
let studentIdCounter = 1; 


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const dob = document.getElementById("dob").value;

  const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const course = document.getElementById("course").value;

    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(s => s.value);
  const about = document.getElementById("about").value;
     const photoInput = document.getElementById("photo");


    if (!validateName(name)) { alert("Invalid Name"); return; }
    if (!validateEmail(email)) { alert("Invalid Email"); return; }

    if (!validatePhone(phone)) { alert("Invalid Phone"); return; }
    if (!validateDOB(dob)) { alert("Invalid DOB"); return; }
    
    if (!validateGender()) { alert("Select Gender"); return; }
    if (!validateCourse(course)) { alert("Select Course"); return; }
    if (!validateSkills()) { alert("Select Skills"); return; }
    if (!validateAbout(about)) { alert("About must be 20–200 chars"); return; }

    if (!validatePhoto(photoInput)) { alert("Upload valid photo"); return; }

    const student = {
        id: studentIdCounter++,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        dob: dob,
        gender: gender,
        course: course,
        skills: skills,
        about: about.trim(),
        photo: URL.createObjectURL(photoInput.files[0]) // temporary blob URL
  };

   

    students.push(student);

    alert(`Student ${student.name} registered successfully!`);


     form.reset();

    charCount.textContent = "0 / 200";
});

//6:
const studentContainer = document.getElementById("cards");

function renderStudents() {

    studentContainer.innerHTML = "";


    students.forEach(student => {

        const card = document.createElement("div");
        card.classList.add("student-card");
        card.setAttribute("data-id", student.id);

        
        const img = document.createElement("img");
        img.src = student.photo;
        img.alt = `${student.name}'s photo`;

        card.appendChild(img);

        const nameHeading = document.createElement("h3");
        nameHeading.textContent = student.name;
        card.appendChild(nameHeading);

    const emailPara = document.createElement("p");
    emailPara.textContent = `Email: ${student.email}`;
    card.appendChild(emailPara);

    const phonePara = document.createElement("p");

    phonePara.textContent = `Phone: ${student.phone}`;
    card.appendChild(phonePara);

    const dobPara = document.createElement("p");
    dobPara.textContent = `DOB: ${student.dob}`;
    card.appendChild(dobPara);

    const genderPara = document.createElement("p");
    genderPara.textContent = `Gender: ${student.gender}`;

    card.appendChild(genderPara);

    const coursePara = document.createElement("p");
    coursePara.textContent = `Course: ${student.course}`;

    card.appendChild(coursePara);

    const skillsPara = document.createElement("p");
    skillsPara.textContent = `Skills: ${student.skills.join(", ")}`;
    card.appendChild(skillsPara);
    

    const aboutPara = document.createElement("p");
    aboutPara.textContent = `About: ${student.about}`;

    card.appendChild(aboutPara);

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.classList.add("edit-btn");
    card.appendChild(editBtn);


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    card.appendChild(deleteBtn);

    studentContainer.appendChild(card);
    });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();



  const student = {
    id: studentIdCounter++,
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),

    phone: document.getElementById("phone").value.trim(),
    dob: document.getElementById("dob").value,

    gender: document.querySelector('input[name="gender"]:checked')?.value,

    course: document.getElementById("course").value,
    skills: Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(s => s.value),
    about: document.getElementById("about").value.trim(),

    photo: URL.createObjectURL(document.getElementById("photo").files[0])
    };

  students.push(student);

  renderStudents();

  form.reset();
  charCount.textContent = "0 / 200";
});

