import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoPassoComponent } from './confirmacao-passo.component';

describe('ConfirmacaoPassoComponent', () => {
  let component: ConfirmacaoPassoComponent;
  let fixture: ComponentFixture<ConfirmacaoPassoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacaoPassoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoPassoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
