import { siteContent } from './data/siteContent.js';

function App() {
  const { hero, sections, checklist } = siteContent;

  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero__content">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="page-title">{hero.title}</h1>
          <p className="hero__text">{hero.description}</p>
          <div className="hero__actions" aria-label="Основные действия">
            <a className="button button--primary" href="#content">
              Смотреть структуру
            </a>
            <a className="button button--secondary" href="#next">
              Что дальше
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="content" aria-labelledby="content-title">
        <div className="section__header">
          <p className="eyebrow">Основа проекта</p>
          <h2 id="content-title">Каркас готов к наполнению</h2>
        </div>

        <div className="grid">
          {sections.map((section) => (
            <article className="card" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted" id="next" aria-labelledby="next-title">
        <div className="section__header">
          <p className="eyebrow">Следующий шаг</p>
          <h2 id="next-title">Когда будет идея сайта</h2>
        </div>

        <ul className="checklist">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
