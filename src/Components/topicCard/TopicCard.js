import React from 'react';

import styles from "./TopicCard.module.css";

import businessIcon from "../../Assets/businessIcon.svg";
import entertainmentIcon from "../../Assets/entertainmentIcon.svg";
import generalIcon from "../../Assets/generalIcon.svg";
import healthIcon from "../../Assets/healthIcon.svg";
import scienceIcon from "../../Assets/scienceIcon.svg";
import sportsIcon from "../../Assets/sportsIcon.svg";
import technologyIcon from "../../Assets/technologyIcon.svg";

const TopicCard = ({topicName, img}) => {
    let image;
    if(topicName === "business") image=businessIcon;
    else if(topicName === "entertainment") image=entertainmentIcon;
    else if(topicName === "science") image=scienceIcon;
    else if(topicName === "sports") image=sportsIcon;
    else if(topicName === "technology") image=technologyIcon;
    else if(topicName === "health") image=healthIcon;
    else if(topicName === "general") image=generalIcon;

  return (
    <div className={styles.card}>
        <img src={image} alt={topicName} />
        <h3>{topicName}</h3>
    </div>
  )
}

export default TopicCard;