import * as SQLite from "expo-sqlite";

const CategoriesDB = SQLite.openDatabase("CategoriesDB");

export const recreateCategoriesTable = () => {
  return new Promise((resolve, reject) => {
    CategoriesDB.transaction(
      (tx) => {
        tx.executeSql(
          "DROP TABLE IF EXISTS CategoriesDB;",
          [],
          () => {
            console.log("CategoriesDB dropped successfully");
            createCategoriesTable();
          },
          (_, error) => {
            console.log(error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Error during transaction:", error);
        reject(error);
      },
      () => {
        console.log("Transaction completed");
        resolve();
      }
    );
  });
};

export const createCategoriesTable = () => {
  return new Promise((resolve, reject) => {
    CategoriesDB.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS CategoriesDB (
            ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            Title TEXT NOT NULL,
            Name TEXT,
            ImageUri TEXT,
            LAT REAL,
            LNG REAL
          );`,
          [],
          () => {
            console.log("CategoriesDB created successfully");
            resolve();
          },
          (_, error) => {
            console.log(error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Error during transaction:", error);
        reject(error);
      },
      () => {
        console.log("Transaction completed");
      }
    );
  });
};

export const insertJustTitleIntoCategories = (Title) => {
  return new Promise((resolve, reject) => {
    console.log(Title);
    CategoriesDB.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO CategoriesDB (Title, Name, ImageUri, LAT, LNG) SELECT ?, NULL, NULL, NULL, NULL WHERE NOT EXISTS (SELECT 1 FROM CategoriesDB WHERE Title = ?);",
          [Title, Title],
          (_, result) => {
            if (result.rowsAffected > 0) {
              console.log("Category inserted successfully");
              resolve();
            } else {
              console.log("Category with the same title already exists");
              resolve();
            }
          },
          (_, error) => {
            console.log("Error executing SQL:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Error during transaction:", error);
        reject(error);
      },
      () => {
        console.log("Transaction completed");
      }
    );
  });
};

export const insertCategories = (Title, Name, ImageUri, LAT, LNG) => {
  return new Promise((resolve, reject) => {
    CategoriesDB.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO CategoriesDB (Title, Name, ImageUri, LAT, LNG) VALUES (?,?,?,?,?);",
          [Title, Name, ImageUri, LAT, LNG],
          (_, result) => {
            console.log("Categories inserted successfully");
            resolve(result);
          },
          (error) => {
            console.log("Error inserting category:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Error during transaction:", error);
        reject(error);
      },
      () => {
        console.log("Transaction completed");
      }
    );
  });
};

export const fetchUniqueTitles = async () => {
  await createCategoriesTable();
  const promise = new Promise((resolve, reject) => {
    CategoriesDB.transaction((tx) => {
      tx.executeSql(
        "SELECT DISTINCT Title FROM CategoriesDB",
        [],
        (_, SQLResultSetRowList) => {
          let length = SQLResultSetRowList.rows.length;
          let results = [];

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              let item = SQLResultSetRowList.rows.item(i);
              results.push({
                Title: item.Title,
              });
            }
            console.log("Got unique titles");
            resolve(results);
          } else {
            console.log("No unique titles found");
            resolve([]);
          }
        },
        (_, error) => {
          console.log("Error fetching unique titles:", error);
          reject(error);
        }
      );
    });
  });
  return promise;
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
              results.push({
                id: item.ID,
                Title: item.Title,
                Name: item.Name,
                LAT: item.LAT,
                LNG: item.LNG,
              });
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

export const updateCategories = (oldTitle, newTitle) => {
  return new Promise((resolve, reject) => {
    CategoriesDB.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE CategoriesDB SET Title=? WHERE Title=?",
          [newTitle, oldTitle],
          (_, result) => {
            if (result.rowsAffected > 0) {
              console.log(
                `Updated categories with title ${oldTitle} to ${newTitle}`
              );
              resolve();
            } else {
              console.log(
                `No categories found with the specified title: ${oldTitle}`
              );
              resolve();
            }
          },
          (_, error) => {
            console.log("Error updating categories:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Error during transaction:", error);
        reject(error);
      },
      () => {
        console.log("Transaction completed");
      }
    );
  });
};

export const deleteCategories = (Title) => {
  return new Promise((resolve, reject) => {
    CategoriesDB.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM CategoriesDB WHERE Title = ?",
          [Title],
          (_, result) => {
            if (result.rowsAffected > 0) {
              console.log("Deleted categories with title:", Title);
              resolve();
            } else {
              console.log(
                "No categories found with the specified title:",
                Title
              );
              resolve();
            }
          },
          (_, error) => {
            console.log("Error deleting categories:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Error during transaction:", error);
        reject(error);
      },
      () => {
        console.log("Transaction completed");
      }
    );
  });
};
