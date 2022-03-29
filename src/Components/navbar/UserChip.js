import {useState, useContext} from "react";
import {Link} from "react-router-dom"

import styles from "./Navbar.module.css";
import userProfile from "../../Assets/tempUserIcon.svg";
import arrowHeadIcon from "../../Assets/arrowHeadIcon.svg";

import {Context} from "../../Context/userContext";

const UserChip = ({logoutUser}) => {
  const {userDetails} = useContext(Context);

  const [openNavigation, setOpenNavigation] = useState(false);


  return (
    <>
    <div className={styles.userChip} onMouseEnter={() => setOpenNavigation(true)} onMouseLeave={() => setOpenNavigation(false)}>
        <div className={styles.userChip__profileImage}>
          <img src={userProfile} alt="" />
        </div>
        <div className={styles.userChip__userDetail}>
          <p>
            {
              userDetails.email.split('@')[0].length > 7 
              ? userDetails.email.split('@')[0].slice(0, 8) + '...'
              : userDetails.email.split('@')[0]
            }
          </p>
          <img src={arrowHeadIcon} alt="" />
        </div>
        
        <div className={styles.userChip__navContainer} style={{display: `${openNavigation ? '' : 'none'}`}}>
          <div className={styles.userChip__navItem}>
            <ul>
              <li>
                <a href="">User Profile</a>
              </li>
              <li>
                <Link to="/login" onClick={logoutUser}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
    </div>
    </>
  )
}

export default UserChip;