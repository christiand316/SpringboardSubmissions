function createAccount(pin, amount = 0) {
    let balance = amount;
    let accountPin = pin;

    return {
        checkBalance: function (inputPin) {
            if (inputPin !== accountPin) {
                return "Invalid PIN.";
            }
            return `$${balance}`;
        },
        deposit: function (inputPin, depositAmount) {
            if (inputPin !== accountPin) {
                return "Invalid PIN.";
            }
            balance += depositAmount;
            return `Succesfully deposited $${depositAmount}. Current balance: $${balance}.`;
        },
        withdraw: function (inputPin, withdrawalAmount) {
            if (inputPin !== accountPin) {
                return "Invalid PIN.";
            }
            if (withdrawalAmount > balance) {
                return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            }
            balance -= withdrawalAmount;
            return `Succesfully withdrew $${withdrawalAmount}. Current balance: $${balance}.`;
        },
        changePin: function (currentPin, newPin) {
            if (currentPin !== accountPin) {
                return "Invalid PIN.";
            }
            accountPin = newPin;
            return "PIN successfully changed!";
        },
    };
}

module.exports = { createAccount };
