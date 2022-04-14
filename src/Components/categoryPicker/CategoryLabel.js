import styles from "./CategoryPicker.module.css";

const CategoryLabel = ({
  category,
  addCategoryToDatabase,
  categoriesChoosen,
}) => {
  return (
    <div
      className={styles.categoryLabel}
      onClick={addCategoryToDatabase}
      style={{
        backgroundColor: `${
          categoriesChoosen.includes(category) ? "#333" : ""
        }`,
        color: `${categoriesChoosen.includes(category) ? "#fff" : ""}`,
      }}
    >
      {" "}
      {category}
    </div>
  );
};

export default CategoryLabel;
