window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let values  = { amount: 100000, years: 30, rate: 8 };
  const amountDisplay = document.getElementById('loan-amount');
  const yearsDisplay = document.getElementById('loan-years');
  const rateDisplay = document.getElementById('loan-rate');
  amountDisplay.value = values.amount;
  yearsDisplay.value = values.years;
  rateDisplay.value = values.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let currentUIValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIValues));
}






// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let interest = (values.rate/100)/12;
  let term = values.years * 12;
  return ((interest * values.amount) /
  (1 - Math.pow((1 + interest), -term))).toFixed(2);
}


// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyDisplay = document.getElementById("monthly-payment");
  monthlyDisplay.innerText = monthly;
}