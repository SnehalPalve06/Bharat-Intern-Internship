// public/script.js
let balance = 0;

function updateBalance() {
    document.getElementById("balance").textContent = balance.toFixed(2);
}

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    balance += amount;

    updateBalance();

    const transactionList = document.getElementById("transaction-list");
    const transactionItem = document.createElement("li");
    transactionItem.textContent = `${description}: $${amount.toFixed(2)}`;
    transactionList.appendChild(transactionItem);

    // Clear form fields
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

window.onload = function () {
    updateBalance();
};
