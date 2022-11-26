import * as SQLite from 'expo-sqlite'

const InventoryDB = SQLite.openDatabase('InventoryDB')


export const createInventoryTable = ()=>{
    InventoryDB.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on')
        );
    InventoryDB.transaction((tx)=>{
        tx.executeSql(`CREATE TABLE IF NOT EXISTS InventoryDB (
            ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            Category_Reference INTEGER REFERENCES CategoriesDB(ID),
            ImageUri TEXT NOT NULL,
            LAT REAL NOT NULL,
            LNG REAL NOT NULL,
        );`,[],
        ()=>{console.log('InventoryDB created successfully')},
        (_,error)=>{console.log(error)})
    })
}
