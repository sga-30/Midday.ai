/* AUTO: robustness improvements */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  DollarSign,
  FileText,
  Clock,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plus,
  Download,
  Filter,
  Users,
  CreditCard,
  Shield,
  CheckCircle,
  Star,
  Sun,
  Moon,
  Share2,
  Lock,
  Unlock,
  Copy,
  Check,
} from "lucide-react"

interface DashboardStats {
  totalRevenue: number
  monthlyRevenue: number
  pendingInvoices: number
  paidInvoices: number
  overdueInvoices: number
  totalClients: number
  hoursTracked: number
  averageInvoiceValue: number
  revenueGrowth: number
}

interface Invoice {
  id: string
  invoice_number: string
  client_name: string
  amount: number
  status: string
  due_date: string
  created_at: string
}

const backgroundClass = (isDayMode: boolean) =>
  isDayMode ? "bg-white" : "bg-gradient-to-br from-black via-slate-900 to-blue-900"
const subtextClass = (isDayMode: boolean) => (isDayMode ? "text-gray-500" : "text-blue-200")
const textClass = (isDayMode: boolean) => (isDayMode ? "text-gray-900" : "text-white")
const cardClass = (isDayMode: boolean) =>
  isDayMode ? "bg-white" : "bg-gradient-to-br from-black/80 to-blue-900/80 backdrop-blur-sm border-blue-800/50"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "pricing">("overview")
  const [isDayMode, setIsDayMode] = useState(true)
  const [isPublic, setIsPublic] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [copied, setCopied] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const togglePrivacy = () => {
    setIsPublic(!isPublic)
    if (!isPublic) {
      const newShareLink = `${window.location.origin}/shared/${user?.id || "demo"}-${Date.now()}`
      setShareLink(newShareLink)
    }
  }

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const toggleDayNight = () => {
    setIsDayMode(!isDayMode)
  }

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken")
      const userData = localStorage.getItem("user")

      if (!token || !userData) {
        router.push("/auth/signin")
        return
      }

      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
        router.push("/auth/signin")
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)

        const statsResponse = await fetch("/api/dashboard/stats")
        if (!statsResponse.ok) throw new Error("Failed to fetch stats")
        const statsData = await statsResponse.json()

        const invoicesResponse = await fetch("/api/invoices")
        if (!invoicesResponse.ok) throw new Error("Failed to fetch invoices")
        const invoicesData = await invoicesResponse.json()

        setStats(statsData.stats)
        setInvoices(invoicesData.invoices || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${backgroundClass(isDayMode)}`}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className={`${subtextClass(isDayMode)} mt-4`}>Checking authentication...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen ${backgroundClass(isDayMode)}`}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className={`${subtextClass(isDayMode)} mt-4`}>Loading your dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen ${backgroundClass(isDayMode)}`}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading dashboard: {error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue?.toLocaleString() || "0"}`,
      change: `+${stats?.revenueGrowth || 0}%`,
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Invoices Sent",
      value: `${(stats?.paidInvoices || 0) + (stats?.pendingInvoices || 0)}`,
      change: `+${stats?.pendingInvoices || 0} pending`,
      trend: "up" as const,
      icon: FileText,
    },
    {
      title: "Hours Tracked",
      value: `${stats?.hoursTracked || 0}h`,
      change: "+12.5h this week",
      trend: "up" as const,
      icon: Clock,
    },
    {
      title: "Average Invoice",
      value: `$${stats?.averageInvoiceValue?.toLocaleString() || "0"}`,
      change: "+5.2%",
      trend: "up" as const,
      icon: BarChart3,
    },
  ]

  const features = [
    {
      icon: FileText,
      title: "Smart Invoicing",
      description: "Create professional invoices in seconds with AI-powered templates and automatic calculations.",
      status: "active",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Track time across projects with automatic categorization and detailed reporting.",
      status: "active",
    },
    {
      icon: BarChart3,
      title: "Financial Analytics",
      description: "Get insights into your business performance with real-time dashboards and reports.",
      status: "active",
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Accept payments online with integrated payment processing and automatic reconciliation.",
      status: "active",
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Organize client information, track communication, and manage relationships efficiently.",
      status: "active",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is protected with enterprise-grade security and encryption.",
      status: "active",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for freelancers and small businesses just getting started.",
      features: [
        "Up to 5 invoices per month",
        "Basic time tracking",
        "Email support",
        "Mobile app access",
        "Basic reporting",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses that need advanced features.",
      features: [
        "Unlimited invoices",
        "Advanced time tracking",
        "Priority support",
        "Team collaboration",
        "Advanced analytics",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations with complex requirements.",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "White-label solution",
        "SLA guarantee",
      ],
      popular: false,
    },
  ]

  return (
    <div className={`min-h-screen ${backgroundClass(isDayMode)} transition-all duration-1000 ease-in-out`}>
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <div className="flex items-center space-x-4">
              <h1 className={`text-2xl sm:text-3xl font-light ${textClass(isDayMode)}`}>
                {activeTab === "overview" ? "Dashboard" : activeTab === "features" ? "Features" : "Pricing"}
              </h1>
              {user && (
                <span className={`text-sm ${subtextClass(isDayMode)}`}>Welcome back, {user.name || user.email}!</span>
              )}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePrivacy}
                  className={`rounded-full p-2 transition-all duration-500 hover:scale-110 ${isDayMode ? "bg-white/80 hover:bg-white border-gray-300" : "bg-gradient-to-br from-black to-blue-900/80 hover:bg-blue-900 border-blue-700"}`}
                >
                  <div className="flex items-center space-x-1">
                    {isPublic ? (
                      <Unlock className={`w-4 h-4 text-green-600`} />
                    ) : (
                      <Lock className={`w-4 h-4 ${subtextClass(isDayMode)}`} />
                    )}
                    <span className={`text-xs ${subtextClass(isDayMode)}`}>{isPublic ? "Public" : "Private"}</span>
                  </div>
                </Button>

                {isPublic && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowShareModal(true)}
                    className={`rounded-full p-2 transition-all duration-500 hover:scale-110 ${isDayMode ? "bg-white/80 hover:bg-white border-gray-300" : "bg-gradient-to-br from-black to-blue-900/80 hover:bg-blue-900 border-blue-700"}`}
                  >
                    <Share2 className={`w-4 h-4 ${subtextClass(isDayMode)}`} />
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleDayNight}
                  className={`rounded-full p-2 transition-all duration-500 hover:scale-110 ${isDayMode ? "bg-white/80 hover:bg-white border-gray-300" : "bg-gradient-to-br from-black to-blue-900/80 hover:bg-blue-900 border-blue-700"}`}
                >
                  <div className="transition-transform duration-500 ease-in-out">
                    {isDayMode ? (
                      <Moon className={`w-4 h-4 ${subtextClass(isDayMode)}`} />
                    ) : (
                      <Sun className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                </Button>
              </div>
            </div>
            <p className={`${subtextClass(isDayMode)} mt-1`}>
              {activeTab === "overview"
                ? "Welcome back! Here's what's happening with your business."
                : activeTab === "features"
                  ? "Explore all the powerful features available in your plan."
                  : "Choose the perfect plan for your business needs."}
            </p>
          </div>

          <div
            className={`flex items-center space-x-1 ${isDayMode ? "bg-white/90 border border-gray-200" : "bg-black/90 border border-blue-800/50"} backdrop-blur-sm rounded-full p-1 transition-all duration-300`}
          >
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-4 transition-all duration-300 ${activeTab === "overview" ? (isDayMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white") : isDayMode ? "text-gray-600 hover:text-gray-900" : "text-blue-200 hover:text-white"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "features" ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-4 transition-all duration-300 ${activeTab === "features" ? (isDayMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white") : isDayMode ? "text-gray-600 hover:text-gray-900" : "text-blue-200 hover:text-white"}`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </Button>
            <Button
              variant={activeTab === "pricing" ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-4 transition-all duration-300 ${activeTab === "pricing" ? (isDayMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white") : isDayMode ? "text-gray-600 hover:text-gray-900" : "text-blue-200 hover:text-white"}`}
              onClick={() => setActiveTab("pricing")}
            >
              Pricing
            </Button>
          </div>
        </div>

        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
            <Card
              className={`${isDayMode ? "bg-white" : "bg-gradient-to-br from-black to-blue-900 border-blue-800/50"} w-full max-w-md mx-4 animate-in slide-in-from-bottom-4 duration-300`}
            >
              <CardHeader>
                <CardTitle className={`text-xl font-medium ${textClass(isDayMode)} flex items-center space-x-2`}>
                  <Share2 className="w-5 h-5" />
                  <span>Share Dashboard</span>
                </CardTitle>
                <CardDescription className={subtextClass(isDayMode)}>
                  Share your dashboard with others using this link
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`p-3 rounded-lg ${isDayMode ? "bg-gray-100" : "bg-black/50 border border-blue-800/30"} flex items-center space-x-2`}
                >
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className={`flex-1 bg-transparent ${textClass(isDayMode)} text-sm outline-none`}
                  />
                  <Button
                    size="sm"
                    onClick={copyShareLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className={`text-xs ${subtextClass(isDayMode)} space-y-1`}>
                  <p>• Anyone with this link can view your dashboard</p>
                  <p>• They won't be able to edit or access sensitive data</p>
                  <p>• You can make it private anytime</p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowShareModal(false)}
                    className={`flex-1 ${isDayMode ? "border-gray-300 text-gray-600 hover:bg-gray-100" : "border-blue-700 text-blue-200 hover:bg-blue-900"}`}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={copyShareLink}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "overview" && (
          <>
            <div className="flex items-center space-x-3 mb-8 overflow-x-auto animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-transparent whitespace-nowrap transition-all duration-300 hover:scale-105 ${isDayMode ? "border-gray-300 text-gray-600 hover:bg-gray-100" : "border-blue-700 text-blue-200 hover:bg-blue-900"}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-transparent whitespace-nowrap transition-all duration-300 hover:scale-105 ${isDayMode ? "border-gray-300 text-gray-600 hover:bg-gray-100" : "border-blue-700 text-blue-200 hover:bg-blue-900"}`}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {dashboardStats.map((stat, index) => (
                <Card
                  key={index}
                  className={`${cardClass(isDayMode)} hover:shadow-lg transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${subtextClass(isDayMode)}`}>{stat.title}</CardTitle>
                    <stat.icon
                      className={`h-4 w-4 ${subtextClass(isDayMode)} transition-transform duration-300 hover:scale-110`}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-xl sm:text-2xl font-light ${textClass(isDayMode)}`}>{stat.value}</div>
                    <div className={`flex items-center space-x-1 text-xs ${subtextClass(isDayMode)} mt-1`}>
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600 animate-pulse" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 animate-pulse" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                <Card
                  className={`${cardClass(isDayMode)} animate-in fade-in slide-in-from-left-4 duration-700 delay-500`}
                >
                  <CardHeader>
                    <CardTitle className={`text-xl font-medium ${textClass(isDayMode)}`}>Recent Invoices</CardTitle>
                    <CardDescription className={subtextClass(isDayMode)}>
                      Your latest invoice activity and status updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.slice(0, 4).map((invoice, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${isDayMode ? "hover:bg-gray-100" : "hover:bg-blue-900/30 border border-blue-800/20"}`}
                          style={{ animationDelay: `${600 + index * 100}ms` }}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-10 ${isDayMode ? "bg-blue-100" : "bg-blue-800/50 border border-blue-700/50"} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110`}
                            >
                              <FileText className={`w-5 h-5 ${textClass(isDayMode)}`} />
                            </div>
                            <div>
                              <div className={`font-medium ${textClass(isDayMode)}`}>{invoice.invoice_number}</div>
                              <div className={`text-sm ${subtextClass(isDayMode)}`}>{invoice.client_name}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${textClass(isDayMode)}`}>
                              ${invoice.amount.toLocaleString()}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  invoice.status === "paid"
                                    ? "default"
                                    : invoice.status === "sent"
                                      ? "secondary"
                                      : invoice.status === "overdue"
                                        ? "destructive"
                                        : "outline"
                                }
                                className="text-xs capitalize transition-all duration-300 hover:scale-105"
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                      {invoices.length === 0 && (
                        <div className={`text-center py-8 ${subtextClass(isDayMode)} animate-in fade-in duration-700`}>
                          No invoices found. Create your first invoice to get started.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card
                  className={`${cardClass(isDayMode)} animate-in fade-in slide-in-from-right-4 duration-700 delay-600`}
                >
                  <CardHeader>
                    <CardTitle className={`text-xl font-medium ${textClass(isDayMode)}`}>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className={`w-full justify-start rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDayMode ? "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100" : "bg-transparent border-blue-700 text-blue-200 hover:bg-blue-900"}`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Invoice
                    </Button>
                    <Button
                      variant="outline"
                      className={`w-full justify-start rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDayMode ? "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100" : "bg-transparent border-blue-700 text-blue-200 hover:bg-blue-900"}`}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Start Timer
                    </Button>
                    <Button
                      variant="outline"
                      className={`w-full justify-start rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDayMode ? "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100" : "bg-transparent border-blue-700 text-blue-200 hover:bg-blue-900"}`}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Upload Receipt
                    </Button>
                    <Button
                      variant="outline"
                      className={`w-full justify-start rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDayMode ? "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100" : "bg-transparent border-blue-700 text-blue-200 hover:bg-blue-900"}`}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Reports
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className={`${cardClass(isDayMode)} animate-in fade-in slide-in-from-right-4 duration-700 delay-700`}
                >
                  <CardHeader>
                    <CardTitle className={`text-xl font-medium ${textClass(isDayMode)}`}>This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${subtextClass(isDayMode)}`}>Revenue Goal</span>
                      <span className={`font-medium ${textClass(isDayMode)}`}>$50,000</span>
                    </div>
                    <div
                      className={`w-full ${isDayMode ? "bg-gray-200" : "bg-black/50 border border-blue-800/30"} rounded-full h-2 overflow-hidden`}
                    >
                      <div
                        className={`${isDayMode ? "bg-blue-600" : "bg-blue-400"} h-2 rounded-full transition-all duration-1000 ease-out animate-in slide-in-from-left duration-1000 delay-800`}
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                    <div className={`text-xs ${subtextClass(isDayMode)}`}>$45,231 of $50,000 goal reached</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === "features" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`${cardClass(isDayMode)} hover:shadow-lg transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 ${isDayMode ? "bg-blue-100" : "bg-blue-800/50 border border-blue-700/50"} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110`}
                    >
                      <feature.icon className={`w-6 h-6 ${textClass(isDayMode)}`} />
                    </div>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 border-green-200 transition-all duration-300 hover:scale-105"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <CardTitle className={`text-xl font-medium ${textClass(isDayMode)}`}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${subtextClass(isDayMode)} leading-relaxed`}>{feature.description}</p>
                  <Button
                    variant="outline"
                    className={`w-full mt-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDayMode ? "bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-100" : "bg-transparent border border-blue-700 text-blue-200 hover:bg-blue-900"}`}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`${cardClass(isDayMode)} hover:shadow-lg transition-all duration-500 hover:scale-105 relative animate-in fade-in slide-in-from-bottom-4 duration-700 ${
                  plan.popular ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className={`text-2xl font-medium ${textClass(isDayMode)}`}>{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center space-x-1 mt-4">
                    <span className={`text-4xl font-light ${textClass(isDayMode)}`}>{plan.price}</span>
                    <span className={subtextClass(isDayMode)}>{plan.period}</span>
                  </div>
                  <p className={`${subtextClass(isDayMode)} mt-2`}>{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-1"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className={isDayMode ? "text-gray-700" : "text-white"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-lg mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : isDayMode
                          ? "bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-100"
                          : "bg-transparent border border-blue-700 text-blue-200 hover:bg-blue-900"
                    }`}
                  >
                    {plan.popular ? "Get Started" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
