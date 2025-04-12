import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ConfirmacaoPassoComponent } from "../confirmacao-passo/confirmacao-passo.component";
import { InputPassoComponent } from "../input-passo/input-passo.component";
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { DynamicField } from '../../models/dynamic-field.module';

@Component({
  selector: 'app-multi-step-form',
  imports: [ConfirmacaoPassoComponent, InputPassoComponent, CommonModule],
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-30px)' }))
      ])
    ]),
  ],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css'
})
export class MultiStepFormComponent implements OnInit {
  @Input() dynamicFields: DynamicField[] = []; // Recebe os campos dinamicamente

  steps: any[] = [];

  constructor(public formService: FormService, public router: Router) {}

  ngOnInit() {
    // Inicializa os passos com os campos recebidos
    this.steps = [
      { type: 'form', fields: this.dynamicFields }, // Usa os campos recebidos via @Input()
      { type: 'confirm' }
    ];
  }

  isFormStep(step: any) {
    return step.type === 'form';
  }

  isConfirmStep(step: any) {
    return step.type === 'confirm';
  }

  getProgressWidth(): number {
    return ((this.formService.currentStep + 1) / this.steps.length) * 100;
  }

  finish() {
    console.log('Finalizado:', this.formService.formData); // Verifica os dados no console
    this.formService.resetForm(); // Reseta os dados do formulário
    this.router.navigate(['/home']); // Navega para a rota "home"
  }
}