import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedLoading = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage((prevStage) => (prevStage < 5 ? prevStage + 1 : 0));
    }, 3000);

    return () => clearTimeout(timer);
  }, [stage]);

  const skyColor = stage >= 2 ? "#87CEEB" : "#4A4A4A";
  const groundColor = stage >= 2 ? "#8B4513" : "#1A1A1A";

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <svg viewBox="0 0 1000 600" className="w-full h-auto shadow-lg rounded-lg">
          {/* Sky and Ground */}
          <motion.rect
            width="1000"
            height="400"
            fill={skyColor}
            animate={{ fill: skyColor }}
            transition={{ duration: 1 }}
          />
          <motion.rect
            y="400"
            width="1000"
            height="200"
            fill={groundColor}
            animate={{ fill: groundColor }}
            transition={{ duration: 1 }}
          />

          {/* Sun/Moon */}
          <motion.circle
            cx="900"
            cy="100"
            r="50"
            fill={stage >= 2 ? "#FFD700" : "#FFFFFF"}
            animate={{
              fill: stage >= 2 ? "#FFD700" : "#FFFFFF",
              cx: stage >= 2 ? 900 : 100,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Chaotic construction site */}
          <AnimatePresence>
            {stage < 2 && (
              <motion.g
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <rect x="200" y="300" width="600" height="200" fill="#808080" />
                <polygon points="200,300 500,100 800,300" fill="#A9A9A9" />
                <motion.g animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <rect x="300" y="450" width="50" height="50" fill="#8B4513" />
                </motion.g>
                <motion.g animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 4 }}>
                  <rect x="600" y="400" width="40" height="40" fill="#D2691E" />
                </motion.g>
                <motion.circle cx="400" cy="500" r="30" fill="#C0C0C0" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Vyvsai AI Entry */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.7, type: "spring" }}
              >
                <circle cx="500" cy="300" r="100" fill="#FF0000" />
                <text
                  x="500"
                  y="320"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="40"
                  fontWeight="bold"
                >
                  Vyvsai
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* AI Transformation Wave */}
          <AnimatePresence>
            {stage === 2 && (
              <motion.path
                d="M0 300 Q 250 100 500 300 T 1000 300"
                stroke="#4169E1"
                strokeWidth="10"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {/* Organized construction site */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <rect x="200" y="300" width="600" height="200" fill="#4CAF50" />
                <polygon points="200,300 500,100 800,300" fill="#2E7D32" />

                {/* AI-powered crane */}
                <motion.g
                  animate={{ rotate: [0, 45, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originX: "0.5", originY: "1" }}
                >
                  <rect x="475" y="150" width="10" height="150" fill="#FFD700" />
                  <rect x="430" y="140" width="100" height="10" fill="#FFD700" />
                </motion.g>

                {/* Worker with AR glasses */}
                <motion.g animate={{ x: [0, 50, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <circle cx="300" cy="450" r="20" fill="#2196F3" />
                  <rect x="290" y="420" width="20" height="30" fill="#2196F3" />
                  <rect x="280" y="435" width="40" height="15" fill="#00BFFF" />
                </motion.g>

                {/* 3D Holographic display */}
                <motion.g
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M350 380 L400 350 L450 380 L400 410 Z"
                    fill="#4169E1"
                    opacity="0.5"
                  />
                  <path d="M400 350 L400 300" stroke="#4169E1" strokeWidth="2" />
                  <path d="M400 410 L400 460" stroke="#4169E1" strokeWidth="2" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* AI Features Showcase */}
          <AnimatePresence>
            {stage === 4 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Tender Notification */}
                <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <rect
                    x="100"
                    y="50"
                    width="150"
                    height="80"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#000000"
                  />
                  <text
                    x="175"
                    y="90"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    New Tender Alert!
                  </text>
                  <text x="175" y="110" textAnchor="middle" fontSize="12">
                    Highway Project
                  </text>
                </motion.g>

                {/* Bid Prediction */}
                <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <rect
                    x="700"
                    y="50"
                    width="200"
                    height="100"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#000000"
                  />
                  <text
                    x="800"
                    y="80"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Bid Prediction
                  </text>
                  <text
                    x="800"
                    y="110"
                    textAnchor="middle"
                    fontSize="20"
                    fill="#4CAF50"
                  >
                    $10.5M
                  </text>
                </motion.g>

                {/* Marketplace Integration */}
                <motion.g animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <rect
                    x="100"
                    y="500"
                    width="180"
                    height="80"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#000000"
                  />
                  <text
                    x="190"
                    y="535"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Marketplace
                  </text>
                  <text x="190" y="555" textAnchor="middle" fontSize="12">
                    15 New Suppliers
                  </text>
                </motion.g>

                {/* Fintech Solution */}
                <motion.g animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <rect
                    x="700"
                    y="500"
                    width="200"
                    height="80"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#000000"
                  />
                  <text
                    x="800"
                    y="535"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Instant Payments
                  </text>
                  <text x="800" y="555" textAnchor="middle" fontSize="12">
                    Secure • Fast • Reliable
                  </text>
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Completed Project */}
          <AnimatePresence>
            {stage === 5 && (
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <rect x="300" y="100" width="400" height="300" fill="#3F51B5" />
                <rect x="350" y="150" width="100" height="75" fill="#BBDEFB" />
                <rect x="550" y="150" width="100" height="75" fill="#BBDEFB" />
                <rect x="350" y="250" width="100" height="75" fill="#BBDEFB" />
                <rect x="550" y="250" width="100" height="75" fill="#BBDEFB" />
                <polygon points="300,100 500,20 700,100" fill="#303F9F" />
        
                {/* Vyvsai logo and tagline */}
                <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <circle cx={500} cy="300" r="40" fill="#FF0000" />
                  <text
                    x="500"
                    y="460"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="24"
                    fontWeight="bold"
                  >
                    Vyvsai
                  </text>
                  <text
                    x="500"
                    y="490"
                    textAnchor="middle"
                    fill="#000000"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    Building the Future
                  </text>
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedLoading;