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

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages() {
    this.apiService.getImages().subscribe(
      (response: ImageResponse[]) => {
        response.forEach(item => {
          this.images.push({
            filename: item.filename,
            imageUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + item.data)
          });
        });
      },
      (error) => {
        console.error('Error fetching images', error);
      }
    );
  }
}
