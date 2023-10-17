# React-Native-Coding-Challenge
Clear Solutions has created this challenge to assess the developer skills of candidates.

## Instructions
#### 1. Build your app
You have 1 week to complete the challenge.

*Implementation and tests will be evaluated.*
#### 2. Submit your challenge
Follow these instructions to submit your challenge.
* Setup your Development Environment ([React Native - Getting Started guide](https://reactnative.dev/docs/getting-started.html))
* Fork the Challenge Repository
* Write your Code
* Commit your Changes
* Issue a Pull Request

#### 3. Impress us with your skills

## Challenge
Maks owns so many cats that he can't keep track of all of them. He needs some way to keep track of all of his cats.
He would like to have a mobile app that looks like this [web site](https://www.pokemon.com/us/pokedex).


## Requirements
Your app should be able to complete the following tasks:
* Add a new Cat (Name, Breed, Image link is optional)
```http request

POST https://652e51aa0b8d8ddac0b12877.mockapi.io/cats
Body:
{
  "createdAt": "2023-10-16T22:01:00.297Z",
  "name": "Caramel",
  "avatar": "https://loremflickr.com/640/480/cats",
  "breed": "Scottish Fold",
  "id": "51"
}
```
* Remove Cats 
```http request

DELETE https://652e51aa0b8d8ddac0b12877.mockapi.io/cats/{51}
```

* List all of his Cats with filters and ordering by Name and created date.
```http request

GET https://652e51aa0b8d8ddac0b12877.mockapi.io/cats
```

Example of response:
```http request
[
{
    "createdAt": "2023-10-16T22:01:00.297Z",
    "name": "Blanca Monahan",
    "avatar": "https://loremflickr.com/640/480/cats",
    "breed": "American Bobtail",
    "id": "1"
  },
  {
    "createdAt": "2023-10-16T22:35:52.937Z",
    "name": "Madeline Jaskolski",
    "avatar": "https://loremflickr.com/640/480/cats",
"breed": "Tonkinese",
"id": "2"
}
]
```
* Persist data using Redux for optimising the amount of query to API

## Grading
The grading of the app  will be based off of three criteria:
* **40%** - Overall Design and Structure
* **30%** - Data Management and Store
* **30%** - Testing 
