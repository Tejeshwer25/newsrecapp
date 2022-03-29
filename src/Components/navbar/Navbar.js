import {useState, useContext, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {signOut} from "firebase/auth";

import styles from './Navbar.module.css';

import hamburgerMenu from "../../Assets/hamburgerMenuIcon.svg";

import {Context} from "../../Context/userContext";
import {auth} from "../../firebase/firebase";
import UserChip from './UserChip';

const Navbar = () => {

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const {userDetails, setUserDetails} = useContext(Context);

  useEffect(() => setUserAuthenticated(userDetails.email !== ""), [userDetails.email]);

  const logoutUser = () => {
    signOut(auth);
    setUserDetails({name: "", email: ""});
    sessionStorage.clear();

    return <Navigate to="/login"/>
  }

  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar__brandName}>
            <h3><Link exact to={userDetails.email==="" ? "/" : "/welcome"}>ASSURENEWS</Link></h3>
        </div>

        {!userAuthenticated 
        ? <div className={styles.navbar__authLinks}>
            <p><Link to="/login">Sign In</Link></p>
            <Link to="/register"><button>Register</button></Link>
          </div>
        : <div>
            <UserChip logoutUser={logoutUser}/>
          </div>
        }

        <div style={{display: `${userAuthenticated ? 'none':''}`}} className={styles.navbar__mobileLink} onMouseEnter={() => setNavbarOpen(true)} onMouseLeave={() => setNavbarOpen(false)}>
          <div>
            <img src={hamburgerMenu} alt="" />
          </div>

          {!userAuthenticated 
          ? <div className={styles.navbar__mobileLinkAction} style={{display: `${navbarOpen ? "" : "none"}`}}>
              <p><Link to="/login">Sign In</Link></p>
              <Link to="/register"><button>"Register"</button></Link>
            </div>
          :  <UserChip logoutUser={logoutUser}/>}
        </div>
    </nav>
  )
}

export default Navbar;