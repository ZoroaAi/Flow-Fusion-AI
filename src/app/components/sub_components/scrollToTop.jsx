import React, { useState, useEffect } from 'react';

const styles = {
    scrollToTopButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px',
      fontSize: '20px',
      backgroundColor: '#5F4DEE',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }
};

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);


    const checkScrollTop = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const servicesSectionOffsetTop = servicesSection.offsetTop;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsVisible(scrollTop > servicesSectionOffsetTop);
        }
    };

    const handleClick =() => {
        const heroSection = document.getElementById('hero');
        window.scrollTo({
            top: heroSection.offsetTop,
            behaviour: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, []);

    return (
    isVisible && (
        <button
            style={styles.scrollToTopButton}
            onClick={handleClick}
        >
            &#8679;
            {/* <a href="#hero">
                &#8679;
            </a> */}
        </button>
    )
    );
};

export default ScrollToTopButton;
