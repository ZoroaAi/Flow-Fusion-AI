import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

import { DarkModeContext } from './DarkMode';
import './themebutton.scss';

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const ThemeButton = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    const toggleSwitch = () => {
        console.log("Theme Button Clicked.")
        setDarkMode(prevMode => !prevMode);
    }
    useEffect(() => {
        console.log(darkMode);
    }, [darkMode]);

    return (
        <div className= {`switch ${darkMode ? 'dark' : ''}`} data-darkMode={darkMode} onClick={toggleSwitch}>
            <input 
                type="checkbox" 
                defaultChecked={darkMode} 
                readOnly
            />
            <motion.div className='handle' transition={spring} layout />
        </div>
    )
}

export default ThemeButton;