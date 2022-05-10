import { useState, useContext } from "react";

import Navbar from "../Components/navbar/Navbar";
import userImage from "../Assets/tempUserIcon.svg";
import { Context } from "../Context/userContext";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { userDetails } = useContext(Context);
  const categories = [
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
    "breaking-news",
    "world",
    "nation",
  ];
  const [changePasswordMenuOpen, setChangePasswordMenuOpen] = useState(false);
  const [updateTopicsMenuOpen, setUpdateTopicsMenuOpen] = useState(false);
  const [deleteAccountMenuOpen, setDeleteAccountMenuOpen] = useState(false);
  const [updatedTopics, setUpdatedTopics] = useState(userDetails.topicsChoosen);

  function changePassword() {}

  function updateTopics(category) {
    if (updatedTopics.includes(category)) {
      setUpdatedTopics(updatedTopics.filter((topic) => topic !== category));
    } else {
      setUpdatedTopics([...updatedTopics, category]);
    }
  }

  function postNewTopics() {
    console.log(updatedTopics);

    setUpdateTopicsMenuOpen(false);
  }

  return (
    <div>
      <Navbar />

      <div className={styles.UserProfile__header}>
        <img src={userImage} alt="User Profile" />
        <h2>{userDetails.email || sessionStorage.getItem("email")}</h2>
      </div>

      <div className={styles.userProfile__settings}>
        <div>
          <h3
            onClick={() => setChangePasswordMenuOpen(!changePasswordMenuOpen)}
          >
            <span>Change password</span>
            <span>{changePasswordMenuOpen ? "-" : "+"}</span>
          </h3>
          {changePasswordMenuOpen ? (
            <div className={styles.userProfile__sectionMenu}>
              <input type="password" placeholder="Enter Current Password" />
              <input type="password" placeholder="Enter New Password" />
              <button onClick={changePassword}>Change Password</button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <h3 onClick={() => setUpdateTopicsMenuOpen(!updateTopicsMenuOpen)}>
            <span>Update Topics Choosen</span>
            <span>{updateTopicsMenuOpen ? "-" : "+"}</span>
          </h3>
          {updateTopicsMenuOpen ? (
            <div className={styles.userProfile__sectionMenu}>
              <div>
                {categories.map((category) => (
                  <div
                    className={
                      updatedTopics.includes(category)
                        ? styles.topicAlreadyChoosen
                        : ""
                    }
                    onClick={() => updateTopics(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
              <button onClick={postNewTopics}>Update Categories</button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <h3 onClick={() => setDeleteAccountMenuOpen(!deleteAccountMenuOpen)}>
            <span>Delete Your Account</span>
            <span>{deleteAccountMenuOpen ? "-" : "+"}</span>
          </h3>
          {deleteAccountMenuOpen ? (
            <div className={styles.userProfile__sectionMenu}>
              <div>
                <h3>
                  Are you sure you want to <span>Delete</span> your account?
                </h3>
              </div>
              <button onClick={() => alert("Account Deleted")}>
                Delete Account
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
