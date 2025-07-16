'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: '',
    email: '',
    message: ''
  })

  // Carousel data
  const carouselSlides = [
    {
      image: "https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799e6322f200317e0d0049d_ef6ca65b3f382cb36570a090b50138b2_Home-banner-slider-01.jpg",
      title: "Enabling Digital Transformation",
      subtitle: "Optimize efficiency with a seamlessly connected DDM, ERP, and MES ecosystem."
    },
    {
      image: "https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67ac811ee5344ec1b4ba4048_shutterstock_82016689-min.avif",
      title: "CableERP",
      subtitle: "Manage everything from resource planning to final delivery with wire & cable specific precision, ensuring smooth, efficient operations."
    },
    {
      image: "https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67ac8506b31129e0c845c27a_shutterstock_2034291065-min.avif",
      title: "cableCORE MES",
      subtitle: "Gain real-time shop floor visibility, optimize production, and scale effortlessly from basic tracking to full IoT integration."
    },
    {
      image: "https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67ac83bc59e1c12af5406eda_shutterstock_2424120171-min.avif",
      title: "cableCORE DDM",
      subtitle: "Speed up inquiry-to-quote, automate design with AI, and reduce rework for a seamless transition from cable design to engineering."
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thanks for submitting your request. We will respond to your request as soon as possible.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>InnoVites - Wire Your Cable Business for Growth</title>
        <meta name="description" content="Leading Strategic Partner for Digital Transformation in The Wire & Cable Industry. Bridging the wire and cable ecosystem with ERP, MES & Design and Data Management (DDM)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white font-segoe">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image 
                    src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64e33830d71082aaff887206_innovites-logo.svg" 
                    alt="InnoVites Logo" 
                    width={120} 
                    height={32} 
                    className="h-8"
                  />
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <div className="relative group">
                  <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium">
                    Products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <a href="#services" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">Services</a>
                <div className="relative group">
                  <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium">
                    Resources
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="relative group">
                  <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium">
                    Company
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <a href="#about" className="text-gray-800 hover:text-gray-900 transition-colors font-medium">About</a>
              </nav>

              <div className="flex items-center space-x-4">
                <button className="hidden md:block bg-orange-400 text-black px-6 py-2 font-semibold hover:bg-orange-500 transition-colors">
                  Contact Us
                </button>
                
                {/* Mobile menu button */}
                <button 
                  className="md:hidden relative w-8 h-8 flex items-center justify-center"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="w-6 h-6 relative flex items-center justify-center">
                    <span className={`absolute h-0.5 w-5 bg-gray-900 transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                    }`}></span>
                    <span className={`absolute h-0.5 w-5 bg-gray-900 transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}></span>
                    <span className={`absolute h-0.5 w-5 bg-gray-900 transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                    }`}></span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden pb-4 border-t border-gray-200 mt-4 pt-4">
                <div className="flex flex-col space-y-3">
                  <a href="#home" className="text-gray-800 hover:text-gray-900 transition-colors py-2 px-2 rounded-md hover:bg-gray-50">Products</a>
                  <a href="#services" className="text-gray-800 hover:text-gray-900 transition-colors py-2 px-2 rounded-md hover:bg-gray-50">Services</a>
                  <a href="#resources" className="text-gray-800 hover:text-gray-900 transition-colors py-2 px-2 rounded-md hover:bg-gray-50">Resources</a>
                  <a href="#company" className="text-gray-800 hover:text-gray-900 transition-colors py-2 px-2 rounded-md hover:bg-gray-50">Company</a>
                  <a href="#about" className="text-gray-800 hover:text-gray-900 transition-colors py-2 px-2 rounded-md hover:bg-gray-50">About Us</a>
                  <button className="bg-orange-400 text-black px-6 py-3 font-semibold hover:bg-orange-500 transition-colors rounded-md mt-2 text-center">
                    Contact Us
                  </button>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="relative bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-left order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight text-gray-900">
                  Powering the Wire & Cable Industry with{' '}
                  <span className="text-orange-400">Innovation</span>
                </h1>
                <div className="mb-6 lg:mb-8">
                  <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Powered By:</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Image 
                        src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799b817a6fea779efcdcc5d_b5933cfbd5957e2c3a9f52c876fda519_Home-banner-logo-01.png" 
                        alt="Microsoft" 
                        width={100} 
                        height={32} 
                        className="h-6 sm:h-8 w-auto"
                      />
                    </div>
                    <div className="text-gray-400 hidden sm:block">|</div>
                    <div className="flex items-center gap-2">
                      <Image 
                        src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799b8176dbb9249900c1135_Home-banner-logo-02.png" 
                        alt="Siemens" 
                        width={100} 
                        height={32} 
                        className="h-6 sm:h-8 w-auto"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-8">
                  <button className="bg-orange-400 text-black px-6 sm:px-8 py-3 font-semibold hover:bg-orange-500 transition-colors text-sm sm:text-base rounded-md sm:rounded-none">
                    Customized Product Walkthrough
                  </button>
                  <button className="bg-gray-500 text-white px-6 sm:px-8 py-3 font-semibold hover:bg-gray-600 transition-colors text-sm sm:text-base rounded-md sm:rounded-none">
                    Explore our Solutions →
                  </button>
                </div>
              </div>
              
              {/* Carousel */}
              <div className="relative order-1 lg:order-2">
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {carouselSlides.map((slide, index) => (
                      <div key={index} className="min-w-full h-full relative">
                        <Image 
                          src={slide.image} 
                          alt={slide.title} 
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
                        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6 text-white">
                          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">
                            <span className="italic">{slide.title}</span>
                          </p>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Dots Navigation */}
                <div className="flex justify-center mt-4 space-x-2">
                  {carouselSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-orange-400' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Companies Section */}
        <section id="trust" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Empowering Innovation & Digital Transformation in Cable and Wire Industry
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-orange-400 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center opacity-80">
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84d418f261b0f40fee869_client-logo-1.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84d4ddb67a15863a4290c_client-logo-2.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84d5ad1ae30d796e40518_client-logo-3.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84d65e61b07607d38d60b_client-logo-4.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84d7352213bc21fa712d8_client-logo-5.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84d7dc91e58bb29699667_client-logo-6.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84dc9040d8ac9d3acdb8a_client-logo-7.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84dd4040d8ac9d3ace777_client-logo-8.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84de93934ea24a29db7f7_client-logo-9.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84df5f1ff75c367518339_client-logo-10.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84dfe173d1ee5be042eef_client-logo-11.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-4">
                <Image 
                  src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64f84e8992c244ded858d7cc_client-logo-12.svg" 
                  alt="Client Logo" 
                  width={120} 
                  height={60} 
                  className="max-h-8 sm:max-h-12 w-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                About Us
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-orange-400 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 text-gray-900">
                  Grow your business with InnoVites
                </h3>
                <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm sm:text-base">
                  At InnoVites, we are more than a technology provider; we are your <strong>trusted strategic partner in digital transformation for the global wire and cable industry</strong>. Our specialized solutions are designed to streamline operations, enhance efficiency, and foster seamless collaboration across your sales, design, and manufacturing teams.
                </p>
                <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm sm:text-base">
                  With deep-rooted expertise in the wire and cable sector, we enhance and adapt to your existing systems, to deliver comprehensive solutions that address every aspect of the wire & cable industry.
                </p>
                <p className="text-gray-600 mb-6 lg:mb-8 leading-relaxed text-sm sm:text-base">
                  InnoVites isn&apos;t just a software provider; we&apos;re your strategic advisors. We empower your business with cutting-edge tools and insights, from advanced analytics and IoT integration to AI applications and supply chain optimization. Together, we help you stay ahead in a dynamic and competitive global market.
                </p>
                <button className="bg-orange-400 text-black px-6 sm:px-8 py-3 font-semibold hover:bg-orange-500 transition-colors text-sm sm:text-base rounded-md sm:rounded-none">
                  Talk to a wire & cable expert
                </button>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 h-64 sm:h-80 lg:h-96 flex items-center justify-center shadow-md rounded-lg">
                  <div className="text-center">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799e6322f200317e0d0049d_ef6ca65b3f382cb36570a090b50138b2_Home-banner-slider-01.jpg" 
                      alt="Digital Transformation" 
                      width={400} 
                      height={300} 
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover mb-3 lg:mb-4 rounded-lg"
                    />
                    <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Digital Transformation</h4>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Comprehensive solutions for the wire & cable industry
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Products & Services
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-orange-400 mx-auto"></div>
            </div>

            <div className="mb-12 lg:mb-16">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 text-gray-900">
                Robust software solutions, exclusively for Wire & cable Industry
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 text-sm sm:text-base">
                InnoVites offers industry-specific business solutions tailored to meet the unique needs of the wire and cable sector. Built on the robust Microsoft Platform, our integrated solutions cover every aspect of your operations—from capturing customer requirements and managing specialized inventory to innovating new designs and addressing production challenges.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                With a deep understanding of the industry&apos;s complexities, we combine our expertise with cutting-edge AI technology to deliver solutions that enhance productivity, optimize processes, minimize waste, and fuel measurable business growth. InnoVites is here to simplify the complexities of your operations, so you can focus on achieving excellence and staying ahead in a competitive market.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 text-gray-900">Our Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* cableCORE DDM */}
                <Link href="/cablecore-ddm" target="_blank" className="relative bg-white p-6 sm:p-8 shadow-md rounded-lg hover:bg-orange-100 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                        <Image 
                          src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a9d8a99f696e13a208bb7b_3529b4a94bba705b948a5cecae7be9a9_Product-icon-yellow-04.svg" 
                          alt="DDM Icon" 
                          width={32} 
                          height={32} 
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="border-b-2 border-orange-400 w-6 sm:w-8 mb-3 sm:mb-4"></div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                        cableCORE <strong>DDM</strong>
                      </h4>
                      <p className="text-gray-700 text-sm sm:text-base">
                        For Sales & Engineering
                      </p>
                    </div>
                    <div className="mt-auto flex items-center text-gray-900">
                      <span className="mr-2 text-sm sm:text-base">Explore Now</span>
                      <Image 
                        src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a5f9688c6a8fb136f8e31b_Product-black-arrow.svg" 
                        alt="Arrow" 
                        width={16} 
                        height={16} 
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                    </div>
                  </div>
                  <p className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-3xl font-bold text-gray-300">
                    02
                  </p>
                </Link>

                {/* cableERP */}
                <Link href="/cableerp" target="_blank" className="relative bg-white p-6 sm:p-8 shadow-md rounded-lg hover:bg-orange-100 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                        <Image 
                          src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a5f6d5c2304ee3cb492614_Product-icon-yellow-01.svg" 
                          alt="ERP Icon" 
                          width={32} 
                          height={32} 
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="border-b-2 border-orange-400 w-6 sm:w-8 mb-3 sm:mb-4"></div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                        cableERP
                      </h4>
                      <p className="text-gray-700 text-sm sm:text-base">
                        For Cross Functional Team
                      </p>
                    </div>
                    <div className="mt-auto flex items-center text-gray-900">
                      <span className="mr-2 text-sm sm:text-base">Explore Now</span>
                      <Image 
                        src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a5f9688c6a8fb136f8e31b_Product-black-arrow.svg" 
                        alt="Arrow" 
                        width={16} 
                        height={16} 
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                    </div>
                  </div>
                  <p className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-3xl font-bold text-gray-300">
                    01
                  </p>
                </Link>

                {/* cableCORE MES */}
                <Link href="/cablecore-mes" target="_blank" className="relative bg-white p-6 sm:p-8 shadow-md rounded-lg hover:bg-orange-100 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                        <Image 
                          src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a5f6d5d71bc52dc68a0143_Product-icon-yellow-02.svg" 
                          alt="MES Icon" 
                          width={32} 
                          height={32} 
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="border-b-2 border-orange-400 w-6 sm:w-8 mb-3 sm:mb-4"></div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                        cableCORE MES
                      </h4>
                      <p className="text-gray-700 text-sm sm:text-base">
                        For Manufacturing Team
                      </p>
                    </div>
                    <div className="mt-auto flex items-center text-gray-900">
                      <span className="mr-2 text-sm sm:text-base">Explore Now</span>
                      <Image 
                        src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a5f9688c6a8fb136f8e31b_Product-black-arrow.svg" 
                        alt="Arrow" 
                        width={16} 
                        height={16} 
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                    </div>
                  </div>
                  <p className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-3xl font-bold text-gray-300">
                    03
                  </p>
                </Link>

                {/* cableCRM */}
                <Link href="/cable-crm" target="_blank" className="relative bg-white p-6 sm:p-8 shadow-md rounded-lg hover:bg-orange-100 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                        <Image 
                          src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a5f6d500496f339d6ea59a_Product-icon-yellow-03.svg" 
                          alt="CRM Icon" 
                          width={32} 
                          height={32} 
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      </div>
                      <div className="border-b-2 border-orange-400 w-6 sm:w-8 mb-3 sm:mb-4"></div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                        cableCRM
                      </h4>
                      <p className="text-gray-700 text-sm sm:text-base">
                        More Details Coming Soon
                      </p>
                    </div>
                    <div className="mt-auto flex items-center text-gray-900">
                      <span className="mr-2 text-sm sm:text-base">Explore Now</span>
                      <Image 
                        src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a5f9688c6a8fb136f8e31b_Product-black-arrow.svg" 
                        alt="Arrow" 
                        width={16} 
                        height={16} 
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                    </div>
                  </div>
                  <p className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-3xl font-bold text-gray-300">
                    04
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-orange-400 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 text-gray-900">
                  Why Choose InnoVites for the Wire & Cable Industry?
                </h3>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799ba9ba1ccc472b1d3caa9_Why-choose-us-icon-02.svg" 
                      alt="Tailored Expertise" 
                      width={24} 
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">Tailored Expertise for Growth and Flexibility</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Focused exclusively on the wire and cable industry, we deliver solutions built to tackle its specific challenges head-on. By combining our deep industry expertise with a clear understanding of your business goals, we provide tools that not only address current needs but also offer the flexibility to adapt and scale as your operations evolve.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799b99d6dbb9249900d52c3_Why-choose-us-icon-01.svg" 
                      alt="End-to-End Integration" 
                      width={24} 
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">End-to-End Integration</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Our systems integrate seamlessly into your existing tech stack, connecting teams and processes across the wire & cable manufacturing. This ensures smoother workflows, reduced downtime, and enhanced productivity.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799ba9b8e0294f53ec71df3_Why-choose-us-icon-03.svg" 
                      alt="Future-Ready Technology" 
                      width={24} 
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">Future-Ready Technology</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Stay ahead of the curve with our innovative solutions powered by AI, and advanced collaboration. We empower you to leverage cutting-edge technologies to streamline operations, minimize waste, and make smarter decisions.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6799ba9be289300ed58ef2ea_Why-choose-us-icon-04.svg" 
                      alt="Global Reach" 
                      width={24} 
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">Global Reach, Local Understanding</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Serving wire and cable manufacturers around the world, we offer scalable solutions with the local partner network; tailored to your specific needs—whether you&apos;re navigating local market demands or expanding globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Customer Testimonials
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-orange-400 mx-auto mb-6 lg:mb-8"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">What Do Our Customers Say?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white p-6 sm:p-8 shadow-md rounded-lg">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  &quot;CableERP adds length management in D365 like it was part of the standard ERP. It is now part of our daily business and gives us great help in controlling our cables and ducts. I can highly recommend InnoVites and their consultants, they offer solid support and are very eager to help.&quot;
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Oscar Karlsson</p>
                    <p className="text-xs sm:text-sm text-gray-700">CIO at Hexatronic - Sweden</p>
                  </div>
                  <div className="w-full sm:w-px h-px sm:h-12 bg-gray-200 mx-0 sm:mx-4 mb-4 sm:mb-0"></div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/653a18ec67914d0e29ba6364_hexatronic-group-logo-rgb-black.png" 
                      alt="Hexatronic" 
                      width={80} 
                      height={40} 
                      className="max-h-6 sm:max-h-8 w-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 shadow-md rounded-lg">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  &quot;At RR Kabel we are using CableERP from InnoVites as our key IT solutions. These integrated applications support our critical business processes and enable us to continuously improve our business performance.&quot;
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Pragnesh Parikh</p>
                    <p className="text-xs sm:text-sm text-gray-700">IT Manager at RR Kabel - India</p>
                  </div>
                  <div className="w-full sm:w-px h-px sm:h-12 bg-gray-200 mx-0 sm:mx-4 mb-4 sm:mb-0"></div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/67a1ab0053c4874266b27472_RRK%20logo%203.png" 
                      alt="RR Kabel" 
                      width={80} 
                      height={40} 
                      className="max-h-6 sm:max-h-8 w-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 shadow-md rounded-lg md:col-span-2 lg:col-span-1">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  &quot;The CableSuite is the right solution for NEWT. As innovative cable manufacturer we have special requirements that are not covered by other business solutions. With the CableSuite we avoid customizations and have a sustainable solution out-of-the-box.&quot;
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Mr. White</p>
                    <p className="text-xs sm:text-sm text-gray-700">President at NEWT</p>
                  </div>
                  <div className="w-full sm:w-px h-px sm:h-12 bg-gray-200 mx-0 sm:mx-4 mb-4 sm:mb-0"></div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6551e4bd264484f2eddc2a36_NEWT-logo.jpg" 
                      alt="NEWT" 
                      width={80} 
                      height={40} 
                      className="max-h-6 sm:max-h-8 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                FAQ&apos;s
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-orange-400 mx-auto mb-6 lg:mb-8"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Here are some of the questions that are frequently asked to us and their answers.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
              {[
                {
                  question: "How do I start a digital transformation process?",
                  answer: (
                    <div className="text-sm sm:text-base">
                      <strong>Starting digital transformation in the wire and cable industry involves these steps:</strong><br />
                      - <strong>Assess Your Current State:</strong> Identify inefficiencies in your operations, from design to production and distribution.<br />
                      - <strong>Define Goals:</strong> Align your objectives—be it reducing lead times, improving inventory accuracy, or increasing customer satisfaction.<br />
                      - <strong>Choose the Right Technology:</strong> Tools like <strong>CableERP</strong> & <strong>cableCORE MES</strong> are specifically designed for the wire and cable industry.<br />
                      - <strong>Start Small and Scale:</strong> Begin with pilot projects before scaling across operations.
                    </div>
                  )
                },
                {
                  question: "What kind of companies does InnoVites work with?",
                  answer: "As a strategic partner for digital transformation, InnoVites works closely with small and medium-sized cable manufacturers aiming to streamline operations and scale efficiently. Our solutions are specifically designed to address the unique challenges of the wire and cable industry."
                },
                {
                  question: "Do you provide local support?",
                  answer: "Absolutely! InnoVites collaborates with trusted regional partners who bring a deep understanding of local language, culture, and technology. This collaboration ensures smooth implementation, effective communication, and comprehensive support."
                },
                {
                  question: "Is InnoVites a pure Microsoft partner?",
                  answer: "While InnoVites is proud to be an Independent Software Vendor (ISV) on Microsoft Dynamics 365, we believe in open architectures and APIs. We leverage multiple technology stacks such as Siemens Mendix and AVEVA System Platform, ensuring flexibility and long-term adaptability."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <svg
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                      <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 lg:mb-6 text-white">Subscribe to Newsletter</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Subscribe to our email to receive the most recent information on wire & cable industry trends and insights
                </p>
              </div>
              <div>
                <form className="space-y-0">
                  <div className="flex flex-col sm:flex-row gap-0">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base sm:text-lg rounded-t-md sm:rounded-l-md sm:rounded-tr-none"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-orange-400 text-black px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:bg-orange-500 transition-colors text-base sm:text-lg whitespace-nowrap rounded-b-md sm:rounded-r-md sm:rounded-bl-none"
                    >
                      Subscribe Now!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                Drop us a message with your queries, our support team will swiftly get back to you with your answers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-900">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600 mr-3 md:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base">info@innovites.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600 mr-3 md:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base">Global Wire & Cable Industry</span>
                  </div>
                </div>

                <div className="mt-6 md:mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Stay Updated</h4>
                  <p className="text-gray-700 mb-4 text-sm md:text-base">
                    Subscribe to our email to receive the most recent information on wire & cable industry trends and insights
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <input 
                      type="email" 
                      placeholder="Your email address"
                      className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md sm:rounded-none focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                    <button className="bg-orange-600 text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-md sm:rounded-none hover:bg-orange-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 text-sm md:text-base rounded-md font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-4 text-white">Company Info</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 font-medium mb-2">InnoVites B.V.</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Galileilaan 23f, 6716 BP,<br />
                      Ede, The Netherlands<br /><br />
                      <strong>Email: </strong>info@innovites.com
                    </p>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 font-medium mb-2">Other info.</p>
                    <p className="text-gray-400 text-sm">
                      <strong>VAT:</strong> #NL818908713B01
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong>KVK: </strong>30235083
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">Services</Link>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link>
                  </li>
                </ul>
              </div>

              {/* About */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">About</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
                  </li>
                </ul>
              </div>

              {/* Product */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/cableerp" className="text-gray-400 hover:text-white transition-colors text-sm">cableERP</Link>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/cablecore-mes" className="text-gray-400 hover:text-white transition-colors text-sm">cableCORE MES</Link>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/cablecore-ddm" className="text-gray-400 hover:text-white transition-colors text-sm">cableCORE DDM</Link>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/cable-crm" className="text-gray-400 hover:text-white transition-colors text-sm">cableCRM</Link>
                  </li>
                </ul>
              </div>

              {/* Insights */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Insights</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/articles" className="text-gray-400 hover:text-white transition-colors text-sm">Articles</Link>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <Link href="/events" className="text-gray-400 hover:text-white transition-colors text-sm">Events</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-800 mt-8 pt-6 md:pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Logo */}
                <div className="order-2 md:order-1">
                  <Link href="/" className="inline-block">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64e5cfcadae2e32a9d94e0af_innovites-logo-white.svg" 
                      alt="InnoVites" 
                      width={120} 
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>

                {/* Copyright and Links */}
                <div className="order-3 md:order-2 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                    <Link href="/terms-conditions" className="text-gray-400 hover:text-white transition-colors">
                      Terms Of Use
                    </Link>
                    <div className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></div>
                    <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </div>
                  <p className="text-gray-400 text-sm text-center md:text-left">
                    InnoVites B.V. All right reserved.
                  </p>
                </div>

                {/* Social Links */}
                <div className="order-1 md:order-3 flex space-x-4">
                  <Link href="https://www.linkedin.com/company/innovites/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/677fc03f30ed5bf7c909b14e_linkedin.svg" 
                      alt="LinkedIn" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </Link>
                  <Link href="https://www.youtube.com/@InnoVites" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/677fc059772709cc45fa54f1_youtube.svg" 
                      alt="YouTube" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </Link>
                  <Link href="https://x.com/InnoVites?t=0phLAtwoBhRzzDTpkLMFYw&s=09" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/677fc0667b2c51e1d17b07a1_twitter.svg" 
                      alt="Twitter" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </Link>
                  <Link href="https://bsky.app/profile/innovites.bsky.social" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                    <Image 
                      src="https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/6780edcfc855c90c29afc775_blue-sky.svg" 
                      alt="Blue Sky" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Chatbot Component */}
      <Chatbot />
    </>
  )
}