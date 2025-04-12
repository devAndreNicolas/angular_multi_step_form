import { Injectable } from '@angular/core';
import { DynamicField } from '../models/dynamic-field.module';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private data: any = {};
  private stepIndex = 0;

  constructor() {
    const saved = localStorage.getItem('formData');
    if (saved) this.data = JSON.parse(saved);
  }

  get currentStep() {
    return this.stepIndex;
  }

  get formData() {
    return this.data;
  }

  setStep(index: number) {
    this.stepIndex = index;
  }

  nextStep() {
    this.stepIndex++;
  }

  previousStep() {
    if (this.stepIndex > 0) this.stepIndex--;
  }

  resetForm() {
    this.stepIndex = 0;
    this.data = {};
    localStorage.removeItem('formData');
  }

  updateData(newData: any) {
    this.data = { ...this.data, ...newData };
    localStorage.setItem('formData', JSON.stringify(this.data));
  }
}