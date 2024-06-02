import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import '../styles/hero.scss';
import Image from "next/image";

const CalButton = () => {
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
        id="hero_cta"
        data-cal-namespace=""
        data-cal-link="saurav-kc-flow-fusion/automation-consultation"
        data-cal-config='{"layout":"week_view"}'
      >
        Book A Call
      </button>
    );
};

const Waves = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="none" viewBox="0 0 1440 560" className='hero_wave'>
            <g mask="url(&quot;#SvgjsMask1007&quot;)" fill="none">
                <path d="M 0,374 C 72,313 216,58.2 360,69 C 504,79.8 576,439.6 720,428 C 864,416.4 936,-5.2 1080,11 C 1224,27.2 1368,409.4 1440,509L1440 560L0 560z" fill="rgba(255, 255, 255, 1)"></path>
            </g>
            <defs>
                <mask id="SvgjsMask1007">
                    <rect width="1440" height="560" fill="#ffffff"></rect>
                </mask>
            </defs>
        </svg>
    );
};

const Hero = () => {
    return (
        <div className="hero_section" id='hero'>
            <div className="hero_content">
                <div className="hero_txt">
                    <h1>Transform Your Business Today with Custom Automation</h1>
                    <p>Our automated solutions are designed to streamline your workflows and elevate your operational capacity.</p>
                    <CalButton/>
                </div>
                <Image width={25} height={25} src="/images/description-1.png" alt="Hero" layout='responsive'/>
            </div>
            <Waves />
        </div>
    )
}

export default Hero;