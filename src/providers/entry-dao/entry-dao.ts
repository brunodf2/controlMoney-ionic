import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../database/database";

@Injectable()
export class EntryDaoProvider {
  constructor(public database: DatabaseProvider) {}

  insert(amount, categoryId) {
    const sql = "INSERT INTO entries (amount, entry_at, category_id) VALUES (?, ?, ?)";
    const data = [amount, 1, categoryId];

    return this.database.db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao inserir na tabela", JSON.stringify(e))
      );
  }

  update(entry, id) {
    const sql = "UPDATE entries SET amount = ?, category_id = ? WHERE id = ?";
    const data = [entry["amount"], entry["category_id"], id];

    return this.database.db
      .executeSql(sql, data)
      .catch(e => console.error("error on update", JSON.stringify(e)));
  }

  delete(id) {
    const sql = "DELETE FROM  entries WHERE id = ?";
    const data = [id];

    return this.database.db
      .executeSql(sql, data)
      .catch(e => console.error("error on delete", JSON.stringify(e)));
  }

  deleteAll() {
    const sql = "DELETE FROM entries";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .catch(e => console.error("error on delete all", JSON.stringify(e)));
  }

  get(id: number) {
    const sql = "SELECT * FROM entries WHERE id = ?";
    const data = [id];

    return this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          const item = data.rows.item(0);
          return item;
        }

        return null;
      })
      .catch(e => console.error("error on get", JSON.stringify(e)));
  }

  getAll() {
    const sql = "SELECT * FROM entries ORDER BY entry_at";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let entries: any[] = [];

          for (var i = 0; i < data.rows.lenght; i++) {
            const item = data.rows.item(i);
            entries.push(item);
          }

          return entries;
        }

        return null;
      })
      .catch(e => console.error("error on get", JSON.stringify(e)));
  }

  getBalance(){
    const sql = "SELECT SUM(amount) AS balance FROM entries";
    const data = [];

    return this.database.db 
      .executeSql(sql, data)
        .then((data: any) => {
          if(data.rows.lenght > 0) {
            const item = data.rows.item(0);
            return item.balance;
          }

          return null;
        })
        .catch((e) => console.error('error on getBalance', JSON.stringify(e)))
  }
}