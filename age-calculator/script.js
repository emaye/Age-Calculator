// Import Luxon DateTime
const { DateTime } = luxon;

document.addEventListener('DOMContentLoaded', () => {
  const datepicker = document.getElementById('datepicker');
  const result = document.getElementById('result');
  const form = document.getElementById('ageForm');

  // Initialize the custom datepicker
  datepicker.addEventListener('focus', function () {
    this.type = 'date'; // Switch to date input on focus
  });

  datepicker.addEventListener('blur', function () {
    if (!this.value) this.type = 'text'; // Revert to text if no value is selected
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const birthdate = datepicker.value;
    if (!birthdate) {
      result.textContent = 'Please select a valid birthdate.';
      return;
    }

    const now = DateTime.now();
    const dob = DateTime.fromISO(birthdate);

    if (dob > now) {
      result.textContent = 'Birthdate cannot be in the future.';
      return;
    }

    const diff = now.diff(dob, ['years', 'months', 'days']).toObject();
    const { years, months, days } = diff;

    result.textContent = `You are ${Math.floor(years)} years, ${Math.floor(months)} months, and ${Math.floor(days)} days old.`;
  });
});
