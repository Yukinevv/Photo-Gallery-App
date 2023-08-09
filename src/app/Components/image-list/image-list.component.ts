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

  selectedImage: Image | null = null;

  ngOnInit(): void {
    this.userLogin = localStorage.getItem('userLogin') ?? "";
    this.fetchImages();
  }

  onImageClick(image: Image) {
    this.selectedImage = image;
  }

  fetchImages(): void {
    if (this.userLogin === "") return;

    this.apiService.getImages(this.userLogin).subscribe(
      (response: ImageResponse[]) => {
        response.forEach(item => {
          this.images.push({
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
