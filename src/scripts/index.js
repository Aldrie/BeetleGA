import * as math from './math';
import * as render from './render';
import { delay } from './utils';

const inputPopulationSize = document.querySelector('#populationSize');
const inputIterationsCount = document.querySelector('#iterationsCount');
const buttonStart = document.querySelector('#start');

async function start() {
  let generation = 0;

  let population = Array.apply(null, { length: parseInt(inputPopulationSize.value) }).map(() => {
    const r = math.randomInt(0, 255);
    const g = math.randomInt(0, 255);
    const b = math.randomInt(0, 255);
    return { r, g, b, fitness: math.fitness(r, g, b) };
  });

  render.population(population);
  render.rank(math.sortBetter(population));
  render.generation(generation);

  do {
    const sortedPopulation = math.sortBetter(population);
    population = math.generateCrossroveredPopulation(sortedPopulation);
    render.population(population);
    render.rank(sortedPopulation);
    render.generation(generation);
    generation++;
    await delay(0);
  } while(generation <= parseInt(inputIterationsCount.value));
}

buttonStart.addEventListener('click', async() => await start());