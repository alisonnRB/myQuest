import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuestComponent } from './card-quest.component';

describe('CardQuestComponent', () => {
  let component: CardQuestComponent;
  let fixture: ComponentFixture<CardQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardQuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
