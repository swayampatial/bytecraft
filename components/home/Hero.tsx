"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "./HeroCarousel";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import "../../app/globals.css";
const AnimatedText = ({ text }: { text: string }) => {
  return (
    <span className="inline ">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: index * 0.05 }}
          className="inline"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};
export default function Hero() {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center overflow-hidden -translate-y-10 max-w-7xl">
      <motion.div
        className="space-y-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Discover Something Different
          </motion.span>
        </div>

        <motion.h1
          className="max-w-2xl font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              staggerChildren: 0.1,
            }}
          >
            <AnimatedText text="Elevate Your Everyday" />
          </motion.span>
          <br/>
          <motion.span
            className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            
            With Thoughtful Design
          </motion.span>
        </motion.h1>

        <motion.p
          className="max-w-xl text-lg leading-8 text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          We curate beautiful, functional products that make life simpler and
          more enjoyable. From home essentials to personal accessories, each
          item is thoughtfully crafted with sustainability and style in mind.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            asChild
            size="lg"
            className="px-8 group relative overflow-hidden"
          >
            <Link href="/products" className="flex items-center">
              Shop Collection
              <motion.div
                className="ml-2"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform group-hover:duration-500"></span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group">
            <Link href="/about" className="flex items-center">
              Our Story
              <motion.div
                className="ml-1"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap gap-6 items-center pt-8 opacity-70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            As Featured In
          </span>
          <div className="flex flex-wrap gap-6">
            <span className="font-semibold">Design Week</span>
            <span className="font-semibold">Vogue</span>
            <span className="font-semibold">Apartment Therapy</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className=" max-w-8xl "
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative  w-[82%] h-[80%] mx-auto">
          <HeroCarousel />
          <motion.div
            className=" absolute hidden md:block bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          > 
            New Collection
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
