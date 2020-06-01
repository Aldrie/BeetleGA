(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCrossroveredPopulation = exports.weightedSortFromIndex = exports.sortBetter = exports.calculateFitnessPopulation = exports.randomInt = exports.random = exports.fitness = void 0;

const fitness = (r, g, b) => {
  return (255 - r + (255 - g) + (255 - b)) / 100;
};

exports.fitness = fitness;

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

exports.random = random;

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.randomInt = randomInt;

const calculateFitnessPopulation = population => population.map(value => ({ ...value,
  fitness: fitness(value.r, value.g, value.b)
}));

exports.calculateFitnessPopulation = calculateFitnessPopulation;

const sortBetter = data => {
  return data.sort((prev, current) => prev.fitness > current.fitness ? -1 : prev.fitness < current.fitness ? 1 : 0);
};

exports.sortBetter = sortBetter;

const weightedSortFromIndex = data => {
  const numbers = [];
  data.forEach((value, index) => {
    for (let i = data.length / 4; i > index; i--) {
      numbers.push(value);
    }
  });
  return numbers[randomInt(0, numbers.length - 1)];
};

exports.weightedSortFromIndex = weightedSortFromIndex;

const generateCrossroveredPopulation = population => {
  const crossover = (genome1, genome2) => {
    const randomKey = ['r', 'g', 'b'][randomInt(0, 2)];
    const randomNumber = randomInt(0, 1);
    const randomGenome1 = randomNumber === 0 ? genome1 : genome2;
    const randomGenome2 = randomNumber === 0 ? genome2 : genome1;

    const mutation = genome => {
      const probability = !![...Array(8).keys()].find(value => value === randomInt(0, 99));

      if (probability) {
        const mutationKey = [['r', 'g', 'b'][randomInt(0, 2)]];
        const mutationValue = randomInt(-100, 100);
        const mutationResult = genome[mutationKey] + mutationValue;
        return { ...genome,
          [mutationKey]: mutationResult > 255 ? 255 : mutationResult < 0 ? 0 : mutationResult
        };
      }

      return genome;
    };

    return mutation({ ...randomGenome2,
      [randomKey]: randomGenome1[randomKey]
    });
  };

  const newPopulation = [population[0]];

  for (let i = 0; i < population.length; i++) {
    const genomeA = weightedSortFromIndex(population);
    const genomeB = weightedSortFromIndex(population);
    newPopulation.push(crossover(genomeA, genomeB));
  }

  return newPopulation;
};

exports.generateCrossroveredPopulation = generateCrossroveredPopulation;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generation = exports.rank = exports.population = void 0;

var _templates = require("./templates");

const populationDiv = document.querySelector('.population');
const rankDiv = document.querySelector('.rank');
const generationSpan = document.querySelector('.generation');

const population = data => {
  let result = '';
  data.forEach(value => {
    result += (0, _templates.bug)(value);
  });
  populationDiv.innerHTML = result;
};

exports.population = population;

const rank = data => {
  let result = '';
  data.forEach(value => {
    result += (0, _templates.rankItem)(value);
  });
  rankDiv.innerHTML = result;
};

exports.rank = rank;

const generation = number => {
  generationSpan.innerHTML = (0, _templates.generationText)(number);
};

exports.generation = generation;

},{"./templates":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generationText = exports.rankItem = exports.bug = void 0;

const bug = ({
  r,
  g,
  b
}) => `<div class="bug">
  <div class="color" style="background: rgb(${r}, ${g}, ${b})"></div>
  <img src="./assets/bug.png" width="40"/>
  <span>(${r},${g},${b})</span>
</div>`;

exports.bug = bug;

const rankItem = ({
  r,
  g,
  b,
  fitness
}) => `<div class="rank-item">
  <div class="bug">
    <div class="color" style="background: rgb(${r}, ${g}, ${b})"></div>
    <img src="./assets/bug.png" width="60"/>
  </div>
  <div class="rank-values">
    <span style="color: rgb(${r}, ${g}, ${b})">color: (${r},${g},${b})</span>
    <span>fitness: ${fitness}</span>
  </div>
</div>`;

exports.rankItem = rankItem;

const generationText = number => `<span class="generation">Generation: ${number}</span>`;

exports.generationText = generationText;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = void 0;

const delay = async ms => new Promise(resolve => setTimeout(() => resolve(), ms));

exports.delay = delay;

},{}],5:[function(require,module,exports){
"use strict";

var math = _interopRequireWildcard(require("./math"));

var render = _interopRequireWildcard(require("./render"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let generation = 1;
let population = Array.apply(null, {
  length: 200
}).map(() => {
  const r = math.randomInt(0, 255);
  const g = math.randomInt(0, 255);
  const b = math.randomInt(0, 255);
  return {
    r,
    g,
    b,
    fitness: math.fitness(r, g, b)
  };
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
    await (0, _utils.delay)(0);
  } while (generation <= 200);
}

start().then(() => console.log('started'));

},{"./math":1,"./render":2,"./utils":4}]},{},[5]);
