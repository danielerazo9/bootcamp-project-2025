export default function Resume() {
  return (
    <main style={{ width: "80%", margin: "24px auto", lineHeight: "1.6" }}>
      <h1>Resume</h1>

      <section>
        <h2>Education</h2>
        <div>
          <h3>Bachelor of Science in Computer Engineering</h3>
          <p>
            <em>
              California Polytechnic State University, San Luis Obispo | Expected Graduation May 2029
            </em>
          </p>
        </div>
      </section>

      <section>
        <h2>Coursework</h2>
        <ul>
          <li>Computing in Python</li>
          <li>Microcontroller Programming</li>
          <li>Network Security</li>
        </ul>
      </section>

      <section>
        <h2>Experience</h2>
        <div>
          <h3>Software Engineer Intern and Scrum Master</h3>
          <p>
            <em>Global Education Development LLC | September 2024 – June 2025</em>
          </p>
          <ul>
            <li>
              Developed a Flutter/Dart learning app for children with nonverbal autism, integrating text-to-speech and sensory-friendly features to support reading and writing education.
            </li>
            <li>
              Collaborated with the founder and design team to align app functionality with classroom use, improving accessibility and engagement by 25%.
            </li>
            <li>
              Managed sprint progress through GitHub, tracking milestones and reviewing pull requests to maintain consistent release cycles.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Projects</h2>
        <div>
          <h3>Personal Website</h3>
          <p>
            <em>Hack4Impact</em>
          </p>
          <p>Designed a website about me using HTML and CSS.</p>
        </div>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          <li>HTML</li>
          <li>Python</li>
          <li>Dart</li>
          <li>CSS</li>
        </ul>
      </section>

      <p>
        <a href="/pdfs/Resume.zip" download>
          Download Resume
        </a>
      </p>
    </main>
  );
}

