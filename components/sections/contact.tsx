'use client'

import { useState, useEffect } from "react"
import { GithubIcon, LinkedInIcon, EmailIcon, InstagramIcon, FacebookIcon } from "@/components/icons/tech-icons"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/sujitgautam10",
    icon: <GithubIcon />,
    hoverBg: "group-hover:bg-[#333]",
    hoverText: "group-hover:text-white",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sujitgautam/",
    icon: <LinkedInIcon />,
    hoverBg: "group-hover:bg-[#0A66C2]",
    hoverText: "group-hover:text-white",
  },
  {
    name: "Email",
    href: "mailto:gautamsujit151@gmail.com",
    icon: <EmailIcon />,
    hoverBg: "group-hover:bg-[#EA4335]",
    hoverText: "group-hover:text-white",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sujit_gautam10/",
    icon: <InstagramIcon />,
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-[#F58529] group-hover:via-[#DD2A7B] group-hover:to-[#8134AF]",
    hoverText: "group-hover:text-white",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sujitgautam10",
    icon: <FacebookIcon />,
    hoverBg: "group-hover:bg-[#1877F2]",
    hoverText: "group-hover:text-white",
  },
]

// Spam keywords to detect
const SPAM_KEYWORDS = /(\bviagra\b|\bcasino\b|\blottery\b|\bprize\b|\bwin\b|\bclaim\b|\bcrypto\b|\bbitcoin\b|\b(click here|buy now|limited offer)\b|http|https:\/\/|www\.|\.com)/gi

// Disposable email domains (common ones)
const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com",
  "throwaway.email",
  "guerrillamail.com",
  "10minutemail.com",
  "mailinator.com",
  "temp-mail.org",
  "tempmail.org",
  "yopmail.com",
  "fakeinbox.com",
])

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "spam">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [captchaQuestion, setCaptchaQuestion] = useState<{ num1: number; num2: number; answer: number }>({ num1: 0, num2: 0, answer: 0 })
  const [formData, setFormData] = useState({ name: "", email: "", message: "", captcha: "" })
  const [isHydrated, setIsHydrated] = useState(false)
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
  const [formStartTime, setFormStartTime] = useState(0)
  const [spamCountdown, setSpamCountdown] = useState(0)

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({ num1, num2, answer: num1 + num2 })
    setFormData({ ...formData, captcha: "" })
  }

  useEffect(() => {
    setIsHydrated(true)
    setFormStartTime(Date.now())
    generateCaptcha()

    // Check localStorage for last submission time on mount
    if (typeof window !== "undefined") {
      const storedTime = localStorage.getItem("lastContactSubmissionTime")
      if (storedTime) {
        const lastTime = parseInt(storedTime)
        const now = Date.now()
        const timeSince = now - lastTime

        if (timeSince < 60000) {
          const remainingTime = Math.ceil((60000 - timeSince) / 1000)
          setSpamCountdown(remainingTime)
          setStatus("success")
        } else {
          localStorage.removeItem("lastContactSubmissionTime")
        }
      }
    }
  }, [])

  // Countdown timer for spam detection - starts when spamCountdown > 0
  useEffect(() => {
    if (spamCountdown <= 0) {
      setStatus("idle")
      return
    }

    const interval = setInterval(() => {
      setSpamCountdown((current) => current - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [spamCountdown])

  // Check if email is from disposable domain
  const isDisposableEmail = (email: string): boolean => {
    const domain = email.split("@")[1]?.toLowerCase()
    return domain ? DISPOSABLE_DOMAINS.has(domain) : false
  }

  // Check for spam patterns in text
  const containsSpam = (text: string): boolean => {
    return SPAM_KEYWORDS.test(text)
  }

  // Check submission rate (max 1 submission per 60 seconds)
  const isRateLimited = (): boolean => {
    if (typeof window === "undefined") return false
    
    const storedTime = localStorage.getItem("lastContactSubmissionTime")
    if (!storedTime) return false
    
    const now = Date.now()
    const timeSinceLastSubmission = now - parseInt(storedTime)
    return timeSinceLastSubmission < 60000 // 60 seconds (1 minute)
  }

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Please fill the required field"
      } else if (value.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters"
      } else if (containsSpam(value)) {
        newErrors.name = "Invalid characters detected"
      } else {
        delete newErrors.name
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Please fill the required field"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "Please enter a valid email"
      } else if (isDisposableEmail(value)) {
        newErrors.email = "Please use a real email address"
      } else {
        delete newErrors.email
      }
    }

    if (name === "message") {
      if (!value.trim()) {
        newErrors.message = "Please fill the required field"
      } else if (value.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters"
      } else if (value.trim().length > 1000) {
        newErrors.message = "Message must be less than 1000 characters"
      } else if (containsSpam(value)) {
        newErrors.message = "Message contains invalid content"
      } else {
        delete newErrors.message
      }
    }

    if (name === "captcha") {
      if (!value.trim()) {
        newErrors.captcha = "Please fill the required field"
      } else if (parseInt(value) !== captchaQuestion.answer) {
        newErrors.captcha = "Please answer correctly"
      } else {
        delete newErrors.captcha
      }
    }

    setErrors(newErrors)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (touched[name]) validateField(name, value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const newErrors: Record<string, string> = {}

    // Rate limiting check
    if (isRateLimited()) {
      setStatus("idle")
      setErrors({ submit: "Please wait before sending another message" })
      return
    }

    // Minimum submission time (prevent bots that submit instantly)
    const submissionDuration = Date.now() - formStartTime
    if (submissionDuration < 2000) {
      // 2 seconds minimum
      setStatus("idle")
      setErrors({ submit: "Please take your time to compose a message" })
      return
    }

    // Honeypot field check
    const gotcha = (e.currentTarget as any)._gotcha?.value
    if (gotcha) {
      console.log("[v0] Honeypot triggered - spam detected")
      setStatus("spam")
      setSpamCountdown(60)
      setFormData({ name: "", email: "", message: "", captcha: "" })
      return
    }

    // Validate all fields
    if (!formData.name.trim()) newErrors.name = "Please fill the required field"
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"
    else if (containsSpam(formData.name)) {
      setStatus("spam")
      setSpamCountdown(60)
      return
    }

    if (!formData.email.trim()) newErrors.email = "Please fill the required field"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
    else if (isDisposableEmail(formData.email)) {
      setStatus("spam")
      setSpamCountdown(60)
      return
    }

    if (!formData.message.trim()) newErrors.message = "Please fill the required field"
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"
    else if (formData.message.trim().length > 1000) newErrors.message = "Message must be less than 1000 characters"
    else if (containsSpam(formData.message)) {
      setStatus("spam")
      setSpamCountdown(60)
      return
    }

    if (!formData.captcha.trim() || parseInt(formData.captcha) !== captchaQuestion.answer)
      newErrors.captcha = "Please answer correctly"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched({ name: true, email: true, message: true, captcha: true })
      setStatus("idle")
      return
    }

    try {
      const response = await fetch("https://formspree.io/f/xeelyvgq", {
        method: "POST",
        body: new FormData(e.currentTarget as HTMLFormElement),
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        setStatus("success")
        const now = Date.now()
        setLastSubmissionTime(now)
        setFormStartTime(now)
        setSpamCountdown(60)
        
        // Store submission time in localStorage for persistence across refreshes
        if (typeof window !== "undefined") {
          localStorage.setItem("lastContactSubmissionTime", now.toString())
        }
        
        setFormData({ name: "", email: "", message: "", captcha: "" })
        setTouched({})
        setErrors({})
        generateCaptcha()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-3 md:px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xs md:text-sm text-primary tracking-widest uppercase mb-2 md:mb-3">Contact</h2>
          <h3 className="text-xl md:text-3xl font-bold text-foreground break-words">Get in Touch</h3>
        </div>

        {/* Form & Social - Single Row */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Form - Compact */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            {/* Name & Email - Side by Side on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-xs md:text-sm font-medium text-foreground mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 text-sm bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors ${
                    touched.name && errors.name ? "border-red-500 focus:ring-red-500/50" : "border-border focus:border-primary focus:ring-primary"
                  }`}
                  placeholder="Your name"
                />
                {touched.name && errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs md:text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 text-sm bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors ${
                    touched.email && errors.email ? "border-red-500 focus:ring-red-500/50" : "border-border focus:border-primary focus:ring-primary"
                  }`}
                  placeholder="your@email.com"
                />
                {touched.email && errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Message - Compact */}
            <div>
              <label htmlFor="message" className="block text-xs md:text-sm font-medium text-foreground mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={2}
                className={`w-full px-3 py-2 text-sm bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors resize-none ${
                  touched.message && errors.message ? "border-red-500 focus:ring-red-500/50" : "border-border focus:border-primary focus:ring-primary"
                }`}
                placeholder="Your message..."
              />
              {touched.message && errors.message && <p className="mt-0.5 text-xs text-red-500">{errors.message}</p>}
            </div>

            {/* CAPTCHA - Compact */}
            <div>
              <label htmlFor="captcha" className="block text-xs md:text-sm font-medium text-foreground mb-1" suppressHydrationWarning>
                {isHydrated ? `${captchaQuestion.num1} + ${captchaQuestion.num2}?` : "Verify..."}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  inputMode="numeric"
                  value={formData.captcha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isHydrated}
                  className={`flex-1 px-3 py-2 text-sm bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors ${
                    touched.captcha && errors.captcha ? "border-red-500 focus:ring-red-500/50" : "border-border focus:border-primary focus:ring-primary"
                  }`}
                  placeholder="Answer"
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  disabled={!isHydrated}
                  className="px-2 py-2 text-xs md:text-sm bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/80 disabled:opacity-50 flex-shrink-0"
                >
                  Refresh
                </button>
              </div>
              {touched.captcha && errors.captcha && <p className="mt-0.5 text-xs text-red-500">{errors.captcha}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading" || status === "spam" || status === "success"}
              className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {status === "loading" ? "Sending..." : (status === "spam" || status === "success") && spamCountdown > 0 ? `Wait ${spamCountdown}s` : "Send"}
            </button>

            {/* Status Messages */}
            {status === "success" && spamCountdown > 0 && (
              <div className="p-3 md:p-4 bg-green-500/20 border-2 border-green-600 dark:border-green-500 rounded-lg text-center">
                <p className="text-xs md:text-sm text-green-700 dark:text-green-300 font-semibold mb-2">Message sent Successfully!</p>
                <p className="text-xs md:text-sm text-green-700 dark:text-green-300">
                  Please wait <span className="font-bold text-green-800 dark:text-green-200 text-lg md:text-xl tabular-nums">{spamCountdown}</span> before sending another message
                </p>
              </div>
            )}
            {status === "success" && spamCountdown <= 0 && (
              <div className="p-3 md:p-4 bg-green-500/20 border-2 border-green-600 dark:border-green-500 rounded-lg text-center">
                <p className="text-xs md:text-sm text-green-700 dark:text-green-300 font-semibold">Message sent Successfully! Thank you.</p>
              </div>
            )}
            {status === "error" && (
              <div className="p-3 md:p-4 bg-red-500/15 border border-red-500/50 rounded-lg text-center">
                <p className="text-xs md:text-sm text-red-400 font-semibold">Message failed! Please try again.</p>
              </div>
            )}
            {status === "spam" && (
              <div className="p-3 md:p-4 bg-red-500/15 border border-red-500/50 rounded-lg text-center animate-pulse">
                <p className="text-xs md:text-sm text-red-400">
                  Please wait before sending another message
                </p>
                <p className="text-xs text-red-400 mt-2">or <a href="mailto:gautamsujit151@gmail.com" className="font-medium underline hover:text-red-300">email me directly</a></p>
              </div>
            )}
            {errors.submit && <p className="text-xs md:text-sm text-red-400 text-center">{errors.submit}</p>}
          </form>

          {/* Social Links - Compact */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground text-center mb-3 md:mb-4">Connect</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title={link.name}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all group-hover:scale-110 ${link.hoverBg} ${link.hoverText}`}>
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
