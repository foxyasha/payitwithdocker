import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import React, {useCallback} from "react";

function Particle() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);


    return(
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={
            {
                fpsLimit: 80,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "repulse",
                        },
                        onHover: {
                            enable: true,
                            mode: "bounce",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.9,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ff0000",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1000,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.1,
                    },
                    shape: {
                        type: "triangle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }
        }

        />

    )
}

export default Particle