const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")
const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

  // call unsplash and return small image
  async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'GAZPeH5CNJFfa-74yheiWbjaqJhYQ4sqeKEdgNnrwlU',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '645b12c7176c99ff5f402349',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem autem magni itaque ratione neque ipsam ex quaerat iure vitae harum eos omnis quam consequatur, corrupti similique a distinctio reprehenderit tempore!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images:[
        {
          url: 'https://res.cloudinary.com/dc58q0t5z/image/upload/v1683720640/YelpCamp/gbgeedwnwvw9d6fnnyus.jpg',
          filename: 'YelpCamp/gbgeedwnwvw9d6fnnyus'
        },
        {
          url: 'https://res.cloudinary.com/dc58q0t5z/image/upload/v1683720643/YelpCamp/brwjzszeix3w4iyjnx0i.jpg',
          filename: 'YelpCamp/brwjzszeix3w4iyjnx0i'
        }
      ]
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})

