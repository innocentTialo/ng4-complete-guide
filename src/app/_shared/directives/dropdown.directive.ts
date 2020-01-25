import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') click (){
    this.isOpen = !this.isOpen;
  }

  @HostListener('blur') blur (){
    this.isOpen = false;
  }

}
