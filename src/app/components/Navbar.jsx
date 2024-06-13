"use client"

import { useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useAuth } from '@/hooks/useAuth';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import '../styles/navbar.scss';
import Link from 'next/link';

const NavButton = () => {
    useEffect(() => {
      (async function () {
        try {
          const cal = await getCalApi({});
          cal("ui", {
            theme: "light",
            cssVarsPerTheme: {
                light: {
                  '--cal-brand': '#5F4DEE',
                },
            },
            hideEventTypeDetails: false,
            layout: "monthly_view",
          });
        } catch (error) {
          console.error("Error loading Cal.com API:", error);
        }
      })();
    }, []);
    return (
      <button
        id="cta"
        data-cal-namespace=""
        data-cal-link="saurav-kc-flow-fusion/automation-consultation"
        data-cal-config='{"layout":"week_view"}'
      >
        Book A Call
      </button>
    );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const checkBoxRef = useRef(null);
  const navRef = useRef(null);

  // console.log("Nav user: ", user);

  const handleLinkClick = () => {
    if(checkBoxRef.current){
      checkBoxRef.current.checked = false;
    }
  }

  const handleScroll = () => {
    if (navRef.current) {
      if (window.scrollY > 0) {
        navRef.current.classList.add('sticky');
      } else {
        navRef.current.classList.remove('sticky');
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="nav-bar" ref={navRef}>
      <div className="nav_container">
        <input type="checkbox" id="drop-down-cbox" ref={checkBoxRef}/>
        <label htmlFor="drop-down-cbox">
            <span></span>
            <span></span>
            <span></span>
        </label>

        <Link href="/">
          <Image src="/images/Logo.png" alt="Flow Fusion AI Logo" className='site-logo' width={25} height={25} />
        </Link>

        <ul className="main-nav small-caps">
          <li><a href="#hero" onClick={handleLinkClick}>Home</a></li>
          <li><Link href="/blogs">Blogs</Link></li>
          <li><Link href="/resources" onClick={handleLinkClick}>Resources</Link></li>
          {user ? (
            <li>
              <a className='nav-logout' onClick={logout}>Logout</a>
            </li>
          ): (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          <li>
            <NavButton />
          </li>
        </ul>
      </div>
    </nav>
  )
}
  

export default dynamic(() => Promise.resolve(Navbar), {ssr: false});