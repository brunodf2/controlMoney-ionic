import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { IonicStorageModule } from "@ionic/storage";

import { SQLite } from "@ionic-native/sqlite";
import { DatePicker } from "@ionic-native/date-picker/ngx";



import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";

import { NewEntryPageModule } from "../pages/new-entry/new-entry.module";
import { ReportPageModule } from "../pages/report/report.module";
import { DatabaseProvider } from "../providers/database/database";
import { EntryDaoProvider } from "../providers/entry-dao/entry-dao";
import { CategoryDaoProvider } from "../providers/category-dao/category-dao";
import { AccountProvider } from "../providers/account/account";

import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    ComponentsModule,
    BrowserModule,
    NewEntryPageModule,
    ReportPageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DatePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider,
    EntryDaoProvider,
    CategoryDaoProvider,
    AccountProvider,
    
  ]
})
export class AppModule {}
