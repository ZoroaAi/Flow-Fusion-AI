import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import '../styles/features.scss';
import Image from 'next/image';

const features = [
    {
        heading: 'Chatbot Development',
        description: 'Empower your customer service with our AI-driven chatbots, designed to provide instant support and enhance user engagement. Our chatbots are equipped with advanced natural language processing capabilities, ensuring a human-like conversational experience. Benefit from reduced response times, 24/7 availability, and improved satisfaction rates.',
        list: [],
        img: "/images/chatbot.png"
    },
    {
        heading: 'Bespoke Automation',
        description: "Unlock operational excellence with our tailor-made automation solutions. Each system is crafted to align with your business's unique needs, driving efficiency and scalability. Experience a significant reduction in manual workload, enjoy streamlined processes, and watch your productivity soar.",
        list: [
            "Create scalable business systems",
            "Decrease up to 50%-80% work time!"
        ],
        img: "/images/description-1.png"
    },
    {
        heading: 'Ai & Automation Consultation',
        description: 'Navigate the complexities of AI and automation with our expert consultancy. We provide actionable plans tailored to your business, ensuring you leverage cutting-edge technology to stay ahead of the curve, optimize operations, and harness the full potential of digital transformation.',
        list: [],
        img: "/images/description-3.png"
    }
]

const FeaturesCard = ({features}) => {
    return (
        <motion.div className='features_card'>
            <Image src={features.img} width={300} height={300} alt="Feature" />
            <div className="features_txt">
                <h2>{features.heading}</h2>
                <p>{features.description}</p>
                <ul>
                    {features.list.map((items, index) => (
                        <li key={index}>{items}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(features[0].heading);

    const handleClick = (heading) => {
        setActiveFeature(heading);
    }
    return (
        <section className="features">
            <div className="features_wrapper">
                <div className="feature_heading">
                    <p className='feature_title'>Feature</p>
                    <h2>Business Automation</h2>
                    <p className="feature_subHeading">
                        Take your business strategy to the next level and automate your operations to save time and money.
                    </p>
                </div>
                <ul className="service_selector">
                    {features.map((features, index) => (
                        <li key={index} className={`s${index + 1}`}>
                            <button 
                                onClick={() => handleClick(features.heading)}
                                className= {activeFeature === features.heading ? 'active': ''}
                            >
                                {features.heading}
                            </button>
                        </li>
                    ))}
                </ul>
                <AnimatePresence>
                    {features
                        .filter((features) => features.heading === activeFeature)
                        .map((features, index) => (
                            <FeaturesCard key={index} features={features} />
                        ))}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Features;