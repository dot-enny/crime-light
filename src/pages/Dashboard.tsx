import { analysis, bg_dot, camera, fraud, globe, location, man } from "../assets";
import React from "react";
import { motion } from "framer-motion";

export const Dashboard = () => {
  function InViewAnimate({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <div className="h-fit bg-black text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="overflow-hidden bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${bg_dot})`,
          backgroundSize: "80%",
        }}
      >
        <div className="mx-auto px-8 grid lg:grid-cols-6 gap-16 items-center z-10">
          {/* Left Content */}
          <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
        className="space-y-8 max-w-lg col-span-3 mt-16 mb-[120px]"
          >
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
          Batman has Alfred.
          <br />
          <span className="">Who do you have?</span>
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          The Butler is using real-time data to protect you. He is your eyes
          and ears at all times.
        </p>

        {/* Status indicators */}
        <div className="flex items-center">
          <img src={location} alt="location" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-300">
            You are at Excellent Secondary Way
          </span>
            </div>
            <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-300">
            Crime is relatively low, but the square band in focus at
            APM.
          </span>
            </div>
          </div>
        </div>

        <button
          className="px-8 py-4 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "#8A39E1" }}
        >
          Get Started with Butler
        </button>
          </motion.div>

          {/* Right - Cyborg Figure */}
          <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
        className="hidden absolute left-0 -top-[1px] right-40 z-0 lg:flex items-center-safe justify-end lg:justify-end col-span-2"
          >
        <img src={man} className="h-[600px]" alt="man" />
          </motion.div>
        </div>
        {/* Responsive full background for max-md */}
        <div
          className="md:hidden absolute inset-0 z-0"
          style={{
        backgroundImage: `url(${bg_dot})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        pointerEvents: "none",
          }}
        ></div>
      </section>

      {/* Who is The Butler Section */}
      <section className="py-20 z-50 border bg-gray-50 text-black overflow-hidden">
        <div className=" mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Icons/Visual elements */}
            <div className="grid grid-cols-2 divide-x-2 divide-[#8A39E1]">
              <InViewAnimate delay={0.1}>
                <div className="cols-span-1 flex flex-col gap-4 justify-end">
                  <InViewAnimate delay={0.2}>
                    <div className="flex items-center">
                      <div className="flex">
                        <img
                          src={camera}
                          alt="camera"
                          className="transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <span className="w-6 h-0 bg-[#8A39E1] border border-[#8A39E1]"></span>
                    </div>
                  </InViewAnimate>
                  <InViewAnimate delay={0.3}>
                    <div className="flex items-center">
                      <div className="flex">
                        <img
                          src={fraud}
                          alt="fraud"
                          className="transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <span className="w-6 h-0 bg-[#8A39E1] border border-[#8A39E1]"></span>
                    </div>
                  </InViewAnimate>
                </div>
              </InViewAnimate>
              <div className="col-span-1 flex justify-start items-center">
                <InViewAnimate delay={0.5}>
                  <div className="flex justify-start items-center">
                    <span className="w-6 h-0 bg-[#8A39E1] border border-[#8A39E1]"></span>
                    <div className="flex space-x-4">
                      <img
                        src={analysis}
                        alt="analysis"
                        className="transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </div>
                </InViewAnimate>
              </div>
            </div>

            <InViewAnimate delay={0.7}>
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  Who Is The Butler?
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    The Butler is your dynamic, state-of-the-art platform
                    recognizing situations, whose entire purpose is
                    surveillance. He is your digital guardian, observing and
                    analyzing the present, a post-citizen, at all times. The
                    Butler sees, listens, and processes long before you even
                    notice it.
                  </p>
                  <p>
                    In cooperation with AI transformations, surveillance trained
                    methods and artificial case input, the Butler can download
                    with a 99% confidence interval, the likelihood of suspicious
                    and criminal activity in any environment.
                  </p>
                </div>
              </div>
            </InViewAnimate>
          </div>
        </div>
      </section>

      {/* Where is The Butler Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #8A39E1 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className=" mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <InViewAnimate delay={0.1}>
              <div className="space-y-8">
                <InViewAnimate delay={0.2}>
                  <h2 className="text-4xl lg:text-5xl font-bold">
                    Where is The Butler?
                  </h2>
                </InViewAnimate>
                <InViewAnimate delay={0.3}>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    Everywhere. On the streets, in business districts it's in
                    the air. He is part of an advanced neural network, deeply
                    embedded in the digital infrastructure.
                  </p>
                </InViewAnimate>
                <InViewAnimate delay={0.4}>
                  <button className="border-2 border-[#8A39E1] text-[#8A39E1] px-8 py-3 rounded-lg hover:bg-[#8A39E1] hover:text-black transition-all font-semibold">
                    Explore Global Presence
                  </button>
                </InViewAnimate>
              </div>
            </InViewAnimate>

            <InViewAnimate delay={0.2}>
              <div className="flex justify-center">
                <div className="relative">
                  {/* Outer ring */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="w-80 h-80 border-2 border-[#8A39E1] rounded-full flex items-center justify-center relative"
                  >
                    {/* Middle ring */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="w-60 h-60 border border-[#8A39E1]/60 rounded-full flex items-center justify-center relative"
                    >
                          <img src={globe} alt="globe" />
                          {/* <Globe className="w-12 h-12 text-white" /> */}
                    </motion.div>

                    {/* Pulsing animation rings */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.2 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="absolute inset-0 border-2 border-[#8A39E1] rounded-full animate-ping"
                    ></motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.3 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute inset-4 border border-[#8A39E1] rounded-full animate-pulse"
                    ></motion.div>

                    {/* Orbital dots */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-3 h-3 bg-[#8A39E1] rounded-full animate-bounce"
                    ></motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-[#8A39E1] rounded-full animate-pulse"
                    ></motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#8A39E1] rounded-full animate-ping"
                    ></motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-[#8A39E1] rounded-full animate-bounce"
                    ></motion.div>
                  </motion.div>
                </div>
              </div>
            </InViewAnimate>
          </div>
        </div>
      </section>
    </div>
  );
};
