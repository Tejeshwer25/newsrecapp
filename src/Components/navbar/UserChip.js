import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import userProfile from "../../Assets/tempUserIcon.svg";
import arrowHeadIcon from "../../Assets/arrowHeadIcon.svg";

import { Context } from "../../Context/userContext";

const UserChip = ({ logoutUser }) => {
  const { userDetails } = useContext(Context);

  const [userName, setUserName] = useState("");
  const [openNavigation, setOpenNavigation] = useState(false);

  useEffect(() => {
    if (userName) setUserName(userName);
    else if (userDetails.email) setUserName(userDetails.email);
    else setUserName(sessionStorage.getItem("email"));
  }, []);

  return (
    <>
      <div
        className={styles.userChip}
        onMouseEnter={() => setOpenNavigation(true)}
        onMouseLeave={() => setOpenNavigation(false)}
      >
        <div className={styles.userChip__profileImage}>
          <img src={userProfile} alt="" />
        </div>
        <div className={styles.userChip__userDetail}>
          <p>
            {userName.split("@")[0].length > 7
              ? userName.split("@")[0].slice(0, 8) + "..."
              : userName.split("@")[0]}
          </p>
          <img src={arrowHeadIcon} alt="" />
        </div>

        <div
          className={styles.userChip__navContainer}
          style={{ display: `${openNavigation ? "" : "none"}` }}
        >
          <div className={styles.userChip__navItem}>
            <ul>
              <li>
                <Link to="/userProfile">User Profile</Link>
              </li>
              <li>
                <Link to="/login" onClick={logoutUser}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChip;
