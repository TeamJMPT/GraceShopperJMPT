//import { Promise } from '../../../Library/Caches/typescript/2.6/node_modules/@types/bluebird';

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')

const {User, Trip, Category} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const trips = await Promise.all([
    Trip.create({name: 'Hogwards', location: 'England', imageUrl: '/images/bf1f46dbe772627d8fc1b65d0d0f5dbd.jpg', 
    price: '5000', description: "Hogwarts School of Witchcraft and Wizardry, shortened to Hogwarts, is a fictional British school of magic for students aged eleven to eighteen, and is the primary setting for the first six books in J.K. Rowling's Harry Potter series."}),
    Trip.create({name: 'Mordor', location: 'East of Gondor', imageUrl: '/images/de8c77f0ca734f0455b11889bd58a582.jpg', 
    price: '2000', description: "J. R. R. Tolkien's fictional world of Middle-earth, Mordor was the region occupied and controlled by Sauron, in the southeast of northwestern Middle-earth to the East of Anduin, the great river."}),
    Trip.create({name: 'Jurassic Park', location: 'Kauai', imageUrl: '/images/4b68b54fca576aed0d0e0074adf55d0e.jpg', 
    price: '3500', description: 'Jurassic Park is an American science fiction media franchise centered on a disastrous attempt to create a theme park of cloned dinosaurs who escape confinement and terrorize the human characters.'}),
    Trip.create({name: 'Narnia', location: 'United Kingdom', imageUrl: '/images/c8c0aadbe70397dc6c43b362081e7e8f.jpg', 
    price: '5000', description: " C. S. Lewis's a fantasy world of magic, mythical beasts, and talking animals, the series narrates the adventures of various children who play central roles in the unfolding history of that world."}),
    Trip.create({name: 'Tatooine', location: 'Outer Rim Galaxy', imageUrl: '/images/829e3861880180e8df3270be118ec368.jpg', 
    price: '2000', description: 'Tatooine is a fictional desert planet that appears in the Star Wars space opera franchise. It is beige-coloured and is depicted as a remote, desolate world orbiting a pair of binary stars, and inhabited by human settlers and a variety of other life forms.'}),
    Trip.create({name: 'Endor', location: 'Outer Rim Galaxy', imageUrl: '/images/7a3de0b29c4cff3c550899f645038ff4.jpg', 
    price: '2500', description: 'Endor is known as the Forest Moon of Endor or the Sanctuary Moon was a small forested moon that orbited the Outer Rim planet of the same name and was the homeworld of the sentient Ewok and Yuzzum species.'}),
    Trip.create({name: 'Metropolis', location: 'Unated States', imageUrl: '/images/e96a0108b1ae7357a1a4038ed3ebae7f.jpg', 
    price: '2000', description: 'Metropolis is a fictional city appearing in American comic books published by DC Comics, best known as the home of Superman.'}),
    Trip.create({name: 'Winterfell', location: 'The North', imageUrl: '/images/8ae6981bf6ce6f296a00a6a8c618f5a7.jpg', 
    price: '5000', description: 'Winterfell is the house of the North and the ancestral home of House Stark. It is a large stronghold extending across many acres of territory, defended by two layers of strong stone granite walls. The outer walls are 80 feet tall and the inner are 100 feet tall, with a wide moat located between them.'})
  ])

  const categories = await Promise.all([
    Category.create({name: 'Movies'}),
    Category.create({name: 'Books'}),
    Category.create({name: 'TV Shows'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${trips.length} trips`)
  console.log(`seeded ${categories.length} categories`)

  console.log(`seeded successfully`)
}




// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
