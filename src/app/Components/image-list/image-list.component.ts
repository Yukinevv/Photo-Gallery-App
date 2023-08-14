import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Image } from '../../Models/Image';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageResponse } from 'src/app/Models/ImageResponse';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  images: Image[] = [];
  userLogin: string = '';
  category: string = '';

  selectedImage: Image | null = null;

  filteredImages: Image[] = [];

  ngOnInit(): void {
    this.userLogin = localStorage.getItem('userLogin') ?? "";
    this.category = localStorage.getItem('category') ?? "";
    this.fetchImages();
    this.filteredImages = this.images;
  }

  onImageClick(image: Image) {
    this.selectedImage = image;
  }

  updateFilteredItems(filteredData: Image[]) {
    this.filteredImages = filteredData;
  }

  fetchImages(): void {
    if (this.userLogin === "" || this.category === "") return;

    this.apiService.getImages(this.userLogin, this.category).subscribe(
      (response: ImageResponse[]) => {
        response.forEach(item => {
          this.images.push({ // do typu Image daje tylko te dane z ImageResponse, ktore wykorzystuje na froncie
            id: item.id,
            filename: item.filename,
            imageUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.data) // konwersja z base64 zapisanego jako string pobranego z API na SafeUrl
          });
        });
      },
      (error) => {
        console.error('Error fetching images', error);
      }
    );
  }
}
