export interface DynamicField {
    label: string;
    name: string;
    type: 'text' | 'email' | 'number' | 'date' | 'select';
    options?: string[];
    required: boolean;
}