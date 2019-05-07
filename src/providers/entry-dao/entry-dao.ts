import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../database/database";

@Injectable()
export class EntryDaoProvider {
  constructor( public database: DatabaseProvider) {}

  insert(entry) {
    console.log('início da gravação do BD');

    const sql = "INSERT INTO entries (amount, entry_at) VALUES (?, ?)";
    const data = [entry['amount'], 1];

    return this.database.db.executeSql(sql, data)
      .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));
  }
}
