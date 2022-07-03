const container = document.querySelector('.container');
const maleCheckbox = document.querySelector('#male');
const femaleCheckbox = document.querySelector('#female');
const aliveCheckbox = document.querySelector('#alive');
const deadCheckbox = document.querySelector('#dead');

updateCardList();

maleCheckbox.addEventListener('change', onCheckboxChange(femaleCheckbox));
femaleCheckbox.addEventListener('change', onCheckboxChange(maleCheckbox));

aliveCheckbox.addEventListener('change', onCheckboxChange(deadCheckbox));
deadCheckbox.addEventListener('change', onCheckboxChange(aliveCheckbox));

function onCheckboxChange(oppositeCheckbox) {
	return event => {
		if (oppositeCheckbox.checked && event.currentTarget.checked) {
			oppositeCheckbox.checked = false;
		}
		updateCardList();
	};
}

function updateCardList() {
	clearCardList();
	drawCardListPage(getSourceUrl());
}

function drawCardListPage(url) {
	return fetch(url).then(response => response.json()).then(data => {
		data.results.forEach(element => {
			createCard(element)
		});
	});
}

function getSourceUrl() {
	const url = new URL('https://rickandmortyapi.com/api/character');

	if (maleCheckbox.checked) {
		url.searchParams.append('gender', 'male');
	} else if (femaleCheckbox.checked) {
		url.searchParams.append('gender', 'female');
	}

	if (aliveCheckbox.checked) {
		url.searchParams.append('status', 'alive');
	} else if (deadCheckbox.checked) {
		url.searchParams.append('status', 'dead');
	}

	return url.toString();
}

function clearCardList() {
	container.innerHTML = '';
}

function createCard(element) {
	const card = document.createElement('div');
	card.classList.add('card');

	const cardInfo = document.createElement('div');
	cardInfo.classList.add('card-info');

	const cardTitle = document.createElement('div');
	cardTitle.classList.add('title');
	const cardTitleH1 = document.createElement('h1');
	cardTitleH1.innerHTML = element.name;
	cardTitle.append(cardTitleH1);

	const cardStatus = document.createElement('div');
	cardStatus.classList.add('status');
	const cardLiveStatus = document.createElement('div');
	cardLiveStatus.classList.add('live-status');

	if (element.status === 'Dead') {
		cardLiveStatus.classList.add('dead');
	}

	const cardStatusP = document.createElement('p');
	const cardStatusPText = document.createTextNode(`${element.species} -- ${element.status}`);
	cardStatus.append(cardLiveStatus);
	cardStatusP.append(cardStatusPText);
	cardStatus.append(cardStatusP);
	cardTitle.append(cardStatus);
	cardInfo.append(cardTitle);

	const cardContent = document.createElement('div');
	cardContent.classList.add('content');
	const cardContentText = document.createTextNode(element.location.name);
	cardContent.append(cardContentText);
	cardInfo.append(cardContent);

	card.append(cardInfo);

	const cardImage = document.createElement('div');
	cardImage.classList.add('card-image');
	const image = document.createElement('img');
	image.src = element.image
	image.alt = 'Some image';
	cardImage.append(image);
	card.append(cardImage);

	container.append(card);
}
