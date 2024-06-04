// import Image from 'next/image';

import Image from 'next/image';
import '../styles/about.scss';

const About = () => {
    return (
        <section id="about">
            <div className="about_txt">
                <div className="about_heading">
                    <p className='about_title'>About US</p>
                    <h2>What we do</h2>
                </div>
                <p>
                    At Flow Fusion Ai, we merge technology and business processes to deliver bespoke automation that scales with your business needs.
                </p>
            </div>
            <div id="model">
                <Image width={100} height={100} src="/images/about.jpg" alt="" className='aboutImg'/>
            </div>
        </section>
    )
}

export default About;