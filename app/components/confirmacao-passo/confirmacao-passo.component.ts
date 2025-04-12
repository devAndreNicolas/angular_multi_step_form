import { Component, EventEmitter, Output } from '@angular/core';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmacao-passo',
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmacao-passo.component.html',
  styleUrl: './confirmacao-passo.component.css'
})
export class ConfirmacaoPassoComponent {
  @Output() done = new EventEmitter<void>();

  constructor(public formService: FormService) {}

  confirm() {
    console.log('Confirmando os dados...');
    if (!this.done.closed) {
      this.done.emit(); // Emite o evento para o componente pai
    }
  }

  back() {
    this.formService.previousStep();
  }
}
