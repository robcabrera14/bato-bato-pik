const defaultData = () => {
  return [
    { name: 'Ikaw', score: 0, pick: '' },
    { name: 'Kompyuter', score: 0, pick: '' },
  ];
};

// save to local storage
const saveData = data => {
  localStorage.setItem('batoBatoPik', JSON.stringify(data));
};

// get from local storage
const getData = function (defaultData) {
  try {
    const jsonData = JSON.parse(localStorage.getItem('batoBatoPik'));
    return typeof jsonData === 'object' && jsonData ? jsonData : defaultData;
  } catch (error) {
    return defaultData;
  }
};

const data = getData(defaultData());

saveData(data);

const maxScore = 10;

// dom elements
const playerOneName = document.querySelector('.p1');
const scores = document.querySelectorAll('.score');
const pickImg = document.querySelectorAll('.pick-img');
const pickName = document.querySelectorAll('.pick-name');
const gameStatus = document.querySelectorAll('.status');
const cards = document.querySelectorAll('.card');

const display = (color, bgColor1, bgColor2, text1, text2) => {
  // update player name
  playerOneName.textContent = data[0].name;

  // update score
  scores[0].textContent = data[0].score;
  scores[1].textContent = data[1].score;

  // update card colors
  cards[0].style.backgroundColor = bgColor1;
  cards[0].style.color = color;
  cards[1].style.backgroundColor = bgColor2;
  cards[1].style.color = color;

  // update img source
  pickImg[0].src = `assets/images/${text1}.png`;
  pickImg[1].src = `assets/images/${text2}.png`;

  // update pick name
  pickName[0].textContent = text1;
  pickName[1].textContent = text2;
};

// display current data
if (data[0].status === 'Panalo') {
  display('#fff', '#4d944d', '#bb4646', data[0].pick, data[1].pick);
} else if (data[1].status === 'Panalo') {
  display('#fff', '#bb4646', '#4d944d', data[0].pick, data[1].pick);
} else if (data[0].status === 'Tabla' && data[1].status === 'Tabla') {
  display('#000', '', '', data[0].pick, data[1].pick);
} else {
  display('#000', '', '', 'question', 'question');
  pickName[0].textContent = '';
  pickName[1].textContent = '';
}

// change player 1 name
playerOneName.addEventListener('input', e => {
  data[0].name = e.target.textContent;
  playerOneName.textContent = data[0].name;
  saveData(data);
});

// computer function for click event
const computer = () => {
  const rand = Math.ceil(Math.random() * 3);
  switch (rand) {
    case 1:
      data[1].pick = 'bato';
      break;
    case 2:
      data[1].pick = 'papel';
      break;
    case 3:
      data[1].pick = 'gunting';
      break;
    default:
      return false;
  }
};

const checkWinner = () => {
  const drawStatus = () => {
    data[0].status = 'Tabla';
    data[1].status = 'Tabla';
  };

  const player1WinnerStatus = () => {
    data[0].status = 'Panalo';
    data[1].status = 'Talo';
  };

  const computerWinnerStatus = () => {
    data[1].status = 'Panalo';
    data[0].status = 'Talo';
  };

  const playerPick = data[0].pick;
  const computerPick = data[1].pick;
  if (data[0].pick === 'papel' && data[1].pick === 'papel') {
    drawStatus();
    display('#000', '', '', playerPick, computerPick);
  } else if (data[0].pick === 'bato' && data[1].pick === 'bato') {
    drawStatus();
    display('#000', '', '', playerPick, computerPick);
  } else if (data[0].pick === 'gunting' && data[1].pick === 'gunting') {
    drawStatus();
    display('#000', '', '', playerPick, computerPick);
  } else if (data[0].pick === 'papel' && data[1].pick === 'bato') {
    player1WinnerStatus();
    data[0].score += 1;
    display('#fff', '#4d944d', '#bb4646', playerPick, computerPick);
  } else if (data[0].pick === 'bato' && data[1].pick === 'gunting') {
    player1WinnerStatus();
    data[0].score += 1;
    display('#fff', '#4d944d', '#bb4646', playerPick, computerPick);
  } else if (data[0].pick === 'gunting' && data[1].pick === 'papel') {
    player1WinnerStatus();
    data[0].score += 1;
    display('#fff', '#4d944d', '#bb4646', playerPick, computerPick);
  } else if (data[0].pick === 'bato' && data[1].pick === 'papel') {
    computerWinnerStatus();
    data[1].score += 1;
    display('#fff', '#bb4646', '#4d944d', playerPick, computerPick);
  } else if (data[0].pick === 'gunting' && data[1].pick === 'bato') {
    computerWinnerStatus();
    data[1].score += 1;
    display('#fff', '#bb4646', '#4d944d', playerPick, computerPick);
  } else {
    computerWinnerStatus();
    data[1].score += 1;
    display('#fff', '#bb4646', '#4d944d', playerPick, computerPick);
  }
};

// pick 1 using click event
const pickBtn = document.querySelectorAll('.btn-pick').forEach(btn => {
  btn.addEventListener('click', e => {
    if (data[0].score === maxScore) {
      gameStatus[0].textContent = 'Panalo';
      gameStatus[1].textContent = 'Talo';
    } else if (data[1].score === maxScore) {
      gameStatus[1].textContent = 'Panalo';
      gameStatus[0].textContent = 'Talo';
    } else {
      if (btn.classList.contains('bato')) {
        data[0].pick = 'bato';
        computer();
        checkWinner();
        saveData(data);
      } else if (btn.classList.contains('papel')) {
        data[0].pick = 'papel';
        computer();
        checkWinner();
        saveData(data);
      } else {
        data[0].pick = 'gunting';
        computer();
        checkWinner();
        saveData(data);
      }
    }
  });
});

// reset data
const resetBtn = document.querySelector('.btn-reset').addEventListener('click', () => {
  data[0].score = 0;
  data[1].score = 0;
  data[0].status = '';
  data[1].status = '';
  display('#fff', '', '', '', '');
  pickImg[0].src = `assets/images/question.png`;
  pickImg[1].src = `assets/images/question.png`;
  saveData(data);
});
