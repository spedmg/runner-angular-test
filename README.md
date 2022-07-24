# DmgAngularTest

This is meant to be a short exercise to illustrate your familiarity with Angular. Fork this repo and follow the instructions you see when serving the app locally.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Solution

A new component typeahead has been created. The component meets the requirements:
- Integrated [Angular Material](https://material.angular.io/guide/getting-started)
- Only after the user types 3 or more characters into the input the query `getTitles` is executed
- Integrated Angular Material [typeahead/autocomplete](https://material.angular.io/components/autocomplete/overview)
- After the user selects an option, a new element below the input displays the selection's full name.
  - The component used to display the selected titles is [mat-chip-list](https://material.angular.io/components/chips/overview)
  - The selected titles should be removable.
- A mock save metadata has been included. It is a very simple representation of a request.

## Jasmine Tests

This has been only included to validate the functionality of the TitleService.
