import * as SQLite from 'expo-sqlite'

const InventoryDB = SQLite.openDatabase('InventoryDB')

// TODO: set foreign key properly in inventoriesDB
export const createInventoryTable = ()=>{
    InventoryDB.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on')
        );
    InventoryDB.transaction((tx)=>{
        tx.executeSql(`CREATE TABLE IF NOT EXISTS InventoryDB (
            ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            Category_Reference INTEGER REFERENCES CategoriesDB(ID),
            Name Text NOT NULL,
            ImageUri TEXT NOT NULL,
            LAT REAL NOT NULL,
            LNG REAL NOT NULL
        );`,[],
        ()=>{console.log('InventoryDB created successfully')},
        (_,error)=>{console.log(error)})
    })
}

export const insertInventory = (Category_Reference,Name,ImageUri,LAT,LNG)=>{
    InventoryDB.transaction((tx)=>{
        tx.executeSql("INSERT INTO InventoryDB (Category_Reference,Name,ImageUri,LAT,LNG) VALUES (?,?,?,?,?);",[Category_Reference,Name,ImageUri,LAT,LNG],
        (_,result)=>{console.log('categories inserted')},(error)=>{console.log(error)})
    })
}

export const fetchInventory = ()=>{
    const promise = new Promise ((resolve,reject)=>{
        InventoryDB.transaction((tx)=>{
            tx.executeSql(
                'SELECT * FROM InventoryDB ORDER BY ID DESC',[],(_,SQLResultSetRowList)=>{
                    let length = SQLResultSetRowList.rows.length
                    let results = []
    
                    if (length>0){
                        for(let i=0;i<length;i++){
                            let item = SQLResultSetRowList.rows.item(i)
                            results.push({id: item.ID, Title: item.Title})
                        }
                    console.log('got the inventories')
                    resolve(results)
                    }
                },(_,error)=>{reject('error on getting inventories')}
            )
        })
    })
    return promise
}