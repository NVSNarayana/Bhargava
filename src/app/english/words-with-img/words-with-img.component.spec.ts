import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsWithImgComponent } from './words-with-img.component';

describe('WordsWithImgComponent', () => {
  let component: WordsWithImgComponent;
  let fixture: ComponentFixture<WordsWithImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsWithImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsWithImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
