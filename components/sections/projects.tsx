'use client'

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-3 md:px-6 py-8 md:py-12 bg-secondary/30">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xs md:text-sm text-primary tracking-widest uppercase mb-1 md:mb-2">
            Work
          </h2>
          <h3 className="text-xl md:text-3xl font-bold text-foreground break-words">
            Projects
          </h3>
        </div>

        {/* Learning in Progress Card - Compact */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-secondary/50 border border-border rounded-lg p-4 md:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          {/* Abstract Tech Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Code Icon - Compact */}
            <div className="mb-3 md:mb-4 flex justify-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>

            {/* Title and Description - Compact */}
            <div className="text-center mb-3 md:mb-4">
              <h4 className="text-sm md:text-xl font-bold text-foreground mb-1 break-words">
                Work in Progress
              </h4>
              <p className="text-muted-foreground text-xs md:text-sm leading-snug break-words">
                Working on my first project to develop skills and explore new technologies.
              </p>
            </div>

            {/* Development Phases - Compact */}
            <div className="space-y-2 pt-3 md:pt-4 border-t border-border/50">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/30 border border-primary flex items-center justify-center mt-0.5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-foreground leading-snug break-words">Current Phase</p>
                  <p className="text-xs text-muted-foreground">Planning & Design</p>
                </div>
              </div>

              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-secondary border border-border/50 flex items-center justify-center mt-0.5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-muted-foreground/30"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-foreground/70 leading-snug break-words">Next</p>
                  <p className="text-xs text-muted-foreground">Frontend Development</p>
                </div>
              </div>

              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-secondary border border-border/50 flex items-center justify-center mt-0.5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-muted-foreground/30"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-foreground/70 leading-snug break-words">Then</p>
                  <p className="text-xs text-muted-foreground">Backend Integration</p>
                </div>
              </div>

              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-secondary border border-border/50 flex items-center justify-center mt-0.5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-muted-foreground/30"></div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-foreground/70 leading-snug break-words">Finally</p>
                  <p className="text-xs text-muted-foreground">Testing & Deployment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
