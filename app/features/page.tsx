import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, DollarSign, BarChart3, FolderOpen, Bot, Shield, Globe, Smartphone } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: FileText,
      title: "Smart Invoicing",
      description:
        "Create professional invoices in seconds with automated calculations, tax handling, and payment tracking.",
      badge: "Core",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description:
        "Track time across projects with precision. Automatic timers, manual entries, and detailed reporting.",
      badge: "Core",
    },
    {
      icon: DollarSign,
      title: "Financial Overview",
      description: "Get real-time insights into your business finances with comprehensive dashboards and analytics.",
      badge: "Core",
    },
    {
      icon: FolderOpen,
      title: "File Reconciliation",
      description: "Automatically match and reconcile financial documents with bank transactions and invoices.",
      badge: "AI-Powered",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your business performance with customizable reports and forecasting.",
      badge: "Pro",
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Your personal financial assistant that helps with bookkeeping, insights, and decision making.",
      badge: "AI-Powered",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Enterprise-level security with end-to-end encryption and SOC 2 compliance.",
      badge: "Security",
    },
    {
      icon: Globe,
      title: "Multi-Currency",
      description: "Handle international business with support for 150+ currencies and automatic conversion.",
      badge: "Global",
    },
    {
      icon: Smartphone,
      title: "Mobile & Desktop",
      description: "Native apps for all platforms. Work seamlessly across desktop, mobile, and web.",
      badge: "Platform",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-4xl lg:text-5xl font-light leading-tight text-gray-900 tracking-tight">
            Everything you need to run your business
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            From invoicing to financial insights, midday provides all the tools you need to manage your business
            finances efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-gray-200/50 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-medium">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50">
          <h2 className="text-3xl font-light text-gray-900">Ready to streamline your business?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses that trust midday to handle their financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium text-base transition-colors">
              Start Free Trial
            </button>
            <button className="border border-gray-300 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full font-medium text-base hover:bg-gray-50 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
