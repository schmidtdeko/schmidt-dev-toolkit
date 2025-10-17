import { describe, it, expect } from 'vitest';
import { generateCPF } from './cpf';

describe('CPF Generator', () => {
  it('should generate a valid CPF', () => {
    const cpf = generateCPF();
    // Basic format check
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    
    // A more robust validation would require a CPF validation function,
    // which is outside the scope of this initial test setup.
    // For now, we check the format and length.
    const numbersOnly = cpf.replace(/\D/g, '');
    expect(numbersOnly.length).toBe(11);
  });

  it('should generate a different CPF on each call', () => {
    const cpf1 = generateCPF();
    const cpf2 = generateCPF();
    expect(cpf1).not.toBe(cpf2);
  });
});
