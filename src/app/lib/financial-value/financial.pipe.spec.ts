import { FinancialPipe } from './financial.pipe';

describe('FinancialPipe', () => {
  it('create an instance', () => {
    const pipe = new FinancialPipe();
    expect(pipe).toBeTruthy();
  });
});
