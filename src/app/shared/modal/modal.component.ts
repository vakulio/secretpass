import { NgClass } from '@angular/common';
import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'secretpass-modal',
  templateUrl: './modal.component.html',
  styles: [],
  standalone: true,
  imports: [NgClass]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID = ''

  constructor(public modal: ModalService, public el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement)
  }

  ngOnDestroy(): void {
      document.body.removeChild(this.el.nativeElement)
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }
}
