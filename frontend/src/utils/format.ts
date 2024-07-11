export function formatarDinheiroBR(valor: string) {
  // Remove todos os caracteres que não são números
  valor = `${+valor.replace(/\D/g, '')}`;

  while (valor.length < 3) {
    valor = '0' + valor;
  }

  valor = valor.slice(0, -2) + ',' + valor.slice(-2);
  valor = valor.replace(/\B(?=(\d{3})+(?!\d{2}))/g, '.');

  valor = 'R$' + valor;

  return valor;
}
export function centavosParaReal(centavos: number) {
  // Verifica se o valor informado é numérico
  if (isNaN(centavos)) {
    return 'Valor inválido';
  }

  // Formata o valor em reais
  const valorFormatado = (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return valorFormatado;
}
