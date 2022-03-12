import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar__brandName}>
            <h3>ASSURENEWS</h3>
        </div>

        <div className={styles.navbar__authLinks}>
            <p>Sign In</p>
            <button>Register</button>
        </div>
    </nav>
  )
}

export default Navbar;