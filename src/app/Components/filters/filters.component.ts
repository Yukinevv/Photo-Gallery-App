import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../Models/Image';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  @Input() images: Image[] = [];
  @Output() filteredItemsChange = new EventEmitter<Image[]>();

  filterField: string = '';

  filterByName() {
    const filteredImages = this.images.filter(item => item.filename.toLowerCase().includes(this.filterField.toLowerCase()));
    this.filteredItemsChange.emit(filteredImages);
    //console.log(filteredImages);
  }

  sortByName(direction: number) {
    let sortedImages: Image[] = [];
    if (direction === 1) {
      sortedImages = this.images.sort((a, b) => a.filename.localeCompare(b.filename));
    } else {
      sortedImages = this.images.sort((a, b) => b.filename.localeCompare(a.filename));
    }
    this.filteredItemsChange.emit(sortedImages);
  }
}
