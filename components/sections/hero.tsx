import Link from "next/link"
import Image from "next/image"
import { TypingAnimation } from "../typing-animation"

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center px-3 md:px-6 py-8 relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          {/* Profile Photo */}
          <div className="relative group mb-2 md:mb-4">
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl group-hover:shadow-primary/30 group-hover:border-primary/60 transition-all duration-500">
              <Image
                src="/images/profile.jpg"
                alt="Sujit Gautam"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 160px, 224px"
              />
            </div>
          </div>

          {/* Greeting */}
          <div className="space-y-2">
            <p className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase">Welcome!</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight break-words">
              Sujit Gautam
            </h1>
          </div>

          {/* Typing Animation */}
          <div className="h-10 md:h-14">
            <p className="text-xl md:text-3xl font-semibold text-primary">
              <TypingAnimation 
                text="Dream. Code. Achieve" 
                speed={80}
                delay={500}
              />
            </p>
          </div>

          {/* Bio */}
          <div className="max-w-2xl space-y-3 text-muted-foreground">
            <p className="text-sm md:text-base leading-relaxed">
              I'm an 18 years old <span className="text-foreground font-semibold">Software Engineering student</span> from Nepal, learning programming & web technologies.
            </p>
            
            <p className="text-xs md:text-sm text-muted-foreground/80">
              Student • Learner • Explorer
            </p>
          </div>

          {/* Scroll Down Arrow */}
          <div className="pt-6 md:pt-8">
            <Link
              href="#about"
              className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-primary text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110 group relative"
              aria-label="Scroll to About section"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/40 to-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <svg 
                className="w-6 h-6 md:w-7 md:h-7 relative z-10 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
