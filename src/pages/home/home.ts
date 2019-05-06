import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NewEntryPage } from "../new-entry/new-entry";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  entries = [];

  constructor(public navCtrl: NavController, public sqlite: SQLite) {}

  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    console.log("Adicionar Lançamento");
    this.navCtrl.push(NewEntryPage);
  }

  loadData() {
    console.log("Inicio do teste DB");

    this.sqlite
      .create({
        name: "data.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        console.log("DB criado");

        // executa o comando de create table
        this.createTable(db).then(() => {
          console.log("tabelas criadas");

          // Selecionar registros
          this.select(db).then((values: any) => {
            let data;
            this.entries = [];

            for (var i = 0; i < values.rows.length; i++) {
              data = values.rows.item(i);
              console.log(JSON.stringify(data));
              this.entries.push(data);
            }

            console.log("-------------------------");

            this.balance(db).then((values: any) => {
              if (values.rows.length > 0) {
                const i = values.rows.item(0);
                console.log(JSON.stringify(i.balance));
              }
            });
          });
        });
      })
      .catch(() => {
        console.error("Error ao criar DB.");
      });
  }

  createTable(db) {
    console.log("DB criado");

    // executa o comando de create
    return db
      .sqlBatch([
        "CREATE TABLE IF NOT EXISTS entries( id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT) "
      ])
      .catch(console.error("erro ao criar a tabela"));
  }

  insert(v1, v2, db) {
    // Insere um valor qualquer...
    const sql = "INSERT INTO entries (amount, description) VALUES (?, ?)";
    const data = [v1, v2];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao inserir na tabela", JSON.stringify(e))
      );
  }

  update(v1, v2, id, db) {
    const sql = "UPDATE entries SET amount = ?, description = ? WHERE id = ?";
    const data = [v1, v2, id];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao atualizar registros", JSON.stringify(e))
      );
  }

  delete(id, db) {
    const sql = "DELETE FROM entries WHERE id = ?";
    const data = [id];

    return db
      .executeSql(sql, data)
      .catch(e => console.error("erro ao deletar registro", JSON.stringify(e)));
  }

  select(db) {
    const sql = "SELECT * FROM entries;";
    const data = [];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao selecionar registros", JSON.stringify(e))
      );
  }

  balance(db) {
    const sql = "SELECT SUM(amount) AS balance FROM entries;";
    const data = [];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao selecionar registros", JSON.stringify(e))
      );
  }
}
