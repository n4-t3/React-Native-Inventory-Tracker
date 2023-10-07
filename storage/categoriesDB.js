import * as SQLite from "expo-sqlite";

const CategoriesDB = SQLite.openDatabase("CategoriesDB");

export const createCategoriesTable = () => {
  CategoriesDB.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS CategoriesDB (
            ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            Title TEXT NOT NULL
        );`,
      [],
      () => {
        console.log("CategoriesDB created successfully");
      },
      (_, error) => {
        console.log(error);
      }
    );
  });
};

export const insertCategories = (Title) => {
  CategoriesDB.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO CategoriesDB (Title) VALUES (?);",
      [Title],
      (_, result) => {
        console.log("categories inserted");
      },
      (error) => {
        console.log("Error inserting category:", error);
      }
    );
  });
};

export const fetchCategories = () => {
  const promise = new Promise((resolve, reject) => {
    CategoriesDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM CategoriesDB ORDER BY ID DESC",
        [],
        (_, SQLResultSetRowList) => {
          let length = SQLResultSetRowList.rows.length;
          let results = [];

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              let item = SQLResultSetRowList.rows.item(i);
              results.push({ id: item.ID, Title: item.Title });
            }
            console.log("got the categories");
            resolve(results);
          }
        },
        (_, error) => {
          reject("error on getting categories");
        }
      );
    });
  });
  return promise;
};

export const updateCategories = (ID, Title) => {
  CategoriesDB.transaction((tx) => {
    tx.executeSql(
      `UPDATE CategoriesDB SET Title=? WHERE ID=?`,
      [Title, ID],
      (_, result) => {
        console.log("updated categories");
      },
      (_, error) => {
        console.log("error updating categories");
      }
    );
  });
};

export const deleteCategories = (ID) => {
  CategoriesDB.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM CategoriesDB WHERE ID=?`,
      [ID],
      (_, result) => {
        console.log("deleted categories");
      },
      (_, error) => {
        console.log("error deleting category");
      }
    );
  });
};
