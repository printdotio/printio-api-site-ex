printio-api-site-ex
=====================

Example of how to build a website based off of the obviously amazing [print.io api](http://print.io/api) and [pio.js](http://print.io/platform-web).

## What's Included?
- an incredibly quick nodejs-based backend
- fully responsive bootstrap 3-based site... ready for mobile/tablets!
- an example products page leveraging the print.io api
- an example product details page leveraging the print.io api
- fully integrated shopping cart
- fully integrated pio.js web widget for easy product customization (yayyyyyy!)
- facebook, pinterest, and twitter sharing
- facebook and pinterest meta tags w/ product description to help their robots/crawlers read product data
- SEO-friendly URLs and [schema.org](http://www.schema.org/Product) compliant product markup for even more SEO juice
- unit tested print.io api library ( run `mocha` from the project root to run the tests)
- free beer

## Requirements
1. That you have nodejs installed
2. That you have npm installed (usually comes with node but just sayin')
2. That you have bower installed ( `npm install -g bower` )

## Setup
1. `cd` to the project root
2. run `npm install`
3. run `cd public && bower install && cd ..`

## Running
1. `cd` to the project root
2. run `node server`
3. open your browser to `http://localhost:1337`

## TODOs

Search the codebase for "TODO" to find small items one should take care of before deploying to production (like changing facebook app ID, adding in print.io api key, etc).


*License === MIT*