/**
 * Funções para geração e validação de CNPJ
 */

export const generateCNPJ = (formatted: boolean = false): string => {
  // Gerar 12 primeiros dígitos
  const randomDigits = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
  
  // Calcular primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += randomDigits[i] * weights1[i];
  }
  let firstDigit = sum % 11;
  firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;
  
  // Calcular segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += randomDigits[i] * weights2[i];
  }
  sum += firstDigit * weights2[12];
  let secondDigit = sum % 11;
  secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;
  
  const cnpj = [...randomDigits, firstDigit, secondDigit].join('');
  
  if (formatted) {
    return formatCNPJ(cnpj);
  }
  
  return cnpj;
};

export const formatCNPJ = (cnpj: string): string => {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const validateCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleaned)) return false;
  
  // Validar primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned[i]) * weights1[i];
  }
  let firstDigit = sum % 11;
  firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;
  
  if (firstDigit !== parseInt(cleaned[12])) return false;
  
  // Validar segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleaned[i]) * weights2[i];
  }
  let secondDigit = sum % 11;
  secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;
  
  if (secondDigit !== parseInt(cleaned[13])) return false;
  
  return true;
};
