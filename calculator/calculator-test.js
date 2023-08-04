
it('should calculate the monthly rate correctly', function () {
  let values  = { amount: 50000, years: 6, rate: 7 };
  expect(calculateMonthlyPayment(values)).toBe('852.45');
});


it("should return a result with 2 decimal places", function() {
  let values  = { amount: 500000, years: 2, rate: 2 };
  expect(calculateMonthlyPayment(values)).toBe('21270.13');
});


