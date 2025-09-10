"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Moon, Star, Sun, Calendar, Clock, MapPin, Search } from "lucide-react"

export default function AstrologyWebsite() {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    question: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll(".floating-element")
    elements.forEach((element, index) => {
      const delay = index * 0.3
      const duration = 4 + Math.random() * 3
      const element_html = element as HTMLElement
      element_html.style.animationDelay = `${delay}s`
      element_html.style.animationDuration = `${duration}s`
    })

    // Add parallax scrolling effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = document.querySelectorAll(".parallax")
      parallax.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        const element_html = element as HTMLElement
        element_html.style.transform = `translateY(${scrolled * speed}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "placeOfBirth" && value.length > 2) {
      const majorCities = [
        "Mumbai, Maharashtra, India",
        "Delhi, Delhi, India",
        "Bangalore, Karnataka, India",
        "Hyderabad, Telangana, India",
        "Ahmedabad, Gujarat, India",
        "Chennai, Tamil Nadu, India",
        "Kolkata, West Bengal, India",
        "Pune, Maharashtra, India",
        "Jaipur, Rajasthan, India",
        "Lucknow, Uttar Pradesh, India",
        "Kanpur, Uttar Pradesh, India",
        "Nagpur, Maharashtra, India",
        "Indore, Madhya Pradesh, India",
        "Thane, Maharashtra, India",
        "Bhopal, Madhya Pradesh, India",
        "Visakhapatnam, Andhra Pradesh, India",
        "Pimpri-Chinchwad, Maharashtra, India",
        "Patna, Bihar, India",
        "Vadodara, Gujarat, India",
        "Ghaziabad, Uttar Pradesh, India",
        "Ludhiana, Punjab, India",
        "Agra, Uttar Pradesh, India",
        "Nashik, Maharashtra, India",
        "Faridabad, Haryana, India",
        "Meerut, Uttar Pradesh, India",
        "Rajkot, Gujarat, India",
        "Kalyan-Dombivali, Maharashtra, India",
        "Vasai-Virar, Maharashtra, India",
        "Varanasi, Uttar Pradesh, India",
        "Srinagar, Jammu and Kashmir, India",
        "Aurangabad, Maharashtra, India",
        "Dhanbad, Jharkhand, India",
        "Amritsar, Punjab, India",
        "Navi Mumbai, Maharashtra, India",
        "Allahabad, Uttar Pradesh, India",
        "Ranchi, Jharkhand, India",
        "Howrah, West Bengal, India",
        "Coimbatore, Tamil Nadu, India",
        "Jabalpur, Madhya Pradesh, India",
        "Gwalior, Madhya Pradesh, India",
      ]

      const suggestions = majorCities.filter((city) => city.toLowerCase().includes(value.toLowerCase())).slice(0, 8)

      // Add custom location if not found
      if (suggestions.length === 0) {
        suggestions.push(`${value}, India`)
      }

      setLocationSuggestions(suggestions)
      setShowSuggestions(suggestions.length > 0)
    } else if (name === "placeOfBirth") {
      setShowSuggestions(false)
    }
  }

  const handleLocationSelect = (location: string) => {
    setFormData((prev) => ({ ...prev, placeOfBirth: location }))
    setShowSuggestions(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setResponse("")

    try {
      const apiData = {
        data: {
          name: formData.name,
          dob: formData.dateOfBirth,
          tob: formData.timeOfBirth,
          place: formData.placeOfBirth,
          question: formData.question,
        },
      }

      const response = await fetch("/api/astrology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.details || `API request failed with status ${response.status}`)
      }

      const result = await response.json()
      setResponse(result.predictions || "No predictions received")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to connect to the cosmic servers. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse parallax"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse parallax"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse parallax"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Enhanced floating celestial elements */}
        <div className="floating-element absolute top-10 left-10 animate-float">
          <Star className="w-6 h-6 text-yellow-400/80 drop-shadow-lg" />
        </div>
        <div className="floating-element absolute top-32 right-20 animate-float-delayed">
          <Sparkles className="w-8 h-8 text-purple-400/70 drop-shadow-lg" />
        </div>
        <div className="floating-element absolute bottom-40 left-1/4 animate-float">
          <Moon className="w-7 h-7 text-blue-300/70 drop-shadow-lg" />
        </div>
        <div className="floating-element absolute top-1/2 right-10 animate-float-delayed">
          <Sun className="w-6 h-6 text-orange-400/80 drop-shadow-lg" />
        </div>
        <div className="floating-element absolute bottom-20 right-1/3 animate-float">
          <Star className="w-5 h-5 text-pink-400/70 drop-shadow-lg" />
        </div>
        <div className="floating-element absolute top-20 left-1/2 animate-float-delayed">
          <Sparkles className="w-7 h-7 text-cyan-400/60 drop-shadow-lg" />
        </div>
        <div className="floating-element absolute bottom-60 left-10 animate-float">
          <Moon className="w-6 h-6 text-indigo-400/70 drop-shadow-lg" />
        </div>

        {/* Enhanced twinkling stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        <div className="shooting-star absolute top-1/4 left-0 w-2 h-2 bg-gradient-to-r from-white to-transparent rounded-full animate-shooting-star"></div>
        <div
          className="shooting-star absolute top-3/4 left-0 w-1 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full animate-shooting-star"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-spin-slow drop-shadow-lg" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
              Cosmic Insights
            </h1>
            <Sparkles
              className="w-12 h-12 text-purple-400 animate-spin-slow drop-shadow-lg"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up drop-shadow-lg">
            Unlock the mysteries of your celestial blueprint. Discover what the stars reveal about your path, purpose,
            and cosmic destiny through ancient wisdom and modern insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="backdrop-blur-xl bg-white/5 border-purple-500/40 shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 animate-slide-in-left hover:scale-105 hover:bg-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-yellow-400 flex items-center justify-center gap-3 drop-shadow-lg">
                <Moon className="w-8 h-8 animate-pulse" />
                Birth Chart Reading
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Share your cosmic coordinates to receive personalized astrological guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-white/10 border-purple-500/40 focus:border-yellow-400/70 focus:ring-yellow-400/30 text-white placeholder:text-gray-400 transition-all duration-300 hover:bg-white/15"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-2 text-gray-200">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-500/40 focus:border-yellow-400/70 focus:ring-yellow-400/30 text-white transition-all duration-300 hover:bg-white/15 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeOfBirth" className="text-sm font-medium flex items-center gap-2 text-gray-200">
                      <Clock className="w-4 h-4 text-purple-400" />
                      Time of Birth
                    </Label>
                    <Input
                      id="timeOfBirth"
                      name="timeOfBirth"
                      type="time"
                      value={formData.timeOfBirth}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-500/40 focus:border-yellow-400/70 focus:ring-yellow-400/30 text-white transition-all duration-300 hover:bg-white/15 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="placeOfBirth" className="text-sm font-medium flex items-center gap-2 text-gray-200">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Place of Birth
                  </Label>
                  <div className="relative">
                    <Input
                      id="placeOfBirth"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleInputChange}
                      placeholder="e.g., Mumbai, Maharashtra, India"
                      required
                      className="bg-white/10 border-purple-500/40 focus:border-yellow-400/70 focus:ring-yellow-400/30 text-white placeholder:text-gray-400 transition-all duration-300 hover:bg-white/15 pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>

                  {showSuggestions && (
                    <div className="absolute z-50 w-full mt-1 bg-slate-800/95 backdrop-blur-xl border border-purple-500/40 rounded-xl shadow-2xl max-h-64 overflow-y-auto animate-fade-in">
                      {locationSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleLocationSelect(suggestion)}
                          className="w-full text-left px-4 py-3 text-gray-200 hover:bg-purple-500/30 transition-all duration-300 border-b border-purple-500/20 last:border-b-0 hover:scale-105 transform"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            <span className="font-medium">{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-400">Include city, state/province, and country for accuracy</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question" className="text-sm font-medium text-gray-200">
                    Your Question
                  </Label>
                  <Textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="What would you like to know about your cosmic path? Ask about love, career, life purpose, or any area where you seek celestial guidance..."
                    rows={4}
                    required
                    className="bg-white/10 border-purple-500/40 focus:border-yellow-400/70 focus:ring-yellow-400/30 text-white placeholder:text-gray-400 resize-none transition-all duration-300 hover:bg-white/15"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg animate-shake backdrop-blur-sm">
                    <p className="text-red-300 text-sm font-medium">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-500 via-purple-600 to-cyan-500 hover:from-yellow-400 hover:via-purple-500 hover:to-cyan-400 text-white font-bold py-6 transition-all duration-700 transform hover:scale-105 disabled:scale-100 shadow-2xl hover:shadow-yellow-500/40 animate-gradient-shift"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-lg">Consulting the Stars...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="text-lg">Reveal My Cosmic Insights</span>
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/5 border-cyan-500/40 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-700 animate-slide-in-right hover:scale-105 hover:bg-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-cyan-400 flex items-center justify-center gap-3 drop-shadow-lg">
                <Star className="w-8 h-8 animate-pulse" />
                Celestial Guidance
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Your personalized astrological reading appears here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {response ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/30 backdrop-blur-sm hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-500">
                    <div className="prose prose-sm max-w-none text-gray-200">
                      {response.split("\n").map((paragraph, index) => (
                        <p
                          key={index}
                          className="mb-4 last:mb-0 leading-relaxed text-pretty animate-fade-in-up text-lg"
                          style={{ animationDelay: `${index * 0.15}s` }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <span>Generated with cosmic wisdom</span>
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center animate-pulse-slow backdrop-blur-sm">
                      <Moon className="w-16 h-16 text-cyan-400 drop-shadow-lg" />
                    </div>
                    <div className="absolute -top-2 -right-2 animate-bounce">
                      <Star className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: "0.5s" }}>
                      <Sparkles className="w-6 h-6 text-purple-400 drop-shadow-lg" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-4 drop-shadow-lg">Awaiting Your Cosmic Query</h3>
                  <p className="text-gray-400 text-pretty max-w-sm leading-relaxed text-lg">
                    Fill out the form to receive your personalized astrological reading and unlock the secrets written
                    in the stars.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-20 pb-8">
          <div className="flex items-center justify-center gap-3 text-lg text-gray-400">
            <Sun className="w-6 h-6 text-yellow-400 animate-pulse drop-shadow-lg" />
            <span className="font-medium drop-shadow-lg">Powered by celestial wisdom and cosmic algorithms</span>
            <Moon className="w-6 h-6 text-cyan-400 animate-pulse drop-shadow-lg" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 200% 50%; }
          75% { background-position: 300% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-60px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes shooting-star {
          0% { transform: translateX(-100px) translateY(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(-100px); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        .animate-gradient { 
          background-size: 200% 200%; 
          animation: gradient 4s ease infinite; 
        }
        .animate-gradient-shift { 
          background-size: 400% 400%; 
          animation: gradient-shift 6s ease infinite; 
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 1s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 1s ease-out; }
        .animate-shake { animation: shake 0.6s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-shooting-star { animation: shooting-star 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
