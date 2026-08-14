import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    document.title = "Chandra Mouli Patle | About";

    return (
        <div className='w-full min-h-screen bg-gradient-to-br overflow-auto from-[#1f1e24] via-[#252229] to-[#1f1e24]'>
            {/* Header */}
            <div className='px-[3%] w-full flex items-center mb-8 pt-4'>
                <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-3xl hover:text-[#6556CD] text-zinc-400 cursor-pointer transition-colors duration-300 mr-3"></i>
                <span className="text-2xl font-semibold bg-gradient-to-r from-[#6556CD] to-[#8b5cf6] bg-clip-text text-transparent">About CineVerse</span>
            </div>

            <div className='px-[3%] pb-8 max-w-4xl mx-auto'>
                {/* Hero */}
                <div className='text-center mb-12'>
                    <div className='w-16 h-16 bg-gradient-to-r from-[#6556CD] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-6'>
                        <i className="ri-movie-2-line text-2xl text-white"></i>
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-4'>🎬 Welcome to CineVerse</h1>
                    <p className='text-zinc-400 text-lg'>Your gateway to movies, shows & celebrity universe</p>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-4 gap-4 mb-12'>
                    {[
                        { number: "50K+", label: "Movies" },
                        { number: "20K+", label: "Shows" },
                        { number: "100K+", label: "Celebs" },
                        { number: "∞", label: "Entertainment" }
                    ].map((stat, i) => (
                        <div key={i} className='bg-[#2a2830] rounded-lg p-4 text-center border border-[#3a3843] hover:border-[#6556CD] transition-all duration-300 hover:scale-105'>
                            <div className='text-2xl font-bold bg-gradient-to-r from-[#6556CD] to-[#8b5cf6] bg-clip-text text-transparent'>{stat.number}</div>
                            <div className='text-zinc-400 text-sm'>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
                    {[
                        { icon: "ri-search-eye-line", title: "Discover", desc: "Find your next favorite movie or show instantly" },
                        { icon: "ri-star-smile-line", title: "Explore", desc: "Dive deep into celebrity profiles & filmography" },
                        { icon: "ri-heart-3-line", title: "Enjoy", desc: "Beautiful interface designed for movie lovers" }
                    ].map((feature, i) => (
                        <div key={i} className='bg-[#2a2830] rounded-lg p-6 border border-[#3a3843] hover:border-[#6556CD] transition-all duration-300 hover:scale-105 text-center'>
                            <div className='w-12 h-12 bg-gradient-to-r from-[#6556CD] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-4'>
                                <i className={`${feature.icon} text-xl text-white`}></i>
                            </div>
                            <h3 className='text-lg font-semibold text-white mb-2'>{feature.title}</h3>
                            <p className='text-zinc-400 text-sm'>{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Mission */}
                <div className='bg-gradient-to-r from-[#6556CD]/20 to-[#8b5cf6]/20 rounded-lg p-8 border border-[#6556CD]/30 text-center'>
                    <h2 className='text-2xl font-bold text-white mb-4'>✨ Our Mission</h2>
                    <p className='text-zinc-300 text-lg leading-relaxed mb-6'>
                        Making movie discovery magical through intuitive design, 
                        real-time data, and a passion for cinema.
                    </p>
                    <div className='flex justify-center gap-3'>
                        {['React', 'TMDb API', 'Tailwind'].map((tech, i) => (
                            <span key={i} className='px-3 py-1 bg-[#6556CD] text-white rounded-full text-sm'>{tech}</span>
                        ))}
                    </div>
                    <p className='text-zinc-400 mt-6'>Made with 💜 by ChandraMouli Patle</p>
                </div>
            </div>
        </div>
    );
};

export default About;
