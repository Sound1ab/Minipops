# YFS Vue Scaffolding

A VueJS boilerplate using the following things:

* Webpack for bundling
* Babel for ES6
* ESLint for JS style enforcement
* SCSS for styling
* Jest for testing

Project is based on Vue CLI Webpack version 1.2.4

----
## Installation

The following bash command is a quickstart for cloning the project and deleting the git repo that will be included. If you prefer another method go ahead and use that.

git clone https://bitbucket.org/digital_annexe/scaffolding_vue <PROJECT_NAME> && rm -rf <PROJECT_NAME>/.git

---

## Rulebook

### Vue Components
Components should be small and reusable. Rule of thumb if you ever use anything twice then it's a component.

Components live in their own directories and are likely to be accompanied by:

* A pure/presentational Vue component that takes props only.
* A higher order component that handles the getting and digesting of data before passing props to the pure component.
* A .spec.js file for testing the component

### Styles
This setup assumes that you will be leveraging in-component styling. The src/scss directory is the location for all global styles, mixins and configuration objects. Those styles are available everywhere so you do not need to follow a pattern of @importing stuff for every `<style>` section of your components. This globality is achieved by adding the stylesheet to the scss loader definition in build/utils.

### State management
You can feel free to include whichever form of state management tool is required for your project. Vuex is not included by default because it is not required for every project and would be an example of bloat.

> Flux libraries are like glasses: you’ll know when you need them.

### Testing
The only rule we currently have for testing is that if there is a 'test' script included in the package.json it should be run before you start working and before you commit your changes.

Our current best practice guide for testing is essentially boiled down to the following:

* Include tests that make you feel confident in the application.
* If your tests are neat and pleasant but add nothing of value then don't bother writing them. 
* If you have no tests at all then you're entirely reliant on manual testing.

This section will be updated as our experience grows. It's early days yet for YFS frontend testing so do your best to include those tests that you find most useful and we will have regular discussions to update our team best practices on the matter.


---
## Commands

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn run start

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run all tests
yarn run test

# run tests whenever files change
yarn run watchtest
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
