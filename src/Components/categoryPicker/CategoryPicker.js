import CategoryLabel from "./CategoryLabel";
import styles from "./CategoryPicker.module.css";

const CategoryPicker = ({categories, categoriesChoosen, setCategoriesChoosen, addCategoryToDatabase, setShowCategoryWindow}) => {
    return (
        <div className={styles.categoryPicker}>
            <div className={styles.categoryPicker__header}>
                <h3>Choose Topics of Your Interest</h3>
                <h3 style={{cursor: 'pointer'}} onClick={() => setShowCategoryWindow(false)}>X</h3>
                {/* <img src="" alt="close category picker" /> */}
            </div>

            <div className={styles.categoryPicker__mainSecion}>
                {categories.map(category => <CategoryLabel category={category} addCategoryToDatabase={addCategoryToDatabase} key={category}/>)}
            </div>
        </div>
    )
}

export default CategoryPicker;