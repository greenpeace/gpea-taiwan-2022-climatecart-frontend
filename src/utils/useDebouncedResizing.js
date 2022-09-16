import { useDebounce } from "react-use";
import { useState, useEffect } from "react";

/**
 * @function useDebouncedResizing - 封裝好的resizing event handler
 * @param {function} callback
 * @param {number} interval - 多久觸發一次, 預設300 ms
 */
const useDebouncedResizing = (callback, interval = 300) => {
    const [windowWidth, setWindowWidth] = useState(null);
    useDebounce(
        () => {
            callback();
        },
        interval,
        [windowWidth]
    );

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window?.removeEventListener("reise", handleResize);
        };
    }, []);
};

export default useDebouncedResizing;
