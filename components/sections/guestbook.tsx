'use client'

import { useState, useEffect } from 'react'

export function GuestbookSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/guestbook')
      const data = await res.json()
      setEntries(data)
    } catch (err) {
      console.error('Error fetching entries:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries()
  }, [])

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }
    
    if (name === 'name') {
      if (!value.trim()) newErrors.name = 'Please fill the required field'
      else delete newErrors.name
    }
    
    if (name === 'email') {
      if (!value.trim()) newErrors.email = 'Please fill the required field'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = 'Please enter a valid email'
      else delete newErrors.email
    }
    
    if (name === 'message') {
      if (!value.trim()) newErrors.message = 'Please fill the required field'
      else delete newErrors.message
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
    setStatus('loading')

    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Please fill the required field'
    if (!formData.email.trim()) newErrors.email = 'Please fill the required field'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.message.trim()) newErrors.message = 'Please fill the required field'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched({ name: true, email: true, message: true })
      setStatus('idle')
      return
    }

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTouched({})
        setErrors({})
        fetchEntries()
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="guestbook" className="min-h-screen flex items-center justify-center px-4 md:px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-sm text-primary tracking-widest uppercase mb-4">Community</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Guestbook</h3>
          <p className="text-muted-foreground">Leave a message and see what others have written</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors ${
                  touched.name && errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-border focus:border-primary focus:ring-primary'
                }`}
                placeholder="Your name"
              />
              {touched.name && errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors ${
                  touched.email && errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-border focus:border-primary focus:ring-primary'
                }`}
                placeholder="your@email.com"
              />
              {touched.email && errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                className={`w-full px-4 py-2.5 bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors resize-none ${
                  touched.message && errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-border focus:border-primary focus:ring-primary'
                }`}
                placeholder="Your message..."
              />
              {touched.message && errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {status === 'loading' ? 'Posting...' : 'Sign Guestbook'}
            </button>

            {status === 'success' && <p className="text-green-400 text-sm text-center">Thanks for signing! Your message is pending approval.</p>}
            {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
          </form>

          {/* Entries */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Recent Signatures</h4>
            {loading ? (
              <p className="text-muted-foreground">Loading entries...</p>
            ) : entries.length === 0 ? (
              <p className="text-muted-foreground">Be the first to sign!</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-3 bg-card border border-border rounded-lg">
                    <p className="font-medium text-foreground text-sm">{entry.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{new Date(entry.created_at).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">{entry.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
