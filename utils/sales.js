const getTotalSalesAmount = (payments) => {
  let totalAmount = 0;
  payments.forEach((payment) => {
    totalAmount += payment.montant_paie;
  });

  return totalAmount;
};

const getSalesOfTheMonthAmount = (payments) => {
  const currentMonth = new Date().getMonth() + 1;
  let totalAmount = 0;

  payments.forEach((payment) => {
    const timestamp = Date.parse(payment.date_paie);
    const paymentMonth = new Date(timestamp).getMonth() + 1;

    if (paymentMonth == currentMonth) totalAmount += payment.montant_paie;
  });

  return totalAmount;
};

module.exports = { getTotalSalesAmount, getSalesOfTheMonthAmount };
