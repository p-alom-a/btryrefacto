'use client'

import '../styles/homepage.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden font-sans">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Blue Section */}
        <div className="w-full lg:w-2/5 relative overflow-hidden bg-[#002768]">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center px-4 sm:px-8 h-full text-center py-12 lg:py-0">
            {/* Logo */}
            <div className="mb-8 lg:mb-12 transform transition-all duration-700 hover:scale-105">
              <div className="bg-white p-4 sm:p-6 rounded-2xl inline-block shadow-xl">
                <Image 
                  src="/images/logobtry.jpg" 
                  alt="BTRY Logo" 
                  width={160} 
                  height={160} 
                  className="h-24 sm:h-32 lg:h-40 w-auto object-contain"
                />
              </div>
            </div>

            {/* Slogan */}
            <h1 className="text-lg sm:text-xl lg:text-2xl font-light text-white leading-tight tracking-wide animate-fade-in px-4">
              L'exigence au cœur de notre{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                expertise.
              </span>
            </h1>
          </div>
        </div>

        {/* Right White Section */}
        <div className="w-full lg:w-3/5 bg-gray-100 flex flex-col justify-center px-4 sm:px-8 lg:px-12 relative py-12 lg:py-0">
          {/* Decorative elements */}
          <div className="absolute top-10 lg:top-20 right-10 lg:right-20 w-16 lg:w-32 h-16 lg:h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 lg:bottom-20 left-10 lg:left-20 w-12 lg:w-24 h-12 lg:h-24 bg-indigo-100 rounded-full opacity-20 blur-2xl"></div>

          {/* Cards */}
          <div className="relative z-10 flex flex-col gap-4 lg:gap-6 max-w-2xl mx-auto w-full">
            {/* Solution */}
            <div className="group bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                  <Image 
                    src="/images/btrySolution_logo.png" 
                    alt="Solutions" 
                    width={48} 
                    height={48} 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="mb-4 lg:mb-6">
                    <Image 
                      src="/images/logotypo-solution.jpg" 
                      alt="Solutions" 
                      width={120} 
                      height={64} 
                      className="h-12 sm:h-14 lg:h-16 w-auto object-contain mx-auto sm:mx-0"
                    />
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light text-xs sm:text-sm mb-4 max-w-sm mx-auto sm:mx-0">
                    btry solution est un bureau d'études spécialisé dans la sécurité incendie, l'exploitation et l'optimisation des bâtiments.
                  </p>
                  <Link
                    href="/solution"
                    className="inline-flex items-center gap-2 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 bg-[#002768]"
                  >
                    Découvrir nos solutions
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Formation */}
            <div className="group bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                  <Image 
                    src="/images/btryFormation.png" 
                    alt="Formation" 
                    width={48} 
                    height={48} 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="mb-4 lg:mb-6">
                    <Image 
                      src="/images/logotypo-formation.jpg" 
                      alt="Formation" 
                      width={120} 
                      height={64} 
                      className="h-12 sm:h-14 lg:h-16 w-auto object-contain mx-auto sm:mx-0"
                    />
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light text-xs sm:text-sm mb-4 max-w-sm mx-auto sm:mx-0">
                    Programmes de formation professionnelle et développement des compétences métier.
                  </p>
                  <Link
                    href="/formation"
                    className="inline-flex items-center gap-2 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 bg-[#002768]"
                  >
                    Explorer nos formations
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
