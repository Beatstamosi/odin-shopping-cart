import styles from "./Footer.module.css";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { IconContext } from "react-icons";

function Footer() {
    return (
        <footer className={styles.containterFooter} data-testid="footer">
            <div className={styles.footerTop}>
                <div>
                    <p>About</p>
                    <p>Contact</p>
                    <p>FAQ</p>
                    <p>Privacy</p>
                </div>
                <div>
                    <p>Accessibility</p>
                    <p>Employment</p>
                    <p>Orders</p>
                    <p>Terms and Conditions</p>
                </div>
                <IconContext.Provider value={{ color: "black", className: "global-class-name", size: "1.5em"}}>
                    <div className={styles.footerLinks}>
                        <a href="https://instagram.com" aria-label="instagram" target="_blank"><FaInstagram /></a>
                        <a href="https://youtube.com" aria-label="youtube" target="_blank"><CiYoutube /></a>
                        <a href="https://github.com/Beatstamosi" aria-label="github" target="_blank"><FaGithub /></a>
                    </div>
                </IconContext.Provider>
            </div>
            <div className={styles.footerBottom}>
                <p>© 2025 Fake Store</p>
                <p>341134 FakeStreet, 98423 FakeCity, FakeLand</p>
            </div>
        </footer>
    )
}

export default Footer;