"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";

gsap.registerPlugin(ScrollToPlugin);

const cards = [
  { _id: 0, title: "Goku vs Vegeta", description: "Description 3", image: "assets/images/3.png" },
  { _id: 1, title: "Goku", subtitle:"Ultra Instinct", description: "Description 2", image: "assets/images/1.png" },
  { _id: 2, title: "Goku", description: "Description 1", image: "assets/images/2.png" },

];

const CardsPlayer = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<any>(null);
  const observerRef = useRef<any>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { root: null, rootMargin: '0px', threshold: 0.5 });
    if (containerRef.current) observerRef.current.observe(containerRef.current);
    return () => { if (containerRef.current) observerRef.current.unobserve(containerRef.current); };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress >= 100 ? (handleDotClick((selectedCard + 1) % cards.length), 0) : prevProgress + 100 / 30);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [selectedCard, isPlaying]);

  const handleDotClick = (index: number) => {
    setSelectedCard(index);
    const container = containerRef.current;
    const card = container.children[index];
    gsap.to(container, { duration: 0.5, scrollLeft: card.offsetLeft - card.offsetWidth / 4 });
  };

  const handlePlayPauseClick = () => setIsPlaying(!isPlaying);

  return (
    <div className='relative w-full bg-[#101010]'>
      <div ref={containerRef} className='relative flex flex-row gap-48 w-full h-fit  px-96 py-48 overflow-x-hidden'>
        {cards.map((card, idx) => (
          <div key={idx} className='relative shadow-md min-w-[60vw] max-h-[60vh] overflow-hidden w-full h-full bg-black rounded-lg flex flex-col justify-start items-start'>
            {card.title && <h3 className='absolute top-2 left-2 text-white font-bold text-4xl m-2'>{card.title}</h3>}
            {card.subtitle && <p className='absolute top-12 left-2 text-white font-bold text-4xl m-2'>{card.subtitle}</p>}
            <img src={card.image} alt={card.title} className='object-cover w-full h-auto' />
          </div>
        ))}
      </div>
      <div className={`sticky flex items-center transition-all duration-300 justify-center mb-8 bottom-8 left-1/2 -translate-x-1/2 ${isVisible ? 'w-fit gap-4 py-4 px-8' : 'w-0 p-0 gap-0'} h-16 bg-[rgba(42,42,42,0.25)] backdrop-blur-[20px] rounded-full  shadow-md`}>
        {cards.map((card, idx) => (
          <div key={idx} className={`h-4 transition-all duration-500  relative bg-[#383838] ${selectedCard === idx ? 'w-12' : 'w-4'} rounded-full overflow-hidden`} onClick={() => handleDotClick(idx)}>
            {selectedCard === idx && <div className={`absolute left-0 top-0 h-full ${isPlaying && "bg-[#242424]"} rounded-full`} style={{ width: `${progress}%` }}></div>}
          </div>
        ))}
        {isVisible && <button className='p-2 rounded-full' onClick={handlePlayPauseClick}>{isPlaying ? <PauseIcon className="w-4 h-4 rounded-full text-[#333333]" /> : <PlayIcon className="w-4 h-4 rounded-full text-[#333333]" />}</button>}
      </div>
    </div>
  );
};

export default CardsPlayer;