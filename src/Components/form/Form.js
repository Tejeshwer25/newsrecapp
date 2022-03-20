import {Link} from 'react-router-dom';

import styles from "./Form.module.css";

const Form = ({userData, setUserData, setUserLoggedIn, formType}) => {

    const submitForm = (e) => {
        e.preventDefault();
        setUserLoggedIn(true);

        console.log(e)
    }

    return (
        <div className={styles.form}>
            {formType==="Login" 
                ? <form onSubmit={submitForm}>
                    <div className={styles.formTitle}>
                        <p>News Portal</p>
                        <h3>Login</h3>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="yourself@gmail.com" 
                            value={userData.email} 
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={userData.password} 
                            onChange={(e) => setUserData({...userData, password: e.target.value})}
                        />
                    </div>

                    <p>Forgot Password?</p>

                    <button onSubmit={submitForm}>Sign IN</button>
                </form> 

                : <form onSubmit={submitForm}>
                    <div className={styles.formTitle}>
                        <p>News Portal</p>
                        <h3>Register</h3>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={userData.name} 
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="yourself@gmail.com" 
                            value={userData.email} 
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={userData.password} 
                            onChange={(e) => setUserData({...userData, password: e.target.value})}
                        />
                    </div>

                    <button onSubmit={submitForm}>Register</button>
                </form>
            }
            

            <p>Don't have an account yet? <Link to={formType==="Login" ? "/register":"/login"}>{ formType === "Login" ? "Register" : "Login"} here</Link></p>
        </div>
    )
}

export default Form;