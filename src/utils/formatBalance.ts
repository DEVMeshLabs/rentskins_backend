export function formatBalance(balance: number) {
  const porcentagem = 4;
  const calcPorcentagem = balance * (porcentagem / 100);
  const result = balance - calcPorcentagem;
  return {
    formattedBalance: balance.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }),
    porcentagem: result,
  };
}
