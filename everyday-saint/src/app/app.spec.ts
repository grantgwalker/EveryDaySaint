import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { App } from './app';
import { selectSaintViewModel } from './store/saint.selectors';

describe('App', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSaintViewModel, value: { saint: null, date: '', isLoading: false, errorMessage: null } }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Saint of the Day');
  });
});
