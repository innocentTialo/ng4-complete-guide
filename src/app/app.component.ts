import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  componentToDisplay: string = 'recipe-book';

  onSelectComponentToDisplay(component: string) {
    this.componentToDisplay = component;
  }
}
