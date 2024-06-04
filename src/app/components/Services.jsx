import { motion } from 'framer-motion';

import '../styles/services.scss';
import Image from 'next/image';

const services = [
    {
        title: 'Chatbot Development',
        img: "/images/chatbot.png",
        desc: 'AI-enhanced agents boost productivity by handling tasks like customer support, improving efficiency, reducing errors, and offering data-driven insights for a more autonomous and successful business future.'
    },
    {
        title: 'Bespoke Business Automation',
        img: "/images/description-2.png",
        desc: 'Unlock seamless operations with custom automation tailored to your specific business processes, all designed with powerful no-code platforms.'
    },
    {
        title: 'AI & Automation Consultation',
        img: "/images/description-3.png",
        desc: 'We offer specialized guidance to integrate AI and automation effectively into your business, enhancing efficiency and decision-making for a competitive edge in the digital world.'
    }
];

const ServiceCard = ({title, img, desc}) => {
    return (
        <motion.div 
            className="service_card"
            whileHover={{
                scale: 1.05,
            }}
        >
            <Image src={img} width={300} height={200} alt={title}/>
            <h3 className='service_heading'>{title}</h3>
            <span className='breakLine'></span>
            <p className='service_desc'>{desc}</p>
        </motion.div>
    )
}

const Services = () => {
    return (
        <section id="services">
            <div className='services_heading'>
                <p className="service_title">Services</p>
                <h2>Business Automation for Future-Ready Businesses</h2>
            </div>
            <div className="cards">
                {services.map((services, index) => (
                    <ServiceCard 
                        key={index}
                        title={services.title}
                        img={services.img}
                        desc={services.desc}
                    />
                ))}
            </div>

        </section>
    )
}

export default Services;