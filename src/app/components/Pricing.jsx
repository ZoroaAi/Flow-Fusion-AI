import '@/styles/pricing.scss';

const Box = (className, title, price, feature, btnTxt) => {
    return (
        <div className={`price_box ${className}`}>
            
        </div>
    )
}

const Pricing = () => {
    return (
        <section id="pricing">
            Pricing
            <Box/>
        </section>
    )
}

export default Pricing;