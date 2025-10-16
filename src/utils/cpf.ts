/**
 * Funções para geração e validação de CPF
 */

export const generateCPF = (formatted: boolean = false): string => {
  // Gerar 9 primeiros dígitos
  const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  
  // Calcular primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += randomDigits[i] * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  firstDigit = firstDigit >= 10 ? 0 : firstDigit;
  
  // Calcular segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += randomDigits[i] * (11 - i);
  }
  sum += firstDigit * 2;
  let secondDigit = 11 - (sum % 11);
  secondDigit = secondDigit >= 10 ? 0 : secondDigit;
  
  const cpf = [...randomDigits, firstDigit, secondDigit].join('');
  
  if (formatted) {
    return formatCPF(cpf);
  }
  
  return cpf;
};

export const formatCPF = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  
  // Validar primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  firstDigit = firstDigit >= 10 ? 0 : firstDigit;
  
  if (firstDigit !== parseInt(cleaned[9])) return false;
  
  // Validar segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  let secondDigit = 11 - (sum % 11);
  secondDigit = secondDigit >= 10 ? 0 : secondDigit;
  
  if (secondDigit !== parseInt(cleaned[10])) return false;
  
  return true;
};
