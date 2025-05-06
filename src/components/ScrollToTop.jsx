import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
    const pathName = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant"});
    }, [pathName]);

    return null;
}

export default ScrollTop;