# CaseStudyProductsup

This is my solution to the case study challenge as part of the technical interview for the front-end developer position
at ProductsUp.

## Docker

Since most people don't have a dev environment on their machines, I prepared a Docker image, so you can run the project
without the hassle of setting up a dev environment, installing node.js and other dependencies.

To run the project using docker, navigate to project root and run ````docker compose up --build````
or ```docker-compose up --build```, depending on version of docker compose you are using

Once the Docker does its magic, navigate to [localhost:8080](localhost:8080)

## Angular dev environment

In case you already have Node and Angular CLI installed on your machine, you can use ng command to run the project
locally.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Install dependencies

To install all required dependencies, navigate to the project root directory and run ```npm i ``` or if you are using
Yarn, run ```yarn install```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
