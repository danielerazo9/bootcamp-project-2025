import Image from "next/image";

export default function About() {
  return (
    <main style={{ width: "80%", margin: "24px auto", lineHeight: "1.6" }}>
      <h1>About Me</h1>
        <div>
          <p>
            Hello! My name is <strong>Daniel Erazo</strong> and I am a first-year{" "}
            <em>Computer Engineering</em> major at Cal Poly San Luis Obispo.
          </p>
          <p>
            I’m from Modesto, CA. I love the outdoors, trying new sports, and watching different
            shows. My favorite show of all time is <strong>One Piece</strong>, but I also really
            like <em>Dexter</em>. I hope to come up with cool projects in the future with{" "}
            <strong>Hack4Impact!</strong>
          </p>
        </div>
    </main>
  );
}

