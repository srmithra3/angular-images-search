import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Image Search';
  IMAGES_PER_PAGE = 2;

  searchKeyword = '';
  resultImages = [];
  imagesOnPage = [];
  favouriteImages = [];
  currentPage = 0;

  // Flags
  isLoading = false;
  showButtons = false;
  showBtnNext = true;
  showBtnBack = false;
  noResults = false;

  constructor(private dataService: DataService) {}

  init() {
    this.currentPage = 0;
    this.showBtnNext = true;
    this.showBtnBack = false;
    this.isLoading = false;
    this.showButtons = false;
    this.noResults = false;
    this.imagesOnPage = [];
  }

  onSearch() {
    this.init();
    this.isLoading = true;
    this.resultImages.splice(0, this.resultImages.length);

    let counter = -1;
    let numOfImages = 0;
    this.resultImages[0] = [];

    this.dataService
      .getPhotos(this.searchKeyword)
      .subscribe((response: any) => {
        this.isLoading = false;

        response.forEach(element => {
          if (numOfImages % this.IMAGES_PER_PAGE === 0) {
            ++counter;
            this.resultImages[counter] = [];
          }

          this.resultImages[counter].push(element.urls.small);
          ++numOfImages;
        });

        if (numOfImages === 0) {
          this.showButtons = false;
          this.noResults = true;
        } else {
          this.showButtons = true;
        }

        this.showImagesFromCurrentPage();
      });
  }

  onAddToFavourites(imageUrl: string) {
    if (this.favouriteImages.indexOf(imageUrl) === -1) {
      this.favouriteImages.push(imageUrl);
    } else {
      alert('This image is already in your favourites.');
    }
  }

  onRemoveFromFavourites(imageUrl: string) {
    const index = this.favouriteImages.indexOf(imageUrl);

    if (index === -1) {
      alert('Error while removing image from favourites.');
      return;
    }

    this.favouriteImages.splice(index, 1);
  }

  showImagesFromCurrentPage() {
    this.imagesOnPage = this.resultImages[this.currentPage];
  }

  onBtnNext() {
    this.currentPage++;
    this.showImagesFromCurrentPage();

    // If we are not at first page, show back button
    if (this.currentPage === 1) {
      this.showBtnBack = true;
    }

    // If we are at the last page, hide next button
    if (this.currentPage === this.resultImages.length - 1) {
      this.showBtnNext = false;
    }
  }

  onBtnBack() {
    this.currentPage--;
    this.showImagesFromCurrentPage();

    if (this.currentPage === 0) {
      this.showBtnBack = false;
    }

    if (this.currentPage !== this.resultImages.length - 1) {
      this.showBtnNext = true;
    }
  }
}
