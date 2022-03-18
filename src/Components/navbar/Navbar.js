import {useState} from 'react';
import {Link} from 'react-router-dom';

import styles from './Navbar.module.css';

import hamburgerMenu from "../../Assets/hamburgerMenuIcon.svg";

const Navbar = () => {

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar__brandName}>
            <h3>ASSURENEWS</h3>
        </div>

        <div className={styles.navbar__authLinks}>
            <p><Link to="/login">Sign In</Link></p>
            <Link to="/register"><button>Register</button></Link>
        </div>

        <div className={styles.navbar__mobileLink} onMouseEnter={() => setNavbarOpen(true)} onMouseLeave={() => setNavbarOpen(false)}>
          <div>
            <img src={hamburgerMenu} alt="" />
          </div>

          <div className={styles.navbar__mobileLinkAction} style={{display: `${navbarOpen ? "" : "none"}`}}>
            <p><Link to="/login">Sign In</Link></p>
            <Link to="/register"><button>Register</button></Link>
          </div>
        </div>
    </nav>
  )
}

export default Navbar;