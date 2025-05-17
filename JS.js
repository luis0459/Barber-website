let currentDate = new Date();
let bookedSlots = {
  "2025-05-15": [9, 10] // Example: Booked slots for May 15th
};

// Simple function to render the month view
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day-cell");
    const dateKey = `${year}-${month + 1}-${i}`;
    
    dayCell.textContent = i;

    if (bookedSlots[dateKey] && bookedSlots[dateKey].length > 0) {
      dayCell.classList.add("booked");
    } else {
      dayCell.classList.add("available");
    }

    dayCell.onclick = () => showBookingModal(dateKey);
    calendar.appendChild(dayCell);
  }
}

function showBookingModal(dateKey) {
  const modal = document.getElementById("booking-modal");
  const details = document.getElementById("appointment-details");
  details.textContent = `Booking for ${dateKey}. Choose a time.`;
  modal.style.display = "block";

  // Store the dateKey in a global variable or attribute for later use
  window.selectedDate = dateKey;
}

function closeBooking() {
  document.getElementById("booking-modal").style.display = "none";
}

function bookAppointment() {
  // Send the selected date and time to the backend to book it (AJAX request)
  alert(`Booked appointment for ${window.selectedDate}`);
  closeBooking();
}

function goToPrevious() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function goToNext() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

renderCalendar();
