import styles from "./CategoryPicker.module.css";

const CategoryLabel = ({category, addCategoryToDatabase}) => {
  return (
    <div className={styles.categoryLabel} onClick={addCategoryToDatabase}>
        {category}
    </div>
  )
}

export default CategoryLabel;