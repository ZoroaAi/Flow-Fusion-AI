import { motion, useAnimation } from "framer-motion";
import './loader.scss';
import { useEffect } from "react";

const Loader = () => {
    const circleControls1 = useAnimation();
    const circleControls2 = useAnimation();
    const circleControls3 = useAnimation();
  
    const animationSettings = {
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0.5
      }
    };
  
    useEffect(() => {
        circleControls1.start(animationSettings);
        circleControls2.start({
        ...animationSettings,
        transition: { ...animationSettings.transition, delay: 0.005 }
        });
        circleControls3.start({
        ...animationSettings,
        transition: { ...animationSettings.transition, delay: 0.01 }
        });
    });

    return (
        <div style={{ display: "flex", justifyContent: "space-between", width: "50px" }}>
            <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={circleControls1}
                style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "#efeef0",
                }}
            />
            <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={circleControls2}
                style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "#efeef0",
                }}
            />
            <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={circleControls3}
                style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "#efeef0",
                }}
            />
        </div>

    )
}

export default Loader;