import * as math from './math';
import * as render from './render';
import { delay } from './utils';

let generation = 1;

let population = Array.apply(null, { length: 200 }).map(() => {
  const r = math.randomInt(0, 255);
  const g = math.randomInt(0, 255);
  const b = math.randomInt(0, 255);
  return { r, g, b, fitness: math.fitness(r, g, b) };
});

async function start() {
  render.population(population);
  render.rank(math.sortBetter(population));
  render.generation(generation);

  do {
    const sortedPopulation = math.sortBetter(population);
    generation++;
    population = math.generateCrossroveredPopulation(sortedPopulation);

    render.population(population);
    render.rank(sortedPopulation);
    render.generation(generation);

    await delay(0);
  } while(generation <= 200);
}

start().then(() => console.log('started'));