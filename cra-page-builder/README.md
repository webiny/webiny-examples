This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It shows a way to render pages built using `Webiny Page Builder` and `Webiny Form Builder` from your own React app.

## Setup

Clone the repo, then run `yarn` to install dependencies. Once all the deps are installed, run `yarn start`.
If you want to specify your own API endpoint, edit the `.env` file.

## Background

Webiny consists of a bunch of plugins. Page Builder is just an app (a collection of plugins) which allows other apps to register new elements to render whatever they have to render. And so, Form Builder registers its own `form` element into Page Builder in the `admin` app. While building the page in the PB Editor, you add a Form, and the information about it is stored to the DB.

Once the page is loaded for render, the data is there, but if there are no plugins to actually render each particular element - nothing will be rendered.
So we always need to register a plugin for a particular type of elements.

`App.js` file contains the full example with all the imports.  
