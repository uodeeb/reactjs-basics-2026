import styles from '../css/Header.module.css'
import Logo from '../assets/Techifly_logo_org-removebg.png'
import Navbar from './Navbar.jsx'

function Header(){
    // const headerStyle = {
    //     height: '10vh',
    //     width: '100%',
    //     backgroundColor: '#e18181',
    // }
    
    // const title = 'Header Component 02'

    return (
        <header className={styles.header}>
            <section 
                id={styles.hd__sec01} 
                className={styles.hd__sec}
                style={{
                    backgroundImage: `url(${Logo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                }}
                
                >

            </section>
            <section id={styles.hd__sec02} className={styles.hd__sec}>
                <Navbar />
            </section>
            <section id={styles.hd__sec03} className={styles.hd__sec}>

            </section>
        </header>
    )

}
export default Header