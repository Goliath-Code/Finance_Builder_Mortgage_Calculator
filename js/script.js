// BUTTONS
const calculateBtn = document.getElementById("calculate-button");
// INPUTS
const principalInput = document.getElementById("principal-id");
const termInput = document.getElementById("term-id");
const interestInput = document.getElementById("interest-id");
// DISPLAYED PRICES
const principalDisplay = document.getElementById("principal-display");
const interestRateDisplay = document.getElementById("interest-rate-display");
const termDisplay = document.getElementById("term-display");
const interestDisplay = document.getElementById("interest-display"); 
const costDisplay = document.getElementById("total-cost-display");
const monthlyDisplay = document.getElementById("monthly-payment-display");
// TABLE ROWS
const tableBody = document.getElementById("table-body");



// CALCULATE THE MATH FOR MORTAGE OUTPUTS AND TABLE
function calculateMortgage(e) {
    e.preventDefault();
    clearTable();
    // Principal
    const P = principalInput.value;
    // Annual interest rate percentage
    const annualInterestRate = interestInput.value;
    // Convert annual interest rate to monthly rate
    const r = (annualInterestRate / 12) / 100;
    // Term length in months
    const n = termInput.value * 12;

    // Calculate total monthly payment
    const numerator = P * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    const M = numerator / denominator;

    // Calculate total interest paid
    const totalInterest = M * n - P;

    const addedInterest = parseFloat(totalInterest) + parseFloat(P);

    if (P > 0 && r > 0 && n > 0) {
        displayOutputs(n,  annualInterestRate, P, totalInterest, addedInterest, M);
        calculateMonthlyPayments(totalInterest.toFixed(2), (addedInterest).toFixed(2), n, M);
    }    
    
}


// CALCULATE HOW MUCH PER MONTH THAT THE MORGAGE WILL COST INCLUDING INTEREST
function calculateMonthlyPayments(interestCost, totalCost, months, monthlyBill) {    
    // TOTAL INTEREST PER MONTH
    const monthlyInterest = parseFloat(interestCost) / months;
    // TOTAT PRINCIPAL PER MONTH MINUS INTEREST
    const monthlyPrincipal =  parseFloat(totalCost) / months - monthlyInterest;
    // HOW MANY MONTHS
    const month = months;
    // TOTAL MONTHLY PAYMENT
    const monthlyPayment = parseFloat(monthlyBill);  
    //
    const longTermCost = parseFloat(totalCost);
        
    tableRows(month, monthlyPayment, monthlyInterest,  monthlyPrincipal, longTermCost);

}


// POPULATES THE MAIN DISPLAY NUMBERS
function displayOutputs(months, annualRate, principal, interestValue, interestTotal, monthlyPayment) {
    //  months 
    termDisplay.textContent = `${months}`;
    // annual %
    interestRateDisplay.textContent = `${annualRate}%`;
    // Base principal
    principalDisplay.textContent = `€ ${parseFloat(principal).toLocaleString()}`;    
    // added interest
    interestDisplay.textContent = `€ ${parseFloat(interestValue.toFixed(2)).toLocaleString()}`;
    // total cost
    costDisplay.textContent = `€ ${parseFloat(interestTotal.toFixed(2)).toLocaleString()}`;
    // Monthly Payments
    monthlyDisplay.textContent = `€ ${parseFloat(monthlyPayment.toFixed(2)).toLocaleString()}`;  
}


// POPULATES THE TABLE BELOW THE MAIN DISPLAY
function tableRows(months, monthlyPayment, monthlyInterest, monthlyPrincipal,  longTermCost) {
    let accummulatedInterest = 0;
    let balanceReduction = longTermCost;

    for (let i = 1; i <= months; i++) {
        accummulatedInterest += monthlyInterest;
        balanceReduction -= monthlyPrincipal;
        
        // CREATING THE ROW
        const tableRow = document.createElement("tr");

        // ROW NUMBER FOR EACH MONTH
        const rowNumber = document.createElement("th");
        rowNumber.classList.add("text-center");
        rowNumber.setAttribute("scope", "row");
        rowNumber.textContent = i;

        // AMOUNT PAID PER MONTH TOTAL
        const paymentCell = document.createElement("td");
        paymentCell.classList.add("text-center");
        paymentCell.textContent = `€${parseFloat(monthlyPayment.toFixed(2)).toLocaleString()}`;

        // AMOUNT PAID OFF LOAN MINUS THE INTEREST
        const principalCell = document.createElement("td");
        principalCell.classList.add("text-center");
        principalCell.textContent =`€${parseFloat(monthlyPrincipal.toFixed(2)).toLocaleString()}`;

        // INTEREST AMOUNT PAID PER MONTH
        const interestCell = document.createElement("td");
        interestCell.classList.add("text-center");
        interestCell.textContent =`€${parseFloat(monthlyInterest.toFixed(2)).toLocaleString()}`;

        // ADDING UP TOTAL INTEREST PAID MONTH BY MONTH
        const totalInterestCell = document.createElement("td");
        totalInterestCell.classList.add("text-center");
        totalInterestCell.textContent =`€${parseFloat(accummulatedInterest.toFixed(2)).toLocaleString()}`;

        // REMOVING MONTHLY PAYMENT FROM LOAN BALANCE
        const balanceCell = document.createElement("td");
        balanceCell.classList.add("text-center");
        balanceCell.textContent =`€${parseFloat(balanceReduction.toFixed(2)).toLocaleString()}`;

        tableRow.append(rowNumber, paymentCell, principalCell, interestCell, totalInterestCell, balanceCell);
        tableBody.appendChild(tableRow);
    }
    principalInput.value = "";
    termInput.value = "";
    interestInput.value = "";   
     
}


// SIMPLE FUNCTION THAT CLEARS THE TABLE TO ALLOW SPACE FOR THE NEXT CALCULATION ON SUBMITION OF FORM
function clearTable() {
    tableBody.textContent = "";

    termDisplay.textContent = "0"; 
    
    interestRateDisplay.textContent = "0%"; 
    principalDisplay.textContent = "€ 0";
    
    interestDisplay.textContent = "€ 0"; 
    costDisplay.textContent = "€ 0"; 
    monthlyDisplay.textContent = "€ 0"; 
    
   
}



calculateBtn.addEventListener("click", calculateMortgage);
