let secret = String(Math.floor(Math.random() * 9000) + 1000);
    const hintsEl = document.getElementById('hints');
    const g = document.getElementById('guesses');
    let attempts = 0;
    console.log('secret', secret);
    hintsEl.innerText = 'Угадайте четырехзначное число. Попыток: 0.';

    let all_guess = [];
function check_bulls_cows(guess, secret) {
    let bulls = 0;
    let cows = 0;

    const secret_digit = secret.split('');
    const guess_digit = guess.split('');


    for (let i = 0; i < 4; i++) {
        if (guess_digit[i] === secret_digit[i]) {
            bulls++;
        }
        else if (guess_digit.includes(secret_digit[i])){
            cows++;
        }

    }


    return { bulls: bulls, cows: cows };
}


let OnSubmit = (event) => {
    event.preventDefault()
    let formData = new FormData(event.target);
    
    const hintsEl = document.getElementById('hints');
    const guessSubmitBtn = document.querySelector('#guess_form button[type="submit"]');

    

    
    let digits = formData.getAll('digit');
    const digits_int = digits.map(str => Number(str));

    let guess = digits_int.join(''); 

    
    all_guess.push(guess)
    attempts++;
    
    const result = check_bulls_cows(guess, secret);

    if (result.bulls === 4) {
        
        
        hintsEl.innerText = ` ПОБЕДА Вы угадали число ${secret}! (Попыток: ${attempts})`;
        
        if (guessSubmitBtn) {
            guessSubmitBtn.disabled = true;
        }
        restart.classList.remove('hidden');
        
        return; 
    }
    
    
    hintsEl.className = "text-2xl bg-gray-100 p-2 text-center mt-2 border border-gray-300";
    hintsEl.innerHTML = `
        <div class="font-bold">Попытка ${attempts}: ${guess}</div>
        <div>
            Быки --- ${result.bulls} 
        </div>
        <div>
            Коровы --- ${result.cows} 
        </div>
    `;

    guesses.classList.remove('hidden');

    g.innerHTML = ""
    let t = all_guess.length-10 < 0 ? 0 :all_guess.length-10
    
    for (let i = all_guess.length-1; i >= t;i--){
        
        
        const newContent = `<p class = "mr-5"> ${all_guess[i]}</p>`;

    
        g.innerHTML += newContent;
    }
    
    event.target.querySelectorAll('input[name="digit"]').forEach(input => input.value = '');
    event.target.querySelector('input[name="digit"]').focus();
}


document.getElementById('guess_form').addEventListener('submit', OnSubmit);
