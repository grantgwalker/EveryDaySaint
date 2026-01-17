import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ShareButtonComponent } from './share-button.component';
import { Saint } from '../models/saint.model';

describe('ShareButtonComponent', () => {
  let component: ShareButtonComponent;
  let fixture: ComponentFixture<ShareButtonComponent>;

  const mockSaint: Saint = {
    name: 'Antony of Egypt',
    rank: 'lesser_festival',
    rank_priority: 3,
    life_summary: 'Test summary',
    key_life_events: ['Event 1'],
    path_to_sainthood: 'Test path',
    source_reference: 'Test source'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareButtonComponent);
    component = fixture.componentInstance;
    component.saint = mockSaint;
    component.date = '2026-01-17';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial aria-label', () => {
    fixture.detectChanges();
    expect(component.getAriaLabel()).toBe('Share saint information');
  });

  it('should display share icon initially', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('svg');
    expect(icons.length).toBe(1);
  });

  it('should call navigator.share when available', async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      value: mockShare,
      writable: true,
      configurable: true
    });

    await component.share();

    expect(mockShare).toHaveBeenCalled();
    const args = mockShare.mock.calls[0][0];
    expect(typeof args.title).toBe('string');
    expect(typeof args.text).toBe('string');
  });

  it('should fallback to clipboard when navigator.share not available', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true
    });
    Object.defineProperty(navigator, 'share', {
      value: undefined,
      writable: true,
      configurable: true
    });

    await component.share();

    expect(mockWriteText).toHaveBeenCalled();
    expect(component.shareStatus).toBe('success');
  });

  it('should show success state after successful share', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true
    });

    await component.share();

    expect(component.shareStatus).toBe('success');
    expect(component.getAriaLabel()).toBe('Saint information copied to clipboard');
  });

  it('should show error state when clipboard fails', async () => {
    const mockWriteText = vi.fn().mockRejectedValue(new Error('Failed'));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true
    });

    await component.share();

    expect(component.shareStatus).toBe('error');
    expect(component.getAriaLabel()).toBe('Failed to share saint information');
  });

  it('should reset status after timeout', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true
    });

    await component.share();
    expect(component.shareStatus).toBe('success');

    await new Promise(resolve => setTimeout(resolve, 3100));
    expect(component.shareStatus).toBe('idle');
  });
});
