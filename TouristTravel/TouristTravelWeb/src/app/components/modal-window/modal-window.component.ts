import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {

  @Input() title = 'title';

  constructor(private activeModal: NgbActiveModal) { }
}
