export const processMeal = meal => {
  const ingredients = [];
  const amounts = [];

  for (const ingredient in meal) {
    if (ingredient.includes("strIngredient")) {
      meal[ingredient] !== null &&
        meal[ingredient].length > 1 &&
        ingredients.push(meal[ingredient]);
    }
  }

  for (const amount in meal) {
    if (amount.includes("strMeasure")) {
      meal[amount] !== null &&
        meal[amount].length > 0 &&
        amounts.push(meal[amount]);
    }
  }

  const processedIngredientsArr = ingredients.map(
    ingredient => `${ingredient}, `
  );

  const processedAmountsArr = amounts.map(amount => `${amount}, `);

  const processedIngredientsStr = processedIngredientsArr.join("");
  const processedAmountsStr = processedAmountsArr.join("");

  const mealCopy = { ...meal };

  for (const ingredient in mealCopy) {
    if (ingredient.includes("strIngredient")) {
      delete mealCopy[ingredient];
    }
  }

  for (const amount in mealCopy) {
    if (amount.includes("strMeasure")) {
      delete mealCopy[amount];
    }
  }

  mealCopy.strIngredients = processedIngredientsStr;
  mealCopy.strAmounts = processedAmountsStr;

  return mealCopy;
};
