# vueswars

## Project info

The app uses `swapi.dev` to display Star Wars characters details. It fetches all characters at once, and caches it in
local storage. The other solution could some kind of lazy loading and api search usage.

### Stack

* Vue 3
* Composition API
* TypeScript
* Jest
* SCSS

### Features

* fetches and lists characters (people resource) from the swAPI.dev
* show details of selected character
* possibility to filter character by their name
* pagination functionality
* local storage cache
* components tested with unit tests
* prepared for further development and consumption of different api resources

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development and preview

```
yarn serve
```

### Run unit tests

```
yarn test:unit
```
