import * as SQLite from 'expo-sqlite'

const CategoriesDB = SQLite.openDatabase('CategoriesDB')

export const createCategoriesTable = ()=>{
    CategoriesDB.transaction((tx)=>{
        tx.executeSql(`CREATE TABLE IF NOT EXISTS CategoriesDB (
            ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            Title TEXT NOT NULL,
            ImageUri TEXT NOT NULL
        )`,[],
        ()=>{console.log('Table created successfully')},
        (_,error)=>{console.log('There was an error creating the table')})
    })
}

export const insertCategories = (categories)=>{
    CategoriesDB.transaction((tx)=>{
        tx.executeSql(`INSERT INTO CategoriesDB (Title, ImageUri) VALUES (?,?)`,[categories.Title,categories.ImageUri],
        (_,result)=>{console.log('categories inserted')},(error)=>{'There was an error inserting categories'})
    })
}

export const fetchCategories = ()=>{
    const promise = new Promise((resolve,reject)=>{
        CategoriesDB.transaction((tx)=>{
            tx.executeSql(
                'SELECT * FROM CategoriesDB ORDER BY ID DESC',[],(_,SQLResultSetRowList)=>{
                    let length = SQLResultSetRowList.rows.length
                    let results = []
    
                    if (length>0){
                        for(let i=0;i<length;i++){
                            let item = SQLResultSetRowList.rows.item(i)
                            results.push({id: item.ID, Title: item.Title, ImageUri: item.ImageUri})
                        }
                    console.log('got the categories')
                    resolve(results)
                    }
                },(_,error)=>{reject('error on getting categories')}
            )
        })
    })
    return promise
}

export const updateCategories = (ID,Title,ImageUri)=>{
		CategoriesDB.transaction((tx)=>{
			tx.executeSql(
				`UPDATE CategoriesDB SET Title=? ImageUri=? WHERE ID=?`,[Title,ImageUri,ID],(_,result)=>{console.log('updated categories')},(_,error)=>{console.log('error updating categories')}
			)
		})
}

export const deleteCategories = (ID)=>{
		CategoriesDB.transaction((tx)=>{
			tx.executeSql(
				`DELETE FROM CategoriesDB WHERE ID=?`,[ID],(_,result)=>{console.log('deleted categories')},(_,error)=>{console.log('error deleting category')}
			)
		})
}   