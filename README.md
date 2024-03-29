

<p align="center"><img width=70% src="https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/f2/68/44/f268440e-fcf7-59bd-a42d-4fe52b51af5d/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png"></p>

  
  [![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat&logo=javascript&link=https://github.com/matheus-alvess)](https://github.com/matheus-alvess) 
  
  [![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat&logo=Node.js&link=https://github.com/matheus-alvess)](https://github.com/matheus-alvess) 
  
  [![Docker](https://img.shields.io/badge/-Docker-black?style=flat&logo=docker&link=https://github.com/matheus-alvess)](https://github.com/matheus-alvess) 
  
  [![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-black?style=flat&logo=PostgreSQL&link=https://github.com/matheus-alvess)](https://github.com/matheus-alvess)
  


## About

  
The challenge of this application is to assist data science in detecting DNA sequences that will allow us to identify and distinguish simian and human peoples. All of this is done through a simple API Rest, shall we test?


## How it works?



To identify a possible simian DNA, processing occurs as follows.

I go through each line of the square table and for each line I process each character. Therefore, it appears that there is a possible pattern in all orders `(horizontal, vertical or diagonal)`.

If any character matches, we try to go through 3 positions in the direction found from the current position of the character and we will store the quantity until we reach the sequence of 4 that corresponds to simio.

<p align="center">
 <img src="https://i.ibb.co/hMbXH1j/Captura-de-Tela-2020-09-10-a-s-23-49-44.png" alt="MELI_CHALLENGE" border="0">
</p>

<hr>

## Installation
  

We need to install the project dependencies with [npm](https://nodejs.org/en/) or [yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#mac-stable) on your machine.


```javascript
npm install or yarn
```

If you don't already have PostgreSQL on your machine just use the [docker-compose](https://docs.docker.com/compose/install/) file located at the root of the project.

```text
docker-compose -d
```

## Usage 

To run the application it is necessary to create an `.env` file at the project root from the `env.sample` file. In this file you must place your settings for your environment.

After that you must create the database structure.

```javascript
npm run migrate or yarn migrate
```

Let's start

```javascript
npm run dev or yarn dev
```

Ro run the tests

```javascript
npm run test or yarn test
```

Coverage tests

```javascript
npm run coverage or yarn coverage
```

<hr>

## Endpoints

The interface for the consumption of the application is through an API Rest.

[Test Online](https://meli-simian-app-beta.herokuapp.com)💪 

Endpoint for sending the genetic sequence.

`Obs: Test pass an incorrect body`

**POST**
```text
/simian
```

Body
```json
{ "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"] }
```

Response
```json
{
  "simian": true
}
```

<hr>

  
To access the DNA verification statistics, where you must inform the amount of simian DNA’s, amount of human DNA’s, and the ratio of simians to the human population.

**GET**

```text
/stats
```

Response
```json
{
  "count_mutant_dna": 20,
  "count_human_dna": 30,
  "ratio": 0.6
}
```

<hr>

Code coverage details

**GET**

```text
/coverage
```

<hr>

## Notes
  
It is recommended that you run the application on `node_v12 LTS`.
