// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  getBankAccount,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

interface BankAccount {
  _balance: number;
}

const initialBalance = 100;
const someMoney = 50;

const bankAccout: BankAccount = {
  _balance: initialBalance,
};

const account = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account).toEqual(bankAccout);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const overBalance = () => account.withdraw(200);
    expect(overBalance).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const receiver = getBankAccount(initialBalance);
    const sender = getBankAccount(someMoney);

    const transfering = () => receiver.transfer(200, sender);

    expect(transfering).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const transfering = () => account.transfer(50, account);
    expect(transfering).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const result = someMoney + initialBalance;
    account.deposit(someMoney);

    const balance = account.getBalance();
    expect(balance).toBe(result);
  });

  test('should withdraw money', () => {
    account.withdraw(someMoney);
    const balance = account.getBalance();
    expect(balance).toBe(initialBalance);
  });

  test('should transfer money', () => {
    const receiverAccoutBalance = 100;
    const senderAccount = getBankAccount(initialBalance);
    const receiverAccount = getBankAccount(receiverAccoutBalance);
    const transferMoney = 50;

    senderAccount.transfer(transferMoney, receiverAccount);

    const balanceSend = senderAccount.getBalance();
    expect(balanceSend).toBe(initialBalance - transferMoney);

    const balanceReceive = receiverAccount.getBalance();
    expect(balanceReceive).toBe(initialBalance + transferMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();

    if (balance === null) {
      expect(typeof balance).not.toBe('number');
    } else {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
