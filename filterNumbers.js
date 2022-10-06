const lstNrEl = document.getElementById('lstNr');
const outputDivEl = document.getElementById('outputDiv');
const btnGenEl = document.getElementById('btnGen');
const inputFileEl = document.getElementById('inputFile');

let lstNr, lstEvenNr = [], isNaNum = false, btnGenRand, contentEvenArr = [];

lstNrEl.addEventListener('change', (ev) => {
    if(ev.target.value.trim() === '') {
        alert('Nu ați introdus nicio valoare!');
        location.reload();
    }
    else {
        lstNr = ev.target.value.trim().split(' ').map(Number);
        console.log(lstNr);
    }
});

inputFileEl.addEventListener('change', (ev) => {
    let file = ev.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = readerEvent => {
        let content = readerEvent.target.result.trim().split('\r\n');
        for (let i = 1; i < content.length; i++) {
            if(i % 2 !== 0) {
                contentEvenArr.push(content[i]);
            }
        }
    console.log(content);
    displayFromFileOutput(contentEvenArr);
    }
});

function filterEvenNumbers() {
    for (let i = 0; i < lstNr.length; i++) {
        if (isNaN(lstNr[i])) {
            isNaNum = true;
        } else {
            if (lstNr[i] % 2 === 0) {
                lstEvenNr.push(lstNr[i]);
            }
        }
    }

    if(isNaNum) {
        alert('Vă rog să introduceți doar numere!');
        location.reload();
    }

    console.log(lstEvenNr);
    displayOutput(lstEvenNr);
}

btnGenEl.addEventListener('click', (ev) => {
    ev.target.value = generateRandom(10);
    btnGenRand = ev.target.value.trim().split(',').join(' ');
    lstNrEl.value = btnGenRand;
    lstNr = btnGenRand;
});

function generateRandom(max) {
    return Array.from({length: max}, () => Math.floor(Math.random() * max));
}

function displayOutput(lstEvenNr) {
    outputDivEl.innerHTML = '';
    const evenNumDisplay = document.createElement('p');

    evenNumDisplay.textContent = `Numerele pare din șirul introdus sunt: ${lstEvenNr.join(' ')}`;

    outputDivEl.appendChild(evenNumDisplay);
}

function displayFromFileOutput(lstEvenLines) {
    outputDivEl.innerHTML = '';
    const evenLinesDisplay = document.createElement('p');

    evenLinesDisplay.textContent = `Rândurile pare din fișierul selectat sunt: ${lstEvenLines.join('\r\n')}`;

    outputDivEl.appendChild(evenLinesDisplay);
}
