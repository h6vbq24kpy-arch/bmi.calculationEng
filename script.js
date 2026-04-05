//label要素の呼び出し
const heightInput = document.querySelector('.height input');
const weightInput = document.querySelector('.weight input');
const resultOutput = document.querySelector('.result input');
const categoryOutput = document.querySelector('.BMIcategory textarea');
const table = document.querySelector('.hidden');
const sns = document.querySelector('.Twitter');


// input validation
function checkinput(inputelement) {
    inputelement.addEventListener('input', () => {
        const value = inputelement.value;
        
        // full-width numbers not allowed
        // alert("半角数字を入力してください");
        if (/[０-９]/.test(value)) {
            alert("Please enter numbers using standard (half-width) digits.");
            inputelement.value = value.replace(/[０-９]/g, "");
            return;
        }

        // alphabet not allowed
        if (/[A-Za-z]/.test(value)) {
            alert("Numbers only, if you would be so kind.");
            inputelement.value = value.replace(/[A-Za-z]/g, "");
            return;
        }

        // Japanese characters not allowed
        if (/[あ-ん]/.test(value)) {
            alert("Let's stick to numbers, shall we?");
            inputelement.value = value.replace(/[あ-ん]/g, "");
            return;
        }

        // symbols not allowed
        if(/[!"#$%&'()=~|{`}*+_?><]/.test(value)) {
            alert("No need for artistic input. Numbers will do.");
            inputelement.value = value.replace(/[!"#$%&'()=~|{`}*+_?><]/g, "");
        }
    })
}

checkinput(heightInput);
checkinput(weightInput);


// button
const clickbutton = document.querySelector('button');

clickbutton.addEventListener('click', () => {
    calculate();
    define();
    showTable();
})


// calculation
function calculate() {
    const height = heightInput.value;
    const weight = weightInput.value;

    if (height === '' || weight === '') {
        // alert('身長と体重を入力してください');
        alert('Do provide both height and weight. We are not mind readers.');
        resultOutput.value = '';
        categoryOutput.value = '';
        return;
    }

    const calculation = weight / (height / 100) ** 2;
    resultOutput.value = calculation.toFixed(1);
}


// BMI judgement + British sarcasm
function define() {
    if (!resultOutput.value) return;

    const bmi = Number(resultOutput.value);

    let jokes = [];

    if (bmi < 18.5) {
        jokes = [
            'A strong gust of wind may be a concern.',
            'You do appear to be travelling light.',
            'One biscuit might change everything.',
            'Lunch seems to have been optional.',
            'You might be described as... efficiently constructed.',
            'One suspects gravity has very little to work with.'
        ];
    } else if (bmi < 25) {
        jokes = [
            'How wonderfully reasonable.',
            'A rare victory for balance.',
            'Quite respectable, actually.',
            'You’ve left me with very little to mock.',
            'Comfortably within the bounds of good sense.',
            'Perfectly adequate, in the nicest possible way.'
        ];
    } else {
        jokes = [
            'A bold commitment to comfort.',
            'One does seem to enjoy the finer portions in life.',
            'Not tragic, just… well-fed.',
            'You’ve been taking “treat yourself” rather seriously.',
            'A slightly ambitious relationship with portion sizes.',
            'One might say you’ve embraced abundance.'
        ];
    }

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    categoryOutput.value = randomJoke;
}


// table display
function showTable() {
    const height = heightInput.value;
    const weight = weightInput.value;

    if (height === '' || weight === '') {
        return;
    }

    const tableHTML = `
        <table class="bmi-table" border="1">
            <tr>
                <th>BMI</th>
                <th>Status</th>
            </tr>
            <tr class="low">
                <td>Below 18.5</td>
                <td>Underweight</td>
            </tr>
            <tr class="mid">
                <td>18.5 ~ 24.9</td>
                <td>Normal</td>
            </tr>
            <tr class="max">
                <td>25+</td>
                <td>Overweight</td>
            </tr>
        </table>
    `;

    table.innerHTML = tableHTML;

    const cell = document.querySelector('.low');
    const cell2 = document.querySelector('.mid');
    const cell3 = document.querySelector('.max');

    const bmi = Number(resultOutput.value);

    if (bmi < 18.5) {
        cell.classList.add('highlight');
    } else if (bmi < 25) {
        cell2.classList.add('highlight');
    } else {
        cell3.classList.add('highlight');
    }

    const snsshare = `<a
        href="https://twitter.com/intent/tweet?text=My BMI is ${resultOutput.value}. Apparently, I am ${categoryOutput.value}."
        target="_blank"
        rel="nofollow noopener noreferrer"
        >Share this delightful news on Twitter
        </a>`

    sns.innerHTML = snsshare;
}


// reset
const resetbutton = document.querySelector('.reset');

resetbutton.addEventListener('click', () => {
    resetInput();
})

function resetInput() {
    heightInput.value  = '';
    weightInput.value  = '';
    resultOutput.value = '';
    categoryOutput.value = '';
    table.innerHTML = '';
    sns.innerHTML = '';
}