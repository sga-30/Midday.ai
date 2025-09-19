"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Clock, DollarSign, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-20 pb-16 sm:pb-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal leading-[1.1] text-black tracking-tight">
                Invoicing, Time tracking, File reconciliation, Storage, Financial Overview & your own Assistant{" "}
                <span className="text-gray-600">made for</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium text-sm w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Try in Desktop
                </Button>
              </Link>
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6 py-3 rounded-lg border-gray-300 bg-white font-medium text-sm w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-400 active:scale-95"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Enhanced Dashboard Preview */}
          <div className="relative mt-8 lg:mt-0 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
            <Link href="/dashboard" className="block">
              <div className="relative transform hover:scale-[1.02] transition-all duration-700 ease-out cursor-pointer group">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mx-auto max-w-md lg:max-w-none group-hover:shadow-3xl transition-shadow duration-500">
                  {/* Dashboard Content */}
                  <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      <div className="space-y-1 transform transition-all duration-300 hover:scale-105">
                        <div className="text-xl sm:text-2xl font-light text-black">$8,248</div>
                        <div className="text-xs sm:text-sm text-gray-500">Revenue</div>
                      </div>
                      <div className="space-y-1 transform transition-all duration-300 hover:scale-105">
                        <div className="text-xl sm:text-2xl font-light text-black">$1,156</div>
                        <div className="text-xs sm:text-sm text-gray-500">Expenses</div>
                      </div>
                    </div>

                    {/* Enhanced Chart with Animations */}
                    <div className="h-24 sm:h-32 bg-gray-50 rounded-xl flex items-end justify-center space-x-1 sm:space-x-2 p-2 sm:p-4 group-hover:bg-gray-100 transition-colors duration-300">
                      {[40, 60, 45, 80, 55, 70, 85, 65, 90, 75].map((height, i) => (
                        <div
                          key={i}
                          className="bg-black rounded-sm transition-all duration-500 hover:bg-gray-700 animate-in slide-in-from-bottom duration-700"
                          style={{
                            height: `${height}%`,
                            width: "6px",
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Transaction Items with Hover Effects */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:px-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-200 hover:scale-110">
                            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-black">Client Payment</div>
                            <div className="text-xs text-gray-500">Invoice #1234</div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-black">+$2,500</div>
                      </div>
                      <div className="flex items-center justify-between py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:px-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-200 hover:scale-110">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-black">Office Supplies</div>
                            <div className="text-xs text-gray-500">Expense</div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-black">-$156</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Enhanced Floating Cards */}
            <Link href="/dashboard">
              <div className="absolute -top-2 sm:-top-4 -right-3 sm:-right-6 bg-white rounded-xl shadow-lg border border-gray-200 p-2 sm:p-3 transform rotate-3 hover:rotate-1 transition-all duration-500 cursor-pointer hover:scale-110 hover:shadow-xl animate-bounce-slow">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-colors duration-300 hover:text-black" />
                  <div>
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="text-xs sm:text-sm font-medium text-black">7h 32m</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard">
              <div className="absolute -bottom-2 sm:-bottom-4 -left-3 sm:-left-6 bg-white rounded-xl shadow-lg border border-gray-200 p-2 sm:p-3 transform -rotate-3 hover:-rotate-1 transition-all duration-500 cursor-pointer hover:scale-110 hover:shadow-xl animate-bounce-slow">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-colors duration-300 hover:text-black" />
                  <div>
                    <div className="text-xs text-gray-500">Invoices</div>
                    <div className="text-xs sm:text-sm font-medium text-black">12</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-2px) rotate(3deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow:nth-child(2) {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
