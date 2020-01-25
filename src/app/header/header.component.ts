import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() firedComponent = new EventEmitter<string>();
  @ViewChild('recipe', {static: false}) recipe: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  showComponent(component: string) {
    console.log(this.recipe);
    this.firedComponent.emit(component);
  }
}
