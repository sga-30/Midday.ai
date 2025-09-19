/* AUTO: robustness improvements */
"use client";

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

import { useState } from "react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for freelancers and small projects",
      features: [
        "Up to 5 invoices per month",
        "Basic time tracking",
        "Simple financial overview",
        "Email support",
        "Mobile app access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For growing businesses and teams",
      features: [
        "Unlimited invoices",
        "Advanced time tracking",
        "File reconciliation",
        "Financial analytics",
        "AI assistant",
        "Priority support",
        "Multi-currency support",
        "Custom branding",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs",
      features: [
        "Everything in Professional",
        "Advanced security features",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom reporting",
        "API access",
        "White-label options",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const [message, setMessage] = useState<string|undefined>();

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-4xl lg:text-5xl font-light leading-tight text-gray-900 tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Choose the plan that fits your business. All plans include a 30-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-gray-200/50 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${
                plan.popular ? "ring-2 ring-black/10 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-black text-white px-4 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-2xl font-medium">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-1">{plan.period}</span>}
                  </div>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 rounded-full font-medium ${
                    plan.popular
                      ? "bg-black hover:bg-gray-800 text-white"
                      : "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center space-y-8 bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50">
          <h2 className="text-3xl font-light text-gray-900">Frequently asked questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Can I change plans anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">
                All paid plans come with a 30-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
