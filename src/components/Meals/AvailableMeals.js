import classes from './AvailableMeals.module.css';

import { DUMMY_MEALS } from './dummy-meals';

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return <li>{meal.name}</li>;
  });

  return (
    <section className={classes.meals}>
      <ul>{mealsList}</ul>
    </section>
  );
};

export default AvailableMeals;
