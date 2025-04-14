import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUnicoComponent } from './cadastro-unico.component';

describe('CadastroUnicoComponent', () => {
  let component: CadastroUnicoComponent;
  let fixture: ComponentFixture<CadastroUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
