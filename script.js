let input = {
  total: 0,
  percentage: 0,
  numberOfPeople: 0,
};

// Variables - elements
const billTotal = document.querySelector("#bill-amount");
const tipPercentage = document.querySelectorAll(".tip__percentage");
const numberOfPeople = document.querySelector("#numberOfPeople");
const resetButton = document.querySelector("button[type=reset]");
const tipPerPersonEl = document.querySelector(".tip-amount__number");
const totalPerPersonEl = document.querySelector(".total__number");

const resetInput = () => {
  // reset input object
  setBillTotal(0);
  setNumberOfPeople(0);
  setPercentage(0);

  // clear all fields
  billTotal.value = null;
  numberOfPeople.value = null;
  tipPerPersonEl.innerHTML = "---";
  totalPerPersonEl.innerHTML = "---";


};

// Update billtotal
const setBillTotal = (billTotal) => {
  input["total"] = billTotal;
};

// Update percentage
const setPercentage = (percentage) => {
  input["percentage"] = percentage;
};

// Update number of people
const setNumberOfPeople = (numb) => {
  input["numberOfPeople"] = numb;
};

// Check if the form has all arguments
const checkInput = () => {
  // check object
  for (el in input) {
    if (!input[el]) {
      console.log(el + " is nul");
      return false;
    }
  }

  return true;
};

// Calculate the tip per person (two decimals)
const calculateTipAmount = (obj) => {
  const tipPerPerson = (obj.total * obj.percentage) / obj.numberOfPeople;
  return tipPerPerson.toFixed(2);
};

// Calculate total per person (two decimals)
const calculateTotal = (obj) => {
  const tip = calculateTipAmount(obj);
  const totalPerPerson = parseFloat(tip) + obj.total / obj.numberOfPeople;
  return totalPerPerson.toFixed(2);
};

// Set values as text
const showOutput = (f1, f2) => {
  tipPerPersonEl.innerText = f1;
  totalPerPersonEl.innerText = f2;
};

// ADD EVENTS
// Update inputs object if bill total changes
billTotal.addEventListener("blur", (e) => {
  const userInputBill = parseFloat(e.target.value);
  // Update object
  setBillTotal(userInputBill);

  // Check if every field in form is set
  if (checkInput()) {
    showOutput(calculateTipAmount(input), calculateTotal(input));
  }
});

// Update inputs object if people number changes
numberOfPeople.addEventListener("blur", (e) => {
  const userInputNumberOfPeople = parseInt(e.target.value);

  // Update object
  setNumberOfPeople(userInputNumberOfPeople);

  // Check if every field in form is set
  if (checkInput()) {
    showOutput(calculateTipAmount(input), calculateTotal(input));
  }
});

// Clear all field and values
resetButton.addEventListener("click", (e) => {
  console.log(e);
  resetInput();

  // Delete active class
  for(let i = 0; i < tipPercentage.length; i++){
    if(tipPercentage[i].classList.contains('active')){
        tipPercentage[i].classList.remove('active');
    }
}
});

// Add actions on percentage buttons - depending custom input
for (percentageOption in tipPercentage) {
  tipPercentage[percentageOption].addEventListener("click", (e) => {
      // Delete active class
    for(let i = 0; i < tipPercentage.length; i++){
        if(tipPercentage[i].classList.contains('active')){
            tipPercentage[i].classList.remove('active');
        }
    }
    const button = e.target;
    let percentage;
    //Check for custom input
    if (e.target.nodeName !== "INPUT") {
      percentage = button.getAttribute("data-percentage");
      button.classList.add('active');
      console.log(button);
      setPercentage(percentage);
      
    } else if (e.target.nodeName == "INPUT") {
      e.target.addEventListener("blur", (e) => {
        console.log("input veld:");
        console.log(e.target.value);
        percentage = e.target.value / 100;
        setPercentage(percentage);
      });
    }

    // Check of alles is ingevuld
    if (checkInput()) {
      showOutput(calculateTipAmount(input), calculateTotal(input));
    }
  });
}
