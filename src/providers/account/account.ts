import { DatabaseProvider } from "./../database/database";
import { Injectable } from "@angular/core";
import { EntryDaoProvider } from "../entry-dao/entry-dao";
import { CategoryDaoProvider } from "../category-dao/category-dao";

@Injectable()
export class AccountProvider {
  private balance = 0;

  constructor(
    public entryDao: EntryDaoProvider,
    public categoryDao: CategoryDaoProvider
  ) {}

  // Calcula o saldo inicial
  loadBalance() {
    console.log("load balance");

    return this.entryDao.getBalance().then(balance => {
      this.balance = Number(balance);
      return this.balance;
    });
  }

  // Adiciona um novo lançamento
  addEntry(amount, categoryId) {
    this.balance += Number(amount);

    return this.entryDao
      .insert(amount, categoryId)
      .then(() => console.log("new entry added"));
  }

  // Retorna o saldo atual
  currentBalance() {
    return this.balance;
  }

  lastEntries(days) {
    let criteria = "entry_at >= ?";
    let data = [DatabaseProvider.now(days, true)];

    return this.entryDao.getAll(criteria, data);
  }

  allEntries() {
    return this.entryDao.getAll();
  }

  lastEntriesByDate(days) {
    let criteria = "entry_at >= ?";
    let data = [DatabaseProvider.now(days, true)];

    return this.entryDao.getByDate(criteria, data);
  }

  lastEntriesByCategory(days) {
    let criteria = "entry_at >= ?";
    let data = [DatabaseProvider.now(days, true)];

    return this.entryDao.getByCategory(criteria, data);
  }
}
