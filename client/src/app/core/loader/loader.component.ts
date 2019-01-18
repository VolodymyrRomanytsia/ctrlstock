import {Component, OnInit, OnDestroy} from '@angular/core'
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { LoaderState } from '../interfaces';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private aSub: Subscription;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.aSub = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }
  ngOnDestroy() {
    this.aSub.unsubscribe();
  }
}
