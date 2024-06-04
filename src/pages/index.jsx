import Head from 'next/head';
import About from '../app/components/About';
import SignUp from '../app/components/Contact';
import Features from '../app/components/Features';
import Hero from '../app/components/Hero';
import Services from '../app/components/Services';

import '../app/styles/global.scss';

function Home(){
    return (
        <>
            <Head>
                <title>Flow Fusion AI</title>
                <meta name="description" content="Transform Your Business Today with Custom Automation
                Our automated solutions are designed to streamline your workflows and elevate your operational capacity." />
            </Head>
            <Hero/>
            <About/>
            <Services/>
            <Features/>
            <SignUp/>
        </>
    )
}

export default Home;