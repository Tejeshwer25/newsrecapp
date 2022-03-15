import styles from './Cards.module.css';

const Cards = ({data}) => {

    console.log(data)
    return (
        <div className={styles.card}>
            <div className={styles.cardImage}>
                <a href={data.url} target="_blank" rel="noopener noreferrer"><img src={data.image} alt=""/></a>
            </div>

            <div className={styles.cardBody}>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
            </div>
        </div>
    )
}

export default Cards;