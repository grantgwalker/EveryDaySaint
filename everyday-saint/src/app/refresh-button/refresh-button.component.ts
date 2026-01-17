import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refresh-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.css']
})
export class RefreshButtonComponent {
  @Output() refresh = new EventEmitter<void>();
  
  isRefreshing = false;

  /**
   * Handles the refresh button click.
   */
  onRefresh(): void {
    if (this.isRefreshing) {
      return; // Prevent multiple clicks while refreshing
    }

    this.isRefreshing = true;
    this.refresh.emit();

    // Reset the refreshing state after animation completes
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  /**
   * Gets the appropriate aria-label based on refresh status.
   */
  getAriaLabel(): string {
    return this.isRefreshing 
      ? 'Refreshing saint information' 
      : 'Refresh to reload today\'s saint';
  }
}
