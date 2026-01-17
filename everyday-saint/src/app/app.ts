import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SaintCardComponent } from './saint-card/saint-card.component';
import { ShareButtonComponent } from './share-button/share-button.component';
import { RefreshButtonComponent } from './refresh-button/refresh-button.component';
import { Saint } from './models/saint.model';
import { RouterOutlet } from '@angular/router';
import * as SaintActions from './store/saint.actions';
import { selectSaintViewModel } from './store/saint.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SaintCardComponent,
    ShareButtonComponent,
    RefreshButtonComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Individual properties for template
  saint: Saint | null = null;
  date: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    // Subscribe to view model to populate individual properties
    this.store.select(selectSaintViewModel).subscribe(vm => {
      this.saint = vm.saint;
      this.date = vm.date;
      this.errorMessage = vm.errorMessage;
      this.isLoading = vm.isLoading;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.loadTodaysSaint();
  }

  /**
   * Dispatches action to load today's saint.
   */
  loadTodaysSaint(): void {
    this.store.dispatch(SaintActions.loadTodaysSaint());
  }

  /**
   * Handles the refresh button click.
   */
  onRefresh(): void {
    this.store.dispatch(SaintActions.refreshSaint());
  }
}
