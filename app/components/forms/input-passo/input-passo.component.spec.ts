import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPassoComponent } from './input-passo.component';

describe('InputPassoComponent', () => {
  let component: InputPassoComponent;
  let fixture: ComponentFixture<InputPassoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPassoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPassoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
