import Image from 'next/image'
import { AcademicButton } from '@/components/academic-button'

export function AcademicSection() {
  return (
    <section id="academic" className="min-h-screen flex items-center justify-center px-4 md:px-6 py-12 md:py-20">
      <div className="w-full max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs md:text-sm text-primary tracking-widest uppercase mb-2 md:mb-3">
            Education
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground break-words">
            Academic Background
          </h2>
        </div>

        {/* Education Cards - Mobile optimized */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-5">
          {/* Currently Pursuing Card */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            {/* Status & Time */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full flex-shrink-0">
                Currently Pursuing
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                2025 - Present
              </span>
            </div>
            
            {/* Institution Info */}
            <div className="flex gap-3 md:gap-4 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-white rounded-lg flex items-center justify-center border border-border overflow-hidden">
                <Image 
                  src="/images/pcps.webp" 
                  alt="PCPS College Logo" 
                  width={48} 
                  height={48}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-base font-semibold text-foreground leading-snug break-words">
                  BSc (Hons) Software Engineering
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5 break-words">
                  Patan College for Professional Studies
                </p>
                <p className="text-xs text-muted-foreground/70 break-words">
                  Kupandole, Lalitpur, Nepal
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Highlights</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded whitespace-nowrap">
                  <CheckIcon />
                  Practical Knowledge
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded whitespace-nowrap">
                  <CheckIcon />
                  Skill Development
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded whitespace-nowrap">
                  <CheckIcon />
                  Global Recognition
                </span>
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            {/* Status & Time */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded-full flex-shrink-0">
                Completed
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                2023 - 2025
              </span>
            </div>
            
            {/* Institution Info */}
            <div className="flex gap-3 md:gap-4 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-white rounded-lg flex items-center justify-center border border-border overflow-hidden">
                <Image 
                  src="/images/mohanmaya.webp" 
                  alt="Mohanmaya Secondary School Logo" 
                  width={48} 
                  height={48}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-base font-semibold text-foreground leading-snug break-words">
                  +2 Management
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5 break-words">
                  Mohanmaya Secondary School
                </p>
                <p className="text-xs text-muted-foreground/70 break-words">
                  Birtamode, Jhapa, Nepal
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Highlights</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded whitespace-nowrap">
                  <CheckIcon />
                  Academic Excellence
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded whitespace-nowrap">
                  <CheckIcon />
                  Character Development
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded whitespace-nowrap">
                  <CheckIcon />
                  Discipline & Learning
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 md:mt-12 text-center">
          <AcademicButton />
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg className="w-3 h-3 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}
