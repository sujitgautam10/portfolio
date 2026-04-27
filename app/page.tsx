import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { AcademicSection } from "@/components/sections/academic"
import { SkillsSection } from "@/components/sections/skills"
import { ProjectsSection } from "@/components/sections/projects"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AcademicSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sujit Gautam",
            "jobTitle": "Software Engineering Student",
            "description": "Software Engineering student from Nepal showcasing academic background, programming skills, and a growing journey in technology.",
            "url": "https://sujit-gautam.com.np",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Nepal"
            },
            "sameAs": [
              "https://github.com/sujitgautam",
              "https://linkedin.com/in/sujitgautam"
            ],
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "PCPS College"
              },
              {
                "@type": "EducationalOrganization",
                "name": "Mohanmaya Secondary School"
              }
            ],
            "knowsAbout": ["Java", "Python", "SQL", "HTML", "CSS", "JavaScript", "Git", "GitHub"]
          })
        }}
      />
    </>
  )
}
