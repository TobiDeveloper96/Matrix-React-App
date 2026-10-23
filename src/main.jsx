import React, { Component, createRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const glyphs = "アカサタナハマヤラワ012345789:・.+=*";

const castMembers = [
  {
    name: "Keanu Reeves",
    role: "Neo / Thomas Anderson",
    detail:
      "A programmer and hacker who discovers the truth behind his reality.",
  },
  {
    name: "Laurence Fishburne",
    role: "Morpheus",
    detail: "A leader who believes Neo may be the one to change everything.",
  },
  {
    name: "Carrie-Anne Moss",
    role: "Trinity",
    detail: "A skilled operative who helps guide Neo into the real world.",
  },
  {
    name: "Hugo Weaving",
    role: "Agent Smith",
    detail: "A formidable program tasked with protecting the simulation.",
  },
  {
    name: "Joe Pantoliano",
    role: "Cypher",
    detail: "A member of Morpheus’s crew with a complicated allegiance.",
  },
  {
    name: "Gloria Foster",
    role: "The Oracle",
    detail: "A mysterious guide whose words help shape Neo’s choices.",
  },
];

class MatrixRain extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.columns = [];
    this.animationFrame = null;
    this.width = 0;
    this.height = 0;
    this.fontSize = 16;
    this.resize = this.resize.bind(this);
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.resize();
    this.draw();
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
    window.removeEventListener("resize", this.resize);
  }

  resize() {
    const canvas = this.canvasRef.current;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width * ratio;
    canvas.height = this.height * ratio;
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;

    const context = canvas.getContext("2d");
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.columns = Array.from(
      { length: Math.ceil(this.width / this.fontSize) },
      () => Math.random() * (this.height / this.fontSize),
    );
  }

  draw() {
    const context = this.canvasRef.current.getContext("2d");
    context.fillStyle = "rgba(3, 8, 5, 0.08)";
    context.fillRect(0, 0, this.width, this.height);
    context.font = `${this.fontSize}px monospace`;

    this.columns.forEach((y, index) => {
      const character = glyphs[Math.floor(Math.random() * glyphs.length)];
      context.fillStyle = Math.random() > 0.975 ? "#d8ffe0" : "#16b84a";
      context.fillText(character, index * this.fontSize, y * this.fontSize);
      if (y * this.fontSize > this.height && Math.random() > 0.975) {
        this.columns[index] = 0;
      } else {
        this.columns[index] += 0.42;
      }
    });

    this.animationFrame = window.requestAnimationFrame(this.draw);
  }

  render() {
    return (
      <canvas className="matrix-rain" ref={this.canvasRef} aria-hidden="true" />
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    const page = window.location.hash.slice(1) || "home";
    this.state = {
      connected: false,
      page: ["home", "film", "cast"].includes(page) ? page : "home",
    };
    this.handleHashChange = this.handleHashChange.bind(this);
    this.handleConnectionToggle = this.handleConnectionToggle.bind(this);
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.handleHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.handleHashChange);
  }

  handleHashChange() {
    const page = window.location.hash.slice(1) || "home";
    this.setState({
      page: ["home", "film", "cast"].includes(page) ? page : "home",
    });
  }

  handleConnectionToggle() {
    this.setState((previousState) => ({
      connected: !previousState.connected,
    }));
  }

  renderHomePage() {
    const { connected } = this.state;

    return (
      <>
        <section className="hero" id="home">
          <p className="eyebrow">
            <span className="eyebrow-line" />A SIGNAL IN THE NOISE
          </p>
          <h1>
            Wake up<span className="green-period">.</span>
            <br />
            <span className="title-outline">See what is</span>
            <br />
            <span className="title-green">real.</span>
          </h1>
          <p className="hero-copy">
            The world you know is only the beginning.
            <br className="desktop-break" />
            There’s a signal waiting for you on the other side.
          </p>
          <button
            className={`connect-button${connected ? " is-connected" : ""}`}
            onClick={this.handleConnectionToggle}
            type="button"
          >
            <span>
              {connected ? "CONNECTION ACTIVE" : "FOLLOW THE WHITE RABBIT"}
            </span>
            <span className="button-arrow" aria-hidden="true">
              {connected ? "✓" : "↗"}
            </span>
          </button>
          <p className="hint">
            <span className="hint-cursor" />
            {connected
              ? "Welcome to the real world, Neo."
              : "The choice is yours. The signal is real."}
          </p>
        </section>

        <aside className="coordinates" aria-hidden="true">
          <span>36° 08′ 11.6″ N</span>
          <span>DATA STREAM // 01</span>
        </aside>
      </>
    );
  }

  renderFilmPage() {
    return (
      <section className="info-page">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          FILE // 001 — FEATURE FILM
        </p>
        <h1 className="page-title">
          The <span className="title-green">film.</span>
        </h1>
        <p className="page-intro">
          A computer programmer discovers that reality is not what it seems—and
          that the truth may be more extraordinary than any illusion.
        </p>
        <section className="film-layout" aria-label="Film overview">
          <article className="film-copy">
            <h2>Choose your reality.</h2>
            <p>
              Released in 1999, <em>The Matrix</em> follows Thomas Anderson, a
              hacker known as Neo, as he is drawn into a hidden conflict between
              humanity and intelligent machines. Guided by Morpheus and Trinity,
              Neo begins to question the simulated world he has always known.
            </p>
            <p>
              Blending science fiction, action, and philosophical questions, the
              film became known for its distinctive visual style and imaginative
              approach to action filmmaking.
            </p>
          </article>
          <aside className="fact-panel" aria-label="Film details">
            <p className="fact-row">
              <span>RELEASE</span>
              <strong>1999</strong>
            </p>
            <p className="fact-row">
              <span>DIRECTED BY</span>
              <strong>Lana &amp; Lilly Wachowski</strong>
            </p>
            <p className="fact-row">
              <span>GENRE</span>
              <strong>Science fiction · Action</strong>
            </p>
            <p className="fact-row">
              <span>RUN TIME</span>
              <strong>136 minutes</strong>
            </p>
            <p className="fact-row">
              <span>KNOWN FOR</span>
              <strong>“Bullet time” cinematography</strong>
            </p>
          </aside>
        </section>
        <a className="text-link" href="#cast">
          MEET THE CREW <span aria-hidden="true">↗</span>
        </a>
      </section>
    );
  }

  renderCastPage() {
    return (
      <section className="info-page cast-page">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          FILE // 002 — PERSONNEL
        </p>
        <h1 className="page-title">
          The <span className="title-green">cast.</span>
        </h1>
        <p className="page-intro">
          Meet the people who brought the world of The Matrix to life.
        </p>
        <section className="cast-grid" aria-label="Cast members">
          {castMembers.map((person, index) => (
            <article className="cast-card" key={person.name}>
              <header className="cast-card-top">
                <span>PERSONNEL RECORD</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </header>
              <h2>{person.name}</h2>
              <p className="cast-role">{person.role}</p>
              <p className="cast-detail">{person.detail}</p>
            </article>
          ))}
        </section>
      </section>
    );
  }

  renderPage() {
    const { page } = this.state;

    if (page === "film") {
      return this.renderFilmPage();
    }

    if (page === "cast") {
      return this.renderCastPage();
    }

    return this.renderHomePage();
  }

  render() {
    const { connected, page } = this.state;
    const pageLabels = [
      { slug: "home", label: "HOME" },
      { slug: "film", label: "THE FILM" },
      { slug: "cast", label: "THE CAST" },
    ];

    return (
      <main className="page-shell">
        <MatrixRain />
        <span className="screen-vignette" aria-hidden="true" />

        <header className="topbar">
          <a className="wordmark" href="#home" aria-label="The Matrix home">
            <span className="wordmark-mark">M</span>
            <span>THE MATRIX</span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            {pageLabels.map((item) => (
              <a
                aria-current={page === item.slug ? "page" : undefined}
                className={page === item.slug ? "active" : ""}
                href={`#${item.slug}`}
                key={item.slug}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="system-status" role="status">
            <span className="status-dot" />
            {connected ? "CONNECTION ESTABLISHED" : "SYSTEM ONLINE"}
          </p>
        </header>

        {this.renderPage()}

        <footer className="footer">
          <span>@by TobiDev</span>
          <span className="footer-center">WAKE · QUESTION · ESCAPE</span>
          <span>EST. 1999</span>
        </footer>
      </main>
    );
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
