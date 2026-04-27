export function AboutSection() {
  return (
    <section id="about" className="h-screen flex items-center justify-center px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-sm text-primary tracking-widest uppercase mb-3">
            About
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Sujit Gautam
          </h3>
        </div>

        <div className="space-y-5 text-muted-foreground leading-relaxed text-center">
          <p className="text-foreground">
            I am a Software Engineering student based in Nepal, currently in the learning phase 
            of my journey into the world of technology. I enjoy learning programming and exploring 
            how software can solve real-world problems.
          </p>
          <p>
            I am developing my skills step by step, focusing on understanding fundamentals 
            before moving forward. Every day brings new opportunities to learn something valuable, 
            and I am curious about building meaningful applications.
          </p>
          <p>
            Whether it's exploring new frameworks, solving coding challenges, or collaborating with 
            others, I'm always eager to grow and contribute to innovative projects.
          </p>
        </div>
      </div>
    </section>
  )
}
