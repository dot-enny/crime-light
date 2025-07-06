import { MapPin, Shield, Eye, Globe, Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import AnimatedToggleButton from "../components/ui/AnimatedToggleButton";

// Header Component
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <img src="./butler-logo.svg" className="size-10" />
                        <span className="text-xl font-bold text-black font-outfit">BUTLER</span>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-700 hover:text-black font-medium">
                            ABOUT
                        </a>
                        <a href="#" className="text-gray-700 hover:text-black font-medium">
                            SERVICES
                        </a>
                        <a href="#" className="text-gray-700 hover:text-black font-medium">
                            CONTACT
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <AnimatedToggleButton
                        isOpen={isMenuOpen}
                        onToggle={() => setIsMenuOpen(!isMenuOpen)}
                        OpenIcon={Menu}
                        CloseIcon={X}
                        className="md:hidden text-gray-700 hover:text-black hover:bg-gray-100 focus:ring-gray-500"
                        srText="Toggle navigation menu"
                    />
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
                    isMenuOpen 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform -translate-y-2 pointer-events-none'
                }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 font-medium rounded-md transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ABOUT
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 font-medium rounded-md transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            SERVICES
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 font-medium rounded-md transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CONTACT
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Hero Section Component
const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-fade-in-up">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight font-outfit">
                            Batman has Alfred.
                            <br />
                            <span className="text-white">Who do you have?</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed animate-fade-in delay-300 font-inter">
                            The Butler is using real-time data to protect you. He is your eyes and ears at all times.
                        </p>
                        <div className="flex items-start space-x-3 text-gray-300 animate-fade-in delay-500">
                            <MapPin className="w-5 h-5 mt-1 flex-shrink-0 animate-bounce" />
                            <div>
                                <p className="font-medium">You are at Herbert Macaulay Way.</p>
                                <p className="text-sm">Crime is relatively low, but be vigilant. Spikes tend to occur at 6PM.</p>
                            </div>
                        </div>
                        <div className="animate-fade-in delay-700">
                            <button onClick={() => navigate('auth/sign-in')} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg transform">
                                Get Started with Butler
                            </button>
                        </div>
                    </div>
                    <div className="relative z-20 hidden lg:block animate-slide-in-right">
                        <img src="./robot-butler.svg" alt="Butler AI Robot" className="-top-70 right-20 absolute z-[60] animate-float scale-100" />
                    </div>
                </div>
            </div>
        </section>
    );
};

// Who is The Butler Section Component
const WhoIsButlerSection = () => {
    return (
        <section className="bg-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 gap-4 animate-on-scroll-left">
                        {/* Dashboard mockups */}
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 h-32 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                            <Eye className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-4 h-32 flex items-center justify-center hover:scale-105 transition-transform duration-300 delay-100">
                            <div className="w-full h-full bg-black/20 rounded flex items-center justify-center">
                                <div className="grid grid-cols-4 gap-1">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className="w-2 h-2 bg-white/60 rounded-sm animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg p-4 h-32 col-span-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 delay-200">
                            <div className="flex items-center space-x-2 text-white">
                                <Shield className="w-6 h-6 animate-spin" style={{animationDuration: '3s'}} />
                                <span className="font-medium">Suspicious Activity</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 animate-on-scroll-right delay-300">
                        <h2 className="text-4xl font-bold text-gray-900 font-outfit">Who is The Butler?</h2>
                        <p className="text-gray-700 leading-relaxed font-inter">
                            The Butler is your dynamic, data-driven, pattern-recognising guardian, whose entire purpose is your
                            safety, at all times. The Butler sees, listens, and preempts long before you even need to.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-inter">
                            In conjunction with AI-transformed surveillance, trained models and refined user input, the Butler can
                            preempt, with a 92% confidence interval, the likelihood of suspicious and criminal activity in any
                            environment.
                        </p>
                        <button className="text-purple-600 hover:text-purple-700 font-medium transition-all duration-300 hover:scale-105 transform font-inter">Read More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Where is The Butler Section Component
const WhereIsButlerSection = () => {
    return (
        <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-on-scroll-right">
                        <h2 className="text-4xl font-bold font-outfit">Where is The Butler?</h2>
                        <p className="text-gray-300 leading-relaxed font-inter">
                            Everywhere. On the streets, in buildings, in vehicles and in the air. He is part of an extensive neural
                            network, deeply embedded in the
                        </p>
                        <button className="bg-white text-gray-900 px-6 py-2 rounded font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform hover:shadow-lg font-inter">
                            Read Documentation
                        </button>
                    </div>
                    <div className="relative flex justify-center animate-on-scroll-left delay-200">
                        <div className="relative">
                            <Globe className="w-64 h-64 text-cyan-400 animate-spin" style={{animationDuration: '20s'}} />
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-pulse"></div>
                            <div className="absolute inset-4 rounded-full border border-cyan-400/50 animate-ping" style={{animationDuration: '3s'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12 relative animate-on-scroll">
                    {/* Information Column */}
                    <div className="animate-on-scroll delay-100">
                        <h3 className="text-lg font-semibold mb-6 font-outfit">INFORMATION</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    ABOUT US
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    PRICING
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    BUTLER+
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    JOBS
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Diagonal separator */}
                    <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent transform rotate-12"></div>

                    {/* Legal Column */}
                    <div className="animate-on-scroll delay-200">
                        <h3 className="text-lg font-semibold mb-6 font-outfit">LEGAL</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    ABOUT US
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    PRICING
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    BUTLER+
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    JOBS
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Diagonal separator */}
                    <div className="hidden md:block absolute left-2/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent transform rotate-12"></div>

                    {/* Socials Column */}
                    <div className="animate-on-scroll delay-300">
                        <h3 className="text-lg font-semibold mb-6 font-outfit">SOCIALS</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    X
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    LINKEDIN
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    INSTAGRAM
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    YOUTUBE
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm animate-on-scroll delay-500">
                    © GSH Arcades 2025. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

// Main Landing Page Component
function LandingPage() {
    // Initialize scroll animations
    useScrollAnimation();

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <HeroSection />
            <WhoIsButlerSection />
            <WhereIsButlerSection />
            <Footer />
        </div>
    )
}

export default LandingPage
