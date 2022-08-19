import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'by Sony Pictures Entertainment';
  title = 'the at-home Runner typeahead exercise';
  requirements = [
    `We have supplied sample json in the data directory to return title suggestions for a typeahead input component you'll create.`,
    'Please build a client that returns the sample json, as you would any client interacting with a json API.',
    'When the user types 3 or more characters into the input, it should show an Angular Material typeahead/autocomplete dropdown.',
    `When the user makes a selection from the dropdown, a new element below the input should show the selection's full name. Feel free to be creative with your styles.`,
    'The selected titles should be removable.',
    'This mimics a form element in our application where users assign title metadata to assets, so if you would like to build something that replicates a form submission, feel free to come up with your own solution to how it "saves" the data.'
  ];
}



