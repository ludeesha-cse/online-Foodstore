import { LoadingService } from './../../../services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  isLoading!: boolean;

  constructor( loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

}
