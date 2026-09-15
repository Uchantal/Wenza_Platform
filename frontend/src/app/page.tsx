export default function HomePage() {
  return (
    <main>
      <header><a href="/" aria-label="Wenza home">wenza<span>.</span></a><span>Starting in Kenya</span></header>
      <section className="hero">
        <p className="eyebrow">THE CREATOR BUSINESS NETWORK</p>
        <h1>Your creativity.<br />New possibilities.</h1>
        <p className="intro">A professional home for African creators to showcase their work and connect with verified brands and institutions.</p>
        <p className="status">In development · Our first creator community is taking shape.</p>
      </section>
      <section className="pillars" aria-label="What Wenza is building">
        <article><span>01 / IDENTITY</span><h2>Let your work speak.</h2><p>A professional profile bringing your portfolio and verified social presence together.</p></article>
        <article><span>02 / OPPORTUNITY</span><h2>Find the right fit.</h2><p>Discover collaborations with organizations that value your creativity and audience.</p></article>
        <article><span>03 / BUSINESS</span><h2>Build with confidence.</h2><p>Clear briefs, structured collaborations and transparent earnings records.</p></article>
      </section>
      <footer>Wenza · Built around African creativity.</footer>
    </main>
  );
}
