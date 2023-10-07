import * as SQLite from "expo-sqlite";

const InventoryDB = SQLite.openDatabase("InventoryDB");

export const createInventoryTable = () => {
  InventoryDB.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS InventoryDB (
            ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            Name Text NOT NULL,
            ImageUri TEXT NOT NULL,
            LAT REAL NOT NULL,
            LNG REAL NOT NULL,
            CATEGORY_ID INTEGER NOT NULL
        );`,
      [],
      () => {
        console.log("InventoryDB created successfully");
      },
      (_, error) => {
        console.log(error);
      }
    );
  });
};

export const insertInventory = (Name, ImageUri, LAT, LNG, CATEGORY_ID) => {
  console.log({ Name, ImageUri, LAT, LNG, CATEGORY_ID });
  InventoryDB.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO InventoryDB (Name,ImageUri,LAT,LNG,CATEGORY_ID) VALUES (?,?,?,?,?);",
      [Name, ImageUri, LAT, LNG, CATEGORY_ID],
      (_, result) => {
        console.log("Inventory inserted");
      },
      (error) => {
        console.log("Error inserting inventory:", error);
      }
    );
  });
};

export const fetchInventory = () => {
  const promise = new Promise((resolve, reject) => {
    InventoryDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM InventoryDB ORDER BY ID DESC",
        [],
        (_, SQLResultSetRowList) => {
          let length = SQLResultSetRowList.rows.length;
          let results = [];

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              let item = SQLResultSetRowList.rows.item(i);
              results.push({
                id: item.ID,
                Name: item.Name,
                LAT: item.LAT,
                LNG: item.LNG,
                CATEGORY_ID: item.CATEGORY_ID,
              });
            }
            console.log("got the inventories");
            resolve(results);
          }
        },
        (_, error) => {
          reject("error on getting inventories");
        }
      );
    });
  });
  return promise;
};

export const updateInventories = (ID, Title) => {
  InventoryDB.transaction((tx) => {
    tx.executeSql(
      `UPDATE InventoriesDB SET Title=? WHERE ID=?`,
      [Title, ID],
      (_, result) => {
        console.log("updated inventories");
      },
      (_, error) => {
        console.log("error updating inventories");
      }
    );
  });
};

export const deleteInventories = (ID) => {
  InventoryDB.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM InventoryDB WHERE ID=?`,
      [ID],
      (_, result) => {
        console.log("deleted inventories");
      },
      (_, error) => {
        console.log("error deleting inventories");
      }
    );
  });
};
