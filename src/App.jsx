import { useCallback, useEffect, useRef, useState } from 'react';
import { invitation } from './data/siteContent.js';

function Calendar({ calendar }) {
  return (
    <div className="calendar" aria-label={calendar.month}>
      <p className="calendar__month">{calendar.month}</p>
      <div className="calendar__grid calendar__grid--days">
        {calendar.days.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar__grid">
        {calendar.dates.map((date) => (
          <span className={date === calendar.selected ? 'is-selected' : ''} key={date}>
            {date}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  const bride = invitation.couple[0];
  const groom = invitation.couple[1];
  const [activePage, setActivePage] = useState(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef(null);
  const pageCount = 6;

  const goToPage = useCallback((nextPage) => {
    const boundedPage = Math.max(0, Math.min(pageCount - 1, nextPage));

    setActivePage((currentPage) => {
      if (currentPage === boundedPage) {
        return currentPage;
      }

      isAnimatingRef.current = true;
      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, 850);

      return boundedPage;
    });
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();

      if (isAnimatingRef.current || Math.abs(event.deltaY) < 12) {
        return;
      }

      goToPage(activePage + (event.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (event) => {
      const nextKeys = ['ArrowDown', 'PageDown', 'Space', ' '];
      const previousKeys = ['ArrowUp', 'PageUp'];

      if (![...nextKeys, ...previousKeys].includes(event.code)) {
        return;
      }

      event.preventDefault();

      if (isAnimatingRef.current) {
        return;
      }

      goToPage(activePage + (nextKeys.includes(event.code) ? 1 : -1));
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
    };

    const handleTouchEnd = (event) => {
      if (touchStartYRef.current === null || isAnimatingRef.current) {
        return;
      }

      const deltaY = touchStartYRef.current - event.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) < 42) {
        return;
      }

      goToPage(activePage + (deltaY > 0 ? 1 : -1));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activePage, goToPage]);

  useEffect(() => {
    const hashPage = Number(window.location.hash.replace('#page-', ''));

    if (Number.isInteger(hashPage) && hashPage >= 1 && hashPage <= pageCount) {
      setActivePage(hashPage - 1);
    }
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#page-${activePage + 1}`);
  }, [activePage]);

  return (
    <main className="invite" style={{ '--active-page': activePage }}>
      <section
        className="screen screen--hero"
        id="page-1"
        aria-labelledby="hero-title"
        aria-hidden={activePage !== 0}
      >
        <div className="screen__inner screen__inner--hero">
          <p className="date">{invitation.date}</p>
          <p className="quote">{invitation.quote}</p>
          <h1 id="hero-title">
            <span>{bride}</span>
            <span className="ampersand">&</span>
            <span>{groom}</span>
          </h1>
        </div>
      </section>

      <section
        className="screen screen--floral"
        id="page-2"
        aria-labelledby="intro-title"
        aria-hidden={activePage !== 1}
      >
        <div className="screen__inner">
          <p className="script">{invitation.intro.label}</p>
          <h2 id="intro-title">{invitation.intro.title}</h2>
          <p className="lead">{invitation.intro.text}</p>
          <Calendar calendar={invitation.calendar} />
        </div>
      </section>

      <section
        className="screen screen--floral"
        id="page-3"
        aria-labelledby="location-title"
        aria-hidden={activePage !== 2}
      >
        <div className="screen__inner screen__inner--center">
          <img className="tent" src="/wedding/tent.webp" alt="" />
          <h2 id="location-title">{invitation.location.title}</h2>
          <p className="place">{invitation.location.place}</p>
          <p className="place place--sub">{invitation.location.hall}</p>
          <a className="button" href={invitation.location.mapUrl} target="_blank" rel="noreferrer">
            {invitation.location.mapText}
          </a>
        </div>
      </section>

      <section
        className="screen screen--floral"
        id="page-4"
        aria-labelledby="dress-title"
        aria-hidden={activePage !== 3}
      >
        <div className="screen__inner">
          <div className="two-column">
            <div>
              <h2 id="dress-title">{invitation.dressCode.title}</h2>
              <p className="lead lead--small">{invitation.dressCode.text}</p>
              <div className="palette" aria-label="Цветовая гамма торжества">
                {invitation.dressCode.colors.map((color) => (
                  <span style={{ backgroundColor: color }} key={color} />
                ))}
              </div>
            </div>

            <div className="program">
              <p className="section-label">{invitation.program.title}</p>
              {invitation.program.items.map(([time, event]) => (
                <div className="program__item" key={`${time}-${event}`}>
                  <time>{time}</time>
                  <span>{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="screen screen--floral"
        id="page-5"
        aria-labelledby="wishes-title"
        aria-hidden={activePage !== 4}
      >
        <div className="screen__inner">
          <div className="stack">
            <article className="text-block">
              <h2 id="wishes-title">{invitation.wishes.title}</h2>
              <p>{invitation.wishes.gifts}</p>
              <p>{invitation.wishes.flowers}</p>
            </article>

            <article className="text-block text-block--contact">
              <h2>{invitation.contacts.title}</h2>
              <p>{invitation.contacts.text}</p>
              <a href={invitation.contacts.phoneUrl}>{invitation.contacts.person}</a>
            </article>
          </div>
        </div>
      </section>

      <section
        className="screen screen--final"
        id="page-6"
        aria-labelledby="rsvp-title"
        aria-hidden={activePage !== 5}
      >
        <div className="screen__inner screen__inner--center">
          <img className="hands" src="/wedding/hands.webp" alt="" />
          <h2 id="rsvp-title">{invitation.rsvp.title}</h2>
          <p className="lead">{invitation.rsvp.text}</p>
          <button className="button button--filled" type="button">
            {invitation.rsvp.button}
          </button>
          <p className="sign">
            {invitation.rsvp.sign}
            <span>{invitation.rsvp.names}</span>
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
