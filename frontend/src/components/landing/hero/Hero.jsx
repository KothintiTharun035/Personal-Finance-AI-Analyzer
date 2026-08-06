
import { motion } from "framer-motion";
import HeroAnimation from "../HeroAnimation";


import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  BarChart3,
} from "lucide-react";


import "./Hero.css";

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
    },
  },
};

const Hero = () => {
  return (
    <section className="hero">

      {/* Background Blobs */}

      <div className="hero-blob hero-blob-one"></div>
      <div className="hero-blob hero-blob-two"></div>

      <div className="container hero-container">

        {/* LEFT */}

        <motion.div
          className="hero-content"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >

          <motion.div
            className="hero-badge"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={18} />

            <span>AI Powered Personal Finance Platform</span>
          </motion.div>

          <h1 className="hero-title">
            Plan Your money Like a 
            <br />
            <span>Ledger</span>
            <br />
            not a Guessing Money.
          </h1>

          <p className="hero-description">
            Manage budgets, analyze loans, grow investments,
            track savings goals, and receive intelligent
            AI recommendations all from one beautifully
            designed financial dashboard.
          </p>

          

          {/* Stats */}


          <div className="hero-highlights">

            <div className="highlight-item">
              <ShieldCheck size={18} />
              <span>Bank-Level Security</span>
            </div>

            <div className="highlight-item">
              <TrendingUp size={18} />
              <span>Real-Time Insights</span>
            </div>

            <div className="highlight-item">
              <BrainCircuit size={18} />
              <span>AI Financial Advisor</span>
            </div>

            <div className="highlight-item">
              <BarChart3 size={18} />
              <span>Smart Investment Analysis</span>
            </div>




          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="hero-visual"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >

          <div className="w-full h-[500px] flex items-center justify-center">
            <HeroAnimation />
          </div>


        </motion.div>

      </div>

    </section>
  );
};

export default Hero;