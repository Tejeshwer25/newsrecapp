import CategoryLabel from "./CategoryLabel";
import styles from "./CategoryPicker.module.css";

const CategoryPicker = ({
  categories,
  categoriesChoosen,
  setCategoriesChoosen,
  addCategoryToDatabase,
}) => {
  function addToList(e) {
    const tempCategory = categoriesChoosen;
    if (categoriesChoosen.includes(e.target.innerText)) {
      setCategoriesChoosen(
        tempCategory.filter((category) => category !== e.target.innerText)
      );
    } else {
      setCategoriesChoosen([...tempCategory, e.target.innerText]);
    }

    console.log(categoriesChoosen);
  }

  return (
    <div className={styles.categoryPicker}>
      <div className={styles.categoryPicker__header}>
        <h3>Choose Topics of Your Interest</h3>
      </div>

      <div className={styles.categoryPicker__mainSecion}>
        {categories.map((category) => (
          <CategoryLabel
            category={category}
            addCategoryToDatabase={addToList}
            key={category}
            categoriesChoosen={categoriesChoosen}
          />
        ))}
      </div>

      <div className={styles.categoryPicker__buttons}>
        <button onClick={() => addCategoryToDatabase()}>Save Categories</button>
      </div>
    </div>
  );
};

export default CategoryPicker;
