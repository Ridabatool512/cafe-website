// 1. Interactive Form Handling and Validation

const form = document.getElementById("feedback-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("form-message");

    if (username !== "" && email !== "") {
        message.textContent =
            "Thank you for visiting, " + username +
            "! We will contact you at " + email + ".";
    } else {
        message.textContent = "Please enter both username and email.";
    }
});


// 2. Table Row Highlighting

const rows = document.querySelectorAll("#menu-table tbody tr");

// 3. Light/Dark Theme Switcher

const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", function() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    themeButton.setAttribute("aria-pressed", String(isDarkMode));
});


// 4. Interactive Order Total Calculator

const checkboxes = document.querySelectorAll(".menu-item");
const totalDisplay = document.getElementById("total");

function calculateTotal() {
    let total = 0;

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            total += Number(checkbox.value);
        }
    });

    totalDisplay.textContent = "Total: Rs " + total.toLocaleString("en-PK");
}

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", calculateTotal);
});


// 5. Age Verification and Discount

const birthYearInput = document.getElementById("birth-year");
const discountMessage = document.getElementById("discount-message");

birthYearInput.addEventListener("input", function() {
    const birthYear = Number(birthYearInput.value);
    const currentYear = new Date().getFullYear();

    if (birthYearInput.value.trim() === "") {
        discountMessage.textContent = "";
    } else if (
        Number.isInteger(birthYear) &&
        birthYear >= 1900 &&
        birthYear <= currentYear
    ) {
        const age = currentYear - birthYear;

        if (age >= 60) {
            discountMessage.textContent =
                "You qualify for the senior discount!";
        } else if (age >= 18 && age <= 25) {
            discountMessage.textContent =
                "You qualify for the student-age discount. Student ID may be required.";
        } else {
            discountMessage.textContent =
                "You do not qualify for these age-based discounts.";
        }
    } else {
        discountMessage.textContent = "Please enter a valid birth year.";
    }
});


// 6. Read More / Read Less Toggle

const readMoreButton = document.getElementById("read-more");
const extraText = document.getElementById("extra-text");

readMoreButton.addEventListener("click", function() {
    const isExpanded = extraText.hidden;
    extraText.hidden = !isExpanded;
    readMoreButton.setAttribute("aria-expanded", String(isExpanded));
    readMoreButton.textContent = isExpanded ? "Read Less" : "Read More";
});


// 7. Live Category Filter

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const category = button.dataset.category;

        filterButtons.forEach(function(filterButton) {
            filterButton.setAttribute(
                "aria-pressed",
                String(filterButton === button)
            );
        });

        rows.forEach(function(row) {
            if (
                category === "all" ||
                row.dataset.category === category
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});


// 8. Dynamic Opening Status

const openingStatus = document.getElementById("opening-status");
const currentHour = new Date().getHours();
const currentDate = document.getElementById("current-date");
const today = new Date();

currentDate.dateTime = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");
currentDate.textContent = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});

if (currentHour >= 8 && currentHour < 20) {
    openingStatus.textContent = "We are Open!";
    openingStatus.style.color = "green";
} else {
    openingStatus.textContent = "Closed - Open at 8 AM";
    openingStatus.style.color = "red";
}


// 9. Live Character Counter

const specialNotes = document.getElementById("special-notes");
const characterCount = document.getElementById("character-count");

specialNotes.addEventListener("input", function() {
    const remaining = 100 - specialNotes.value.length;

    characterCount.textContent =
        remaining + (remaining === 1 ? " character remaining" : " characters remaining");
});

// Keep the birth-year limit current so future years cannot be entered.
birthYearInput.max = String(new Date().getFullYear());