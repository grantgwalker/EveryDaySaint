import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { RefreshButtonComponent } from './refresh-button.component';

describe('RefreshButtonComponent', () => {
  let component: RefreshButtonComponent;
  let fixture: ComponentFixture<RefreshButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefreshButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RefreshButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial aria-label', () => {
    expect(component.getAriaLabel()).toBe('Refresh to reload today\'s saint');
  });

  it('should emit refresh event when clicked', () => {
    const emitSpy = vi.spyOn(component.refresh, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should set isRefreshing to true when clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.isRefreshing).toBe(true);
  });

  it('should reset isRefreshing after timeout', (done) => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.isRefreshing).toBe(true);

    setTimeout(() => {
      expect(component.isRefreshing).toBe(false);
      done();
    }, 1100);
  });

  it('should prevent multiple clicks while refreshing', () => {
    const emitSpy = vi.spyOn(component.refresh, 'emit');

    component.isRefreshing = true;
    component.onRefresh();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should update aria-label when refreshing', () => {
    component.isRefreshing = true;
    expect(component.getAriaLabel()).toBe('Refreshing saint information');
  });

  it('should disable button when refreshing', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(button.disabled).toBe(true);
  });

  it('should add refreshing class when isRefreshing is true', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(button.classList.contains('refresh-button--refreshing')).toBe(true);
  });
});
