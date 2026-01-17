import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Saint } from '../models/saint.model';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.css']
})
export class ShareButtonComponent {
  @Input() saint!: Saint;
  @Input() date!: string;

  shareStatus: 'idle' | 'success' | 'error' = 'idle';

  /**
   * Shares the saint information using Web Share API or clipboard fallback.
   */
  async share(): Promise<void> {
    if (!this.saint) {
      return;
    }

    const shareText = this.formatShareText();

    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Saint of the Day: ${this.saint.name}`,
          text: shareText
        });
        this.setShareStatus('success');
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== 'AbortError') {
          this.fallbackToClipboard(shareText);
        }
      }
    } else {
      // Fallback to clipboard
      this.fallbackToClipboard(shareText);
    }
  }

  /**
   * Formats the saint information for sharing.
   */
  private formatShareText(): string {
    const formattedDate = this.getFormattedDate();
    
    let text = `Saint of the Day - ${formattedDate}\n\n`;
    text += `${this.saint.name}\n\n`;
    text += `${this.saint.life_summary}\n\n`;
    text += `Learn more about the saints of the Church of England.`;
    
    return text;
  }

  /**
   * Fallback method to copy to clipboard.
   */
  private async fallbackToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.setShareStatus('success');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      this.setShareStatus('error');
    }
  }

  /**
   * Sets the share status and clears it after a delay.
   */
  private setShareStatus(status: 'success' | 'error'): void {
    this.shareStatus = status;
    setTimeout(() => {
      this.shareStatus = 'idle';
    }, 3000);
  }

  /**
   * Formats the date for display.
   */
  private getFormattedDate(): string {
    if (!this.date) return '';
    
    const dateObj = new Date(this.date + 'T00:00:00');
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Gets the appropriate aria-label based on share status.
   */
  getAriaLabel(): string {
    if (this.shareStatus === 'success') {
      return 'Saint information copied to clipboard';
    }
    if (this.shareStatus === 'error') {
      return 'Failed to share saint information';
    }
    return 'Share saint information';
  }
}
