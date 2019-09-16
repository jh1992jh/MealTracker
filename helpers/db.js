import { SQLite } from "expo-sqlite";

const db = SQLite.openDatabase("meals.db");

export const initFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, dateModified DATE,
                    idMeal TEXT NOT NULL,
                    strAmounts TEXT NOT NULL,
                    strArea TEXT,
                    strCategory TEXT NOT NULL,
                    strDrinkAlternate TEXT,
                    strIngredients TEXT NOT NULL,
                    strInstructions TEXT NOT NULL,
                    strMeal TEXT NOT NULL,
                    strMealThumb TEXT,
                    strSource TEXT,
                    strTags TEXT,
                    strYoutube TEXT);`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const initScheduled = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS scheduledMeals (id INTEGER PRIMARY KEY NOT NULL, dateModified DATE,
                    idMeal TEXT NOT NULL,
                    strAmounts TEXT NOT NULL,
                    strArea TEXT,
                    strCategory TEXT NOT NULL,
                    strDrinkAlternate TEXT,
                    strIngredients TEXT NOT NULL,
                    strInstructions TEXT NOT NULL,
                    strMeal TEXT NOT NULL,
                    strMealThumb TEXT,
                    strSource TEXT,
                    strTags TEXT,
                    strYoutube TEXT,
                    scheduledDate TEXT NOT NULL,
                    notificationId TEXT NOT NULL
                    );`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertFavorite = meal => {
  const promise = new Promise((resolve, reject) => {
    const {
      idMeal,
      strAmounts,
      strArea,
      strCategory,
      strDrinkAlternate,
      strIngredients,
      strInstructions,
      strMeal,
      strMealThumb,
      strSource,
      strTags,
      strYoutube
    } = meal;

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO favorites (idMeal, strAmounts, strArea, strCategory, strDrinkAlternate, strIngredients, strInstructions, strMeal, strMealThumb, strSource,strTags, strYoutube) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
        [
          idMeal,
          strAmounts,
          strArea,
          strCategory,
          strDrinkAlternate,
          strIngredients,
          strInstructions,
          strMeal,
          strMealThumb,
          strSource,
          strTags,
          strYoutube
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log(meal);
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertScheduledMeal = meal => {
  const promise = new Promise((resolve, reject) => {
    const {
      idMeal,
      strAmounts,
      strArea,
      strCategory,
      strDrinkAlternate,
      strIngredients,
      strInstructions,
      strMeal,
      strMealThumb,
      strSource,
      strTags,
      strYoutube,
      scheduledDate,
      notificationId
    } = meal;

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO scheduledMeals (idMeal, strAmounts, strArea, strCategory, strDrinkAlternate, strIngredients, strInstructions, strMeal, strMealThumb, strSource,strTags, strYoutube, scheduledDate , notificationId ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [
          idMeal,
          strAmounts,
          strArea,
          strCategory,
          strDrinkAlternate,
          strIngredients,
          strInstructions,
          strMeal,
          strMealThumb,
          strSource,
          strTags,
          strYoutube,
          scheduledDate,
          notificationId
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log(meal);
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM favorites;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchScheduledMeals = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM scheduledMeals;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteFavorite = idMeal => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM favorites WHERE idMeal=${idMeal}`,
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteScheduledMeal = notificationId => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM scheduledMeals WHERE notificationId=${notificationId}`,
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};
/*
 tx.executeSql(
        "DROP TABLE favorites;",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
*/

/* 
 tx.executeSql(
        "SELECT * from favorites;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
*/
