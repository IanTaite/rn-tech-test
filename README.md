# RnTechTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

It was developed and tested using node.js version 20.13.1.

## Getting Started

### Install Dependencies

```npm install```

### Configuring the App

Create a `.env` file at the root of the project by copying `.env.example` to `.env`.

Edit `.env` and add your API key to the line that reads `API_KEY=(change me)`. Replace `(change me)`.

### Running the App

The command `npm start` will start the server app and the client app in that order.

Your browser should automatically open to `http://localhost:4200` once the app has compiled.

A simple proxy server runs on `http://localhost:3000`. If this isn't running, the app won't work.

### How it works.
The Angular app makes HTTP requests to the proxy application, and the proxy makes a request to the RN API on it's behalf.

A proxy server is needed for a few reasons:

- It adds the `X-API-Key` header and value to every request to the RN API.
- It overcomes a CORS error where the browser rejects direct API calls by the Angular App.

The Angular App has no need to know and doesn't use the API key.

### Screenshots

(Figure 1 below - Search Page)

![Search Screen](/docs/01-search-page.png 'Search Page')

(Figure 2 below - Search Results Page)

![Search results](/docs/02-search-results.png 'Search Results Page')

(Figure 3 below - Company Detail Page)

![Company Details](/docs/03-company-detail.png 'Company Detail Page')

(Figure 4 below - Officers List Page)

![Officers List](/docs/04-officers-list.png 'Officers List Page')
