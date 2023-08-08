import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../Models/Image';

@Component({
  selector: 'app-selected-image-popup',
  templateUrl: './selected-image-popup.component.html',
  styleUrls: ['./selected-image-popup.component.css']
})
export class SelectedImagePopupComponent {

  @Input() selectedImage: Image | null = null;
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit(); // selectedImage = null
  }
}
