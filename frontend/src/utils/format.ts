export function formatarDinheiroBR(valor) {
  // Remove todos os caracteres que não são números
  valor = `${+valor.replace(/\D/g, '')}`;

  while (valor.length < 3) {
    valor = '0' + valor;
  }

  valor = valor.slice(0, -2) + ',' + valor.slice(-2);
  valor = valor.replace(/\B(?=(\d{3})+(?!\d{2}))/g, '.');

  valor = 'R$' + valor;
  console.log(valor);
  return valor;
}
