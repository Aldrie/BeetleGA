import { bug, rankItem, generationText } from './templates';

const populationDiv = document.querySelector('.population');
const rankDiv = document.querySelector('.rank');
const generationSpan = document.querySelector('.generation');

export const population = (data) => {
  let result = '';

  data.forEach((value) => {
    result += bug(value);
  });

  populationDiv.innerHTML = result;
}

export const rank = (data) => {
  let result = '';

  data.forEach((value) => {
    result += rankItem(value);
  });

  rankDiv.innerHTML = result;
}

export const generation = (number) => {
  generationSpan.innerHTML = generationText(number);
}