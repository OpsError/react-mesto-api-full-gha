import { useLocation } from "react-router-dom";

function Footer () {
    const location = useLocation();

    return(
        <footer className="footer">
            {location.pathname === '/'? <p className="footer__author">{`© ${new Date().getFullYear()} Mesto Russia`}</p> : <></>}
        </footer>
    );
}

export default Footer;