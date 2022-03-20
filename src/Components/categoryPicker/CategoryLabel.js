import styles from "./CategoryPicker.module.css";

const CategoryLabel = ({category}) => {
  return (
    <div className={styles.categoryLabel}>
        <button>+</button>
        <p>{category}</p>
    </div>
  )
}

export default CategoryLabel;