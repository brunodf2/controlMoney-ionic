import { CategoryDaoProvider } from "./../category-dao/category-dao";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntryDaoProvider } from "../entry-dao/entry-dao";

@Injectable()
export class AccountProvider {
  private balance = 0;

  constructor(
    public entryDao: EntryDaoProvider,
    public categoryDao: CategoryDaoProvider
  ) 
  {
    this.loadBalance();
  }
  // Adiciona um novo lançamento
  addEntry(amount, categoryId) {
    this.balance += Number(amount);

    return this.entryDao
      .insert(amount, categoryId)
      .then(() => console.log("new entry add"));
  }
  // Retorna o saldo atual
  currentBalance() {
    return this.balance;
  }

  allEntries() {
    return this.entryDao.getAll();
  }

  // Calcula o saldo no momento de inicializar a classe 
  private loadBalance() {
    this.entryDao
      .getBalance()
      .then((balance: any) => (this.balance = Number(balance)));
  }
}
