export const fitness = (r, g, b) => {
  return ((255-r) + (255-g) + (255-b))/100;
};

export const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculateFitnessPopulation = (population) =>
  population.map((value) => ({
    ...value,
    fitness: fitness(value.r, value.g, value.b)
  })
);

export const sortBetter = (data) => {
  return data.sort((prev, current) => prev.fitness > current.fitness ? -1 : prev.fitness < current.fitness ? 1 : 0);
};

export const weightedSortFromIndex = (data) => {
  const numbers = [];
  data.forEach((value, index) => {
    for(let i = data.length/4; i > index; i--) {
      numbers.push(value);
    }
  });
  return numbers[randomInt(0, numbers.length -1)];
};

export const generateCrossroveredPopulation = (population) => {
  const crossover = (genome1, genome2) => {
    const randomKey = ['r', 'g', 'b'][randomInt(0, 2)];
    const randomNumber = randomInt(0, 1);
    const randomGenome1 = randomNumber === 0 ? genome1 : genome2;
    const randomGenome2 = randomNumber === 0 ? genome2 : genome1;

    const mutation = (genome) => {
      const probability = !!([...Array(8).keys()].find((value) => value === randomInt(0, 99)));

      if(probability) {
        const mutationKey = ['r', 'g', 'b'][randomInt(0, 2)];
        const mutationValue = randomInt(-100, 100);
        const mutationResult = genome[mutationKey] + mutationValue;
        const mutationGenome = {
          ...genome,
          [mutationKey]: mutationResult > 255 ? 255 : mutationResult < 0 ? 0 : mutationResult, 
        };

        return {
          ...mutationGenome,
          fitness: fitness(mutationGenome.r, mutationGenome.g, mutationGenome.b),
        };
      }

      return genome;
    };

    return mutation({
      ...randomGenome2,
      [randomKey]: randomGenome1[randomKey],
    });
  };

  const newPopulation = [population[0]];

  for(let i=0; i<population.length-1; i++) {
    const genomeA = weightedSortFromIndex(population);
    const genomeB = weightedSortFromIndex(population);
    newPopulation.push(crossover(genomeA, genomeB));
  }

  return newPopulation;
};