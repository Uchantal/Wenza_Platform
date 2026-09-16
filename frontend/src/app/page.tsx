import Nav from './nav';

function CreatorPreview() {
  return (
    <div className="creator-preview" role="img" aria-label="Wenza creator tools: storefront, brand deals, target views, payments, and digital products">
      {/* Display only the hero artwork from the supplied reference, without its browser or laptop frame. */}
      <div className="creator-artwork" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <Nav />
      <section className="hero" id="about" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">One trusted platform for everyone</p>
          <h1 id="hero-title">The Goldmine<br />For <span>Creators</span></h1>
          <div className="audience-list"><a href="#creators">01 / Creators</a><a href="#brands">02 / Brands</a><span>03 / Communities</span></div>
          <p className="intro">Creators, Brands, and Their Communities,<br className="desktop-break" /> Together on One Trusted Platform.</p>
          <div className="hero-actions"><a className="button button-primary" href="/register">Join network <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="#creators">Find creators</a></div>
        </div>
        <CreatorPreview />
      </section>
      <section className="pillars" aria-label="What Wenza is building">
        <article id="creators"><span>01 / CREATORS</span><h2>Let your work speak.</h2><p>A professional profile bringing your portfolio and verified social presence together.</p></article>
        <article id="brands"><span>02 / BRANDS</span><h2>Build with confidence.</h2><p>Connect with creators through clear briefs, structured collaborations and transparent earnings records.</p></article>
        <article id="opportunities"><span>03 / OPPORTUNITIES</span><h2>Find the right fit.</h2><p>Discover collaborations with organizations that value your creativity and audience.</p></article>
      </section>
      <footer><span>wenza · Built around African creativity.</span><span>In development · Our first creator community is taking shape.</span></footer>
    </main>
  );
}
