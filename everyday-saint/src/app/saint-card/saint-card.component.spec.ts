import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaintCardComponent } from './saint-card.component';
import { Saint } from '../models/saint.model';

describe('SaintCardComponent', () => {
  let component: SaintCardComponent;
  let fixture: ComponentFixture<SaintCardComponent>;

  const mockSaint: Saint = {
    name: 'Antony of Egypt',
    rank: 'lesser_festival',
    rank_priority: 3,
    life_summary: 'Test summary of the saint\'s life.',
    key_life_events: [
      'Born in Egypt around 251 AD',
      'Sold all possessions at age 20',
      'Lived in the desert for 20 years'
    ],
    path_to_sainthood: 'Recognized immediately after death.',
    source_reference: 'Common Worship'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaintCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SaintCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display saint name', () => {
    component.saint = mockSaint;
    component.date = '2026-01-17';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('.saint-card__name');
    expect(nameElement?.textContent).toBe('Antony of Egypt');
  });

  it('should display formatted date', () => {
    component.saint = mockSaint;
    component.date = '2026-01-17';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const dateElement = compiled.querySelector('.saint-card__date');
    expect(dateElement?.textContent).toContain('January 17, 2026');
  });

  it('should display formatted rank', () => {
    component.saint = mockSaint;
    component.date = '2026-01-17';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rankElement = compiled.querySelector('.saint-card__rank');
    expect(rankElement?.textContent).toBe('Lesser Festival');
  });

  it('should display life summary', () => {
    component.saint = mockSaint;
    component.date = '2026-01-17';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const summaryElement = compiled.querySelector('.saint-card__text');
    expect(summaryElement?.textContent).toContain('Test summary');
  });

  it('should display all key life events', () => {
    component.saint = mockSaint;
    component.date = '2026-01-17';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const eventItems = compiled.querySelectorAll('.saint-card__list-item');
    expect(eventItems.length).toBe(3);
    expect(eventItems[0].textContent?.trim()).toContain('Born in Egypt');
  });

  it('should display path to sainthood', () => {
    component.saint = mockSaint;
    component.date = '2026-01-17';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('.saint-card__text');
    const pathSection = Array.from(sections).find(el => 
      el.textContent?.includes('Recognized immediately')
    );
    expect(pathSection).toBeTruthy();
  });

  it('should display source reference', () => {
    component.saint = mockSaint;
    component.date = '2026-01-17';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sourceElement = compiled.querySelector('.saint-card__source');
    expect(sourceElement?.textContent).toContain('Common Worship');
  });

  it('should format principal feast correctly', () => {
    const principalSaint: Saint = {
      ...mockSaint,
      rank: 'principal_feast',
      rank_priority: 1
    };
    component.saint = principalSaint;
    component.date = '2026-06-24';
    fixture.detectChanges();

    expect(component.getFormattedRank()).toBe('Principal Feast');
  });
});
