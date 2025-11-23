'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Users, Shield, Wifi, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDark(isDarkMode)
    // eslint-disable-next-line react-hooks/immutability
    updateTheme(isDarkMode)
  }, [])

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggleDarkMode = () => {
    const newDark = !isDark
    setIsDark(newDark)
    updateTheme(newDark)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold">MeetGrid</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-border hover:bg-card transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm sm:text-base w-full sm:w-auto" asChild>
              <Link href="/video">
                Start Video Call
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-block">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/20 text-secondary text-xs sm:text-sm font-medium">
                    ✨ Real-time connections
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Meet <span className="text-primary">new people</span> instantly
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed">
                  Connect with strangers through crystal-clear video, text, and voice. Experience the thrill of real conversations, real connections.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm sm:text-base w-full sm:w-auto" asChild>
                  <Link href="/video">
                    Start Chatting
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-border text-sm sm:text-base w-full sm:w-auto" asChild>
                  <Link href="/video">
                    Start Video Call
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4">
                <div className="flex -space-x-3">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary/30 border-2 border-background" />
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-accent/30 border-2 border-background" />
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-secondary/30 border-2 border-background" />
                </div>
                <p className="text-xs sm:text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">10,000+</span> active conversations daily
                </p>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-full min-h-96">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm h-full">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/20 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 bg-border rounded-full w-3/4" />
                      <div className="h-2 bg-border rounded-full w-2/4" />
                    </div>
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div className="space-y-2 flex-1 text-right">
                      <div className="h-2 bg-primary/30 rounded-full w-2/4 ml-auto" />
                      <div className="h-2 bg-primary/30 rounded-full w-3/4 ml-auto" />
                    </div>
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/20 shrink-0" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-secondary/20 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 bg-border rounded-full w-3/4" />
                      <div className="h-2 bg-border rounded-full w-2/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Powerful features for <span className="text-primary">real connections</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/60 max-w-2xl mx-auto px-2">
              Everything you need for meaningful conversations with people around the world
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Matching',
                desc: 'Get matched with someone instantly and start chatting in seconds',
              },
              {
                icon: Users,
                title: 'Video & Text',
                desc: 'Choose between video chat or text messaging',
              },
              {
                icon: Shield,
                title: 'Safe & Secure',
                desc: 'Anonymous connections with report and block features',
              },
              {
                icon: Wifi,
                title: 'Low Latency',
                desc: 'Crystal-clear quality powered by WebRTC technology',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-5 sm:p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-card/50 transition-all duration-300 cursor-pointer"
              >
                <feature.icon className="w-7 sm:w-8 h-7 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to meet <span className="text-primary">someone new?</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 mb-6 sm:mb-8 leading-relaxed px-2">
            Join thousands of people connecting through real conversations. Start your first connection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm sm:text-base">
              Start Chatting Now
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-border text-sm sm:text-base">
              Start Video Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-sm sm:text-base">MeetGrid</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/60">Real connections, real people.</p>
            </div>
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Security'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Contact'],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{col.title}</h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-xs sm:text-sm text-foreground/60 hover:text-primary transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className=" border-border pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-foreground/60">
            <p>&copy; 2025 MeetGrid. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Twitter
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Discord
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}