import { FormControl, FormGroup } from '@angular/forms';

export interface AddressForm {
  street: FormControl<string>;
  city: FormControl<string>;
}

export interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number>;
  address: FormGroup<AddressForm>;
}