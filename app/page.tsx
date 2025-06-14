import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowRight, Scan, Utensils, BarChart3, ShieldCheck, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen samsung-font">
      <header className="sticky top-0 z-50 one-ui-glass border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">EatSmart</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm" className="rounded-full">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="one-ui-button">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Smart nutrition at your fingertips</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Analyze your meals in real-time with Edge AI technology that respects your privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="one-ui-button w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full">
                  See Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Scan className="h-10 w-10 text-primary" />}
                title="Scan Your Food"
                description="Point your camera at your meal to instantly analyze its nutritional content."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Get Detailed Analysis"
                description="View macronutrients, calories, allergens, and portion sizes in seconds."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Private & Secure"
                description="All processing happens on your device. Your data never leaves your phone."
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-6">Edge AI Features</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Powered by on-device machine learning for fast, private, and accurate food analysis
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <EdgeAIFeatureCard
                icon={<Sparkles className="h-8 w-8 text-blue-500" />}
                title="Real-time Analysis"
                description="Instantly identify foods and ingredients with our advanced computer vision model."
              />
              <EdgeAIFeatureCard
                icon={<Sparkles className="h-8 w-8 text-purple-500" />}
                title="Offline Processing"
                description="Works without internet connection, keeping your data on your device."
              />
              <EdgeAIFeatureCard
                icon={<Sparkles className="h-8 w-8 text-green-500" />}
                title="Ingredient Detection"
                description="Automatically detects ingredients and potential allergens in packaged foods."
              />
              <EdgeAIFeatureCard
                icon={<Sparkles className="h-8 w-8 text-orange-500" />}
                title="Personalized Insights"
                description="AI adapts to your preferences and dietary needs over time."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EatSmart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-background border one-ui-card">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function EdgeAIFeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-background border one-ui-card">
      <div className="mb-4 p-3 rounded-full bg-secondary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
