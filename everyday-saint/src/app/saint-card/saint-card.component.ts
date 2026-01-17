import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Saint } from '../models/saint.model';

@Component({
  selector: 'app-saint-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saint-card.component.html',
  styleUrls: ['./saint-card.component.css']
})
export class SaintCardComponent {
  @Input() saint!: Saint;
  @Input() date!: string;

  /**
   * Formats the date for display (e.g., "January 17, 2026")
   */
  getFormattedDate(): string {
    if (!this.date) return '';
    
    const dateObj = new Date(this.date + 'T00:00:00'); // Ensure local timezone
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Formats the rank for display
   */
  getFormattedRank(): string {
    if (!this.saint?.rank) return '';
    
    const rankMap: Record<string, string> = {
      'principal_feast': 'Principal Feast',
      'festival': 'Festival',
      'lesser_festival': 'Lesser Festival',
      'commemoration': 'Commemoration'
    };
    
    return rankMap[this.saint.rank] || this.saint.rank;
  }
}
