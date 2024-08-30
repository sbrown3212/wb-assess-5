import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({
  where: { species: 'fish' },
});

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({
  where: { humanId: 5 },
});

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: { birthYear: { [ Op.gt ] : 2015 }}
});

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: { fname: { [ Op.startsWith ] : 'J' } }
});

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
  where: { birthYear: { [ Op.is ] : null } }
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
  where: {
    [ Op.or ]: [
      { species: 'fish' },
      { species: 'rabbit' },
    ]
  }
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
  where: {
    email: { 
      [ Op.notLike ]: '%gmail%'
    }
  }
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
  let directory = '';

  // Query db for all humans and their associated animals
  const data = await Human.findAll({ include: Animal });

  // For each human
  data.forEach((human) => {
    // Concatenate full name and add line break to directory
    directory += `${human.getFullName()}\n`

    // For each animal of each human
    human.animals.forEach((animal) => {
      // Concatenate string with animal name and species with line break to directory
      directory += `- ${animal.name}, ${animal.species}\n`
    })
  })

  console.log(directory);
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  // Query db for all humans and the species of their animals
  const data = await Human.findAll({
    include: {
      model: Animal,
      attributes: ['species'],
    },
  })

  // Initialize set to store names of humans
  const humans = new Set();

  // For each human in data from db query:
  data.forEach((human) => {
    // Deconstruct animals array from each human
    const { animals } = human;

    // Save human name to variable
    const humanName = human.getFullName();

    // For each animal of the human:
    animals.forEach((animal) => {
      // If animal species is the same as species provided when function was invoked:
      if (animal.species === species) {
        // Add name to 'humans' set
        humans.add(humanName)
      }
    })
  })

  return humans;
}