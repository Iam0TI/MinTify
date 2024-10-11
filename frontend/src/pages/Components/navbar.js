"use client";
import { useState, useRef, useCallback } from "react";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { WalletDefault } from "@coinbase/onchainkit/wallet";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const featuresRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    
  };

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close the mobile menu after clicking
  }, []);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }


  return (
    <div className="bg-[#17123d] relative " style={{ backgroundImage: "url('Desktop.png')" }}>
      {/* NavBar */}
      <div className=" px-[50px] sm:px-[100px] py-[40px] flex justify-between">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <div className="hidden sm:text-[#b2b0c6] sm:flex justify-center cursor-pointer gap-5">
          <Link href="/">
            <h1 onClick={() => handleNavClick('home')}>Home</h1>
          </Link>
          <Link href="/Dashboard">
            <h1>Dashboard</h1>
          </Link>
          
            
            <h1 onClick={() => handleNavClick('features')}>Features</h1> 
            
        </div>
        <motion.div whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }} className="hidden sm:grid">
          <WalletDefault />
        </motion.div>
        <div className="md:hidden mb-4 ">
          <button className="text-dark" onClick={toggleMenu}>
            {isOpen ? (
              <motion.nav animate={isOpen ? "open" : "closed"}
              variants={variants }>
                <div className="justify-left">
                  <Cross2Icon />
                </div>
                <div
                  className="fixed z-20 top-0 relative bg-blend-multiply bg-la
                   right-0 bottom-0 left-0 flex flex-col
                   items-center gap-6 justify-center"
                >
                  <h3 className="text-white text-sm font-normal leading-none">
                    <Link href="/">Home</Link>
                  </h3>
                  <h3 className="text-white text-sm font-normal leading-none">
                    <Link href="/Dashboard">
                      <button>Dashboard</button>
                    </Link>
                  </h3>
                  <h3 className="text-white text-sm font-normal leading-none">
                    <button onClick={() => handleNavClick('features')}>Features</button>
                  </h3>
                  <motion.div whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }} className="flex">
                    <WalletDefault />
                  </motion.div>
                </div>
              </motion.nav>
            ) : (
              <HamburgerMenuIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}