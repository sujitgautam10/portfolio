import { 
  JavaIcon, 
  PythonIcon, 
  SqlIcon, 
  HtmlIcon, 
  CssIcon, 
  JavaScriptIcon, 
  GitIcon, 
  GithubIcon, 
  VsCodeIcon 
} from "@/components/icons/tech-icons"

type SkillLevel = "Basic" | "Intermediate" | "Work in Progress"

interface Skill {
  name: string
  level: SkillLevel
  icon: React.ReactNode
  color: string
  useThemeColor?: boolean
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    skills: [
      { name: "Java", level: "Basic", icon: <JavaIcon />, color: "#007396" },
      { name: "Python", level: "Basic", icon: <PythonIcon />, color: "#3776ab" },
      { name: "SQL", level: "Basic", icon: <SqlIcon />, color: "#336791" },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "HTML", level: "Intermediate", icon: <HtmlIcon />, color: "#e34c26" },
      { name: "CSS", level: "Intermediate", icon: <CssIcon />, color: "#563d7c" },
      { name: "JavaScript", level: "Basic", icon: <JavaScriptIcon />, color: "#f7df1e" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: "Basic", icon: <GitIcon />, color: "#f1502f" },
      { name: "GitHub", level: "Basic", icon: <GithubIcon />, color: "#181717", useThemeColor: true },
      { name: "VS Code", level: "Intermediate", icon: <VsCodeIcon />, color: "#007acc" },
    ],
  },
]

const levelColors: Record<SkillLevel, string> = {
  Basic: "bg-primary/15 text-primary border border-primary/30",
  Intermediate: "bg-accent/15 text-accent border border-accent/30",
  "Work in Progress": "bg-primary/20 text-primary border border-primary/40",
}

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xs md:text-sm text-primary tracking-widest uppercase mb-2 md:mb-3">
            Tech Stack
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground break-words">
            Technologies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-card border border-border rounded-lg p-4 md:p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <h4 className="text-sm md:text-base font-semibold text-primary mb-4 md:mb-5 text-center break-words">
                {category.title}
              </h4>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center gap-3 p-3 rounded-md transition-all hover:bg-primary/5 border border-transparent hover:border-primary/30"
                  >
                    <div 
                      className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-all duration-300 flex-shrink-0"
                      style={{ color: skill.useThemeColor ? "currentColor" : skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 min-w-0">
                      <p className="font-medium text-foreground text-xs md:text-sm truncate group-hover:text-primary transition-colors">
                        {skill.name}
                      </p>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${levelColors[skill.level]}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
