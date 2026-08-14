import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
    document.title = "Chandra Mouli Patle | Contact";

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setForm({ name: '', email: '', message: '' });
        }, 2000);
    };

    return (
        <div className='w-full bg-[#1f1e24] flex flex-col overflow-auto justify-between'>
            {/* Header */}
            <div className='px-[3%] w-full flex items-center mb-8 pt-4'>
                <i
                    onClick={() => navigate(-1)}
                    className="ri-arrow-left-line text-3xl hover:text-[#6556CD] text-zinc-400 cursor-pointer transition-colors duration-300 mr-3"
                ></i>
                <span className="text-2xl font-semibold bg-gradient-to-r from-[#6556CD] to-[#8b5cf6] bg-clip-text text-transparent">
                    Contact Us
                </span>
            </div>

            <div className='px-[3%] pb-4 max-w-4xl mx-auto'>
                {/* Hero */}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold text-white mb-4'>💬 Let's Connect</h1>
                    <p className='text-zinc-400 text-lg'>Got questions? Ideas? Just want to say hi?</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Contact Form */}
                    <div className='bg-[#2a2830] rounded-lg p-6 border border-[#3a3843]'>
                        <h2 className='text-xl font-bold text-white mb-6 flex items-center'>
                            <i className="ri-mail-send-line text-[#6556CD] mr-3"></i>
                            Drop a Message
                        </h2>

                        {sent ? (
                            <div className='text-center py-12'>
                                <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <i className="ri-check-double-line text-2xl text-white"></i>
                                </div>
                                <h3 className='text-xl text-white mb-2'>Message Sent! 🎉</h3>
                                <p className='text-zinc-400'>We'll get back to you soon</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className='w-full px-4 py-3 bg-[#1f1e24] border border-[#3a3843] rounded-lg text-white focus:border-[#6556CD] focus:outline-none transition-colors'
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className='w-full px-4 py-3 bg-[#1f1e24] border border-[#3a3843] rounded-lg text-white focus:border-[#6556CD] focus:outline-none transition-colors'
                                    required
                                />
                                <textarea
                                    placeholder="Your message..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={4}
                                    className='w-full px-4 py-3 bg-[#1f1e24] border border-[#3a3843] rounded-lg text-white focus:border-[#6556CD] focus:outline-none transition-colors resize-none'
                                    required
                                />
                                <button
                                    type="submit"
                                    className='w-full bg-gradient-to-r from-[#6556CD] to-[#8b5cf6] text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center'
                                >
                                    <i className="ri-rocket-line mr-2"></i>
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info & Quick Links */}
                    <div className='space-y-6'>
                        {/* Contact Cards */}
                        <div className='space-y-4'>
                            {[
                                { icon: "ri-mail-line", title: "Email", value: "chandramoulipatle@example.com", color: "text-blue-400" },
                                { icon: "ri-phone-line", title: "Phone", value: "+91 9098234294", color: "text-green-400" },
                                { icon: "ri-map-pin-line", title: "Location", value: "India", color: "text-red-400" }
                            ].map((contact, i) => (
                                <div
                                    key={i}
                                    className='bg-[#2a2830] rounded-lg p-4 border border-[#3a3843] hover:border-[#6556CD] transition-all duration-300'
                                >
                                    <div className='flex items-center'>
                                        <i className={`${contact.icon} text-xl ${contact.color} mr-4`}></i>
                                        <div>
                                            <h4 className='text-white font-medium'>{contact.title}</h4>
                                            <p className='text-zinc-400 text-sm'>{contact.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className='bg-[#2a2830] rounded-lg p-6 border border-[#3a3843]'>
                            <h3 className='text-white font-semibold mb-4 flex items-center'>
                                <i className="ri-share-line text-[#6556CD] mr-2"></i>
                                Follow Us
                            </h3>
                            <div className='flex space-x-3'>
                                {[
                                    { icon: "ri-github-line", color: "hover:bg-gray-600", link: "#" },
                                    { icon: "ri-linkedin-line", color: "hover:bg-blue-600", link: "#" },
                                    { icon: "ri-twitter-line", color: "hover:bg-sky-500", link: "#" },
                                    { icon: "ri-instagram-line", color: "hover:bg-pink-500", link: "#" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 bg-[#1f1e24] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${social.color} hover:scale-110`}
                                    >
                                        <i className={`${social.icon} text-white`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick FAQ */}
                        <div className='bg-gradient-to-r from-[#6556CD]/20 to-[#8b5cf6]/20 rounded-lg p-6 border border-[#6556CD]/30'>
                            <h3 className='text-white font-semibold mb-3 flex items-center'>
                                <i className="ri-question-answer-line text-[#6556CD] mr-2"></i>
                                Quick FAQ
                            </h3>
                            <div className='space-y-2 text-sm'>
                                <p className='text-zinc-300'><span className='text-[#6556CD]'>Q:</span> Is CineVerse free?</p>
                                <p className='text-zinc-400 mb-3'><span className='text-green-400'>A:</span> Yes, completely free! 🎉</p>
                                <p className='text-zinc-300'><span className='text-[#6556CD]'>Q:</span> How often is data updated?</p>
                                <p className='text-zinc-400'><span className='text-green-400'>A:</span> Real-time via TMDb API ⚡</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
