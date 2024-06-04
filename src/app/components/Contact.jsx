import axios from 'axios';
import { motion } from "framer-motion";

import '../styles/contact.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignUp = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/sign-up');
    };

    return (
    <div id='contact'>
        <div className='contact_heading'>
            <p className='contact_title'>Create An Account</p>
            <h2>SIGN UP AND GET ACCESS TO <span>FREE</span> <br/>AUTOMATION RESOURCES!</h2>
        </div>
        <motion.button
            type="submit"
            className="sign-up-button"
            whileHover={{
                scale: 1.05,
            }}
            whileTap={{
                scale: 0.95
            }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
            }}
            onClick={handleClick}
        >
            SIGN UP
        </motion.button>
    </div>
    );
}

export default SignUp;