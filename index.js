const timeLeftEl = document.getElementById('timeleft')
const scoreEl = document.getElementById('score')
const wordEl = document.getElementById('word')
const gameEnd = document.getElementById('container')
const inputWord = document.getElementById('typeword')
const selectLevel = document.getElementById('levels')
const noCheat = document.getElementById('nuhuh')

let count = 11
let score = 1
let apiUrl = 'https://random-word-api.herokuapp.com/word?length=7'
const originalContent = container.innerHTML;


// Kopyala yapistir hilesi yapmaya calisirsa nuuh uhhh gif i cikiyor :D
inputWord.addEventListener("paste", function() {
  noCheat.innerHTML = '<img style="width: 8rem; margin: 5px;" src="https://media.tenor.com/0CljOyp-rU8AAAAM/tf2-scout-tf2.gif" alt="" srcset="">';


setTimeout(function() {
    noCheat.innerHTML = '';
  }, 3500);
});


// Level Secimi (localStorage ile kayit filan yapiyoruz)
selectLevel.addEventListener('change', function() {

  const selectedValue = selectLevel.value;

  localStorage.setItem('levelKey', selectedValue);
  
  if (selectedValue == 1) {
    apiUrl = 'https://random-word-api.herokuapp.com/word?length=6'
  } else if(selectedValue == 2) {
    apiUrl = 'https://random-word-api.herokuapp.com/word?length=9'
  } else if(selectedValue == 3) {
    apiUrl = 'https://random-word-api.herokuapp.com/word?length=13'
  }

  getWord()
});

window.addEventListener('load', function() {
  const selectedLevel = localStorage.getItem('levelKey');
  if (selectedLevel) {
    selectLevel.value = selectedLevel;
    
    // Seviyeye göre API URL'sini güncelle
    if (selectedLevel == 1) {
      apiUrl = 'https://random-word-api.herokuapp.com/word?length=6'
    } else if(selectedLevel == 2) {
      apiUrl = 'https://random-word-api.herokuapp.com/word?length=9'
    } else if(selectedLevel == 3) {
      apiUrl = 'https://random-word-api.herokuapp.com/word?length=13'
    }

    getWord();
  }
});


// Api ile Rastgele Kelime Aliyoruz
function getWord() {
    fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                wordEl.textContent = data[0]

                inputWord.addEventListener('input', controlWord)
            })
            .catch(error => {
              wordEl.textContent = error
            });
}


// Geri Sayimi Baslatiyoruz
const timer = setInterval(function() {
    count--;
    timeLeftEl.innerText = count + 's'
    if (count === 0) {
      clearInterval(timer);
      gameEnd.innerHTML = '<h1 class="text-white text-2xl font-bold">GAME OVER</h1> <h1 class="text-white text-lg font-bold">Score: ' + (score - 1) + '</h1>  <button onclick="location.reload()" class="bg-slate-400 text-white w-24 h-12 mt-4">RESTART</button>';
    }
  }, 1000);


// Kelimeyi Kontrol Ediyoruz
function controlWord() {

  if (inputWord.value === wordEl.textContent) {
      inputWord.value = '';
      scoreEl.innerText = score++
      count+=2
      timeLeftEl.innerText = count + 's'
      
      getWord()
        
  }
}

getWord()