//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //hide loader
    document.getElementById('results').style.display = 'none';

    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult, 2000);

    e.preventDefault();
});

function calculateResult(){
    console.log("Calculating...");

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const montlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const pricipal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;
    //Compute montly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (pricipal*x*calculatedInterest)/(x-1);
    //proveruvame dali monthly e konecen broj
    if(isFinite(monthly)){
        montlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-pricipal).toFixed(2);


        document.getElementById('results').style.display = 'block';

        // show loader
        document.getElementById('loading').style.display = 'none';
    }
    else {
        showError('Please check your numbers');
    }
}

function showError(error){

    document.getElementById('results').style.display = 'none';

    // show loader
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));
    //GEt elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}
function clearError(){
    document.querySelector('.alert').remove();
}