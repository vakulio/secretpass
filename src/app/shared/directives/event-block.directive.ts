import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[secretpassEventBlock]',
  standalone: true
})
export class EventBlockDirective {

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent(event: Event){
    event.preventDefault()

  }
}
