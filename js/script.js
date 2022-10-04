let randomIdPerson = new Array(10).fill(null).map(() => getRandomIntInclusive(1, 826));

fetch(`https://rickandmortyapi.com/api/character/${randomIdPerson}`)
       .then((response) => {
              return response.json();
       })
       .then((listOfPersons) => {
              for (let key of listOfPersons) {
                     createCard(key);
              }
       });


const container = document.querySelector('.container');
container.style.justifyContent = 'space-around';

function createCard(listOfPersons) {
       const card = document.createElement('div');
       card.classList.add('card');

       const cardInfo = document.createElement('div');
       cardInfo.classList.add('card-info');

       const cardTitle = document.createElement('div');
       cardTitle.classList.add('title');
       const cardTitleH1 = document.createElement('h1');
       cardTitleH1.innerHTML = listOfPersons.name;
       cardTitle.append(cardTitleH1);

       const cardStatus = document.createElement('div');
       cardStatus.classList.add('status');
       const cardLiveStatus = document.createElement('div');
       cardLiveStatus.classList.add('live-status');
       if (listOfPersons.status === 'Dead') {
              cardLiveStatus.classList.add('dead');
       }

       const cardStatusP = document.createElement('p');
       const cardStatusPText = document.createTextNode(`${listOfPersons.species} -- ${listOfPersons.status}`);

       cardStatus.append(cardLiveStatus);
       cardStatusP.append(cardStatusPText);
       cardStatus.append(cardStatusP);
       cardTitle.append(cardStatus);
       cardInfo.append(cardTitle);

       const cardContent = document.createElement('div');
       cardContent.classList.add('content');
       const cardContentText = document.createTextNode(`${listOfPersons.location.name}`);
       cardContent.append(cardContentText);
       cardInfo.append(cardContent);

       card.append(cardInfo);

       const cardImage = document.createElement('div');
       cardImage.classList.add('card-image');
       const image = document.createElement('img');
       image.src = listOfPersons.image;
       image.alt = 'Some image';
       cardImage.append(image);
       card.append(cardImage);

       container.append(card);
}


const inputAll = document.querySelectorAll('input');

for (let key of inputAll) {
       key.addEventListener('change', function () {
              const inputsGender = document.getElementsByName('gender');
              const inputsStatus = document.getElementsByName('status');

              let genderQweryParams = '';
              let statusQweryParams = '';

              for (let key of inputsGender) {
                     if (key.checked) {
                            genderQweryParams = `${key.name}=${key.id}`;
                     }
              }

              for (let key of inputsStatus) {
                     if (key.checked) {
                            statusQweryParams = `${key.name}=${key.id}`;
                     }
              }

              let qweryParams = genderQweryParams + '&' + statusQweryParams;
              return filterPersons(qweryParams);
       });
};


function filterPersons(queryParams) {
       fetch(`https://rickandmortyapi.com/api/character?${queryParams}`)
              .then((response) => {
                     return response.json();
              })
              .then((data) => {
                     container.innerHTML = '';
                     for (let key of data.results) {
                            createCard(key);
                     }
              });
};


function getRandomIntInclusive(min, max) {
       min = Math.ceil(min);
       max = Math.floor(max);
       return Math.floor(Math.random() * (max - min + 1)) + min;
}