// import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

// const prisma = new PrismaClient();

// async function main() {
//   // Seed users
//   for (let i = 0; i < 10; i++) {
//     await prisma.users.create({
//       data: {
//         namaDepan: faker.person.firstName(),
//         namaBelakang: faker.person.lastName(),
//         username: faker.internet.userName(),
//         password: faker.internet.password(),
//         balance: parseFloat(faker.finance.amount()),
//         email: faker.internet.email(),
//         role: faker.helpers.arrayElement(["user", "admin"]),
//       },
//     });
//   }

//   // Seed movies
//   for (let i = 0; i < 5; i++) {
//     await prisma.movies.create({
//       data: {
//         title: faker.lorem.words(3),
//         description: faker.lorem.sentences(2),
//         director: faker.person.fullName(),
//         releaseYear: faker.date.past({ years: 20 }).getFullYear(),
//         genre: faker.helpers.arrayElement([
//           "Action",
//           "Drama",
//           "Sci-Fi",
//           "Comedy",
//         ]),
//         price: parseFloat(faker.commerce.price()),
//         duration: faker.number.int({ min: 80, max: 180 }),
//         video: faker.internet.url(),
// coverImage: faker.image.url(), faker.image.url(),
// },
//     });
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Seed 20 film baru
  const movies = [
    {
      title: "The Matrix",
      description:
        "A hacker discovers reality is a simulation and joins a rebellion against the machines.",
      director: "Lana Wachowski, Lilly Wachowski",
      releaseYear: 1999,
      genre: ["Action", "Sci-Fi"],
      price: 100,
      duration: 136,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "The Godfather",
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
      director: "Francis Ford Coppola",
      releaseYear: 1972,
      genre: ["Crime", "Drama"],
      price: 120,
      duration: 175,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology.",
      director: "Christopher Nolan",
      releaseYear: 2010,
      genre: ["Action", "Adventure", "Sci-Fi"],
      price: 150,
      duration: 148,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      director: "Christopher Nolan",
      releaseYear: 2014,
      genre: ["Adventure", "Drama", "Sci-Fi"],
      price: 130,
      duration: 169,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: "Christopher Nolan",
      releaseYear: 2008,
      genre: ["Action", "Crime", "Drama"],
      price: 140,
      duration: 152,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Pulp Fiction",
      description:
        "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      director: "Quentin Tarantino",
      releaseYear: 1994,
      genre: ["Crime", "Drama"],
      price: 110,
      duration: 154,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Fight Club",
      description:
        "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
      director: "David Fincher",
      releaseYear: 1999,
      genre: ["Drama"],
      price: 125,
      duration: 139,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Forrest Gump",
      description:
        "The presidencies of Kennedy and Johnson, the Vietnam War, and more unfold through the perspective of an Alabama man with an IQ of 75.",
      director: "Robert Zemeckis",
      releaseYear: 1994,
      genre: ["Drama", "Romance"],
      price: 115,
      duration: 142,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "The Lord of the Rings: The Return of the King",
      description:
        "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      director: "Peter Jackson",
      releaseYear: 2003,
      genre: ["Action", "Adventure", "Drama"],
      price: 150,
      duration: 201,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      description:
        "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
      director: "Irvin Kershner",
      releaseYear: 1980,
      genre: ["Action", "Adventure", "Fantasy"],
      price: 130,
      duration: 124,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      director: "Frank Darabont",
      releaseYear: 1994,
      genre: ["Drama"],
      price: 100,
      duration: 142,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Schindler's List",
      description:
        "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
      director: "Steven Spielberg",
      releaseYear: 1993,
      genre: ["Biography", "Drama", "History"],
      price: 135,
      duration: 195,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Gladiator",
      description:
        "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      director: "Ridley Scott",
      releaseYear: 2000,
      genre: ["Action", "Adventure", "Drama"],
      price: 125,
      duration: 155,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Titanic",
      description:
        "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      director: "James Cameron",
      releaseYear: 1997,
      genre: ["Drama", "Romance"],
      price: 120,
      duration: 195,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Avatar",
      description:
        "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      director: "James Cameron",
      releaseYear: 2009,
      genre: ["Action", "Adventure", "Sci-Fi"],
      price: 140,
      duration: 162,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "The Silence of the Lambs",
      description:
        "A young FBI cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
      director: "Jonathan Demme",
      releaseYear: 1991,
      genre: ["Crime", "Drama", "Thriller"],
      price: 110,
      duration: 118,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "The Departed",
      description:
        "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in Boston.",
      director: "Martin Scorsese",
      releaseYear: 2006,
      genre: ["Crime", "Drama", "Thriller"],
      price: 125,
      duration: 151,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Whiplash",
      description:
        "A young and ambitious drummer enrolls at a music conservatory where his dreams of greatness are met with relentless pressure from a demanding instructor.",
      director: "Damien Chazelle",
      releaseYear: 2014,
      genre: ["Drama", "Music"],
      price: 110,
      duration: 107,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Joker",
      description:
        "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then becomes the criminal mastermind known as the Joker.",
      director: "Todd Phillips",
      releaseYear: 2019,
      genre: ["Crime", "Drama", "Thriller"],
      price: 130,
      duration: 122,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Parasite",
      description:
        "A poor family schemes to become employed by a wealthy family and infiltrate their household, only to discover unexpected consequences.",
      director: "Bong Joon-ho",
      releaseYear: 2019,
      genre: ["Comedy", "Drama", "Thriller"],
      price: 120,
      duration: 132,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Spider-Man: Into the Spider-Verse",
      description:
        "Teenager Miles Morales becomes Spider-Man of his reality and crosses paths with his counterparts from other dimensions to stop a threat to all realities.",
      director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
      releaseYear: 2018,
      genre: ["Animation", "Action", "Adventure"],
      price: 140,
      duration: 117,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "Django Unchained",
      description:
        "With the help of a bounty hunter, a freed slave sets out to rescue his wife from a brutal plantation owner.",
      director: "Quentin Tarantino",
      releaseYear: 2012,
      genre: ["Drama", "Western"],
      price: 125,
      duration: 165,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
    {
      title: "The Social Network",
      description:
        "The story of the founding of Facebook and the legal battles that followed its rise to fame.",
      director: "David Fincher",
      releaseYear: 2010,
      genre: ["Biography", "Drama"],
      price: 110,
      duration: 120,
      video: faker.internet.url(),
      coverImage: faker.image.url(),
    },
  ];

  // Menambahkan data film ke database
  for (const movie of movies) {
    await prisma.movies.create({ data: movie });
  }

  console.log("Seed data inserted");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
