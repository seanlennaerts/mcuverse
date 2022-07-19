import React, { useState } from "react";
import Modal from "./Modal";
import { SubWheel, ShareBar } from ".";

import "../styles/Quote.scss";

const generateUrl = (movieId, subIndex) => {
  const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}`;
  if (movieId && subIndex) {
    return `${baseUrl}?movie=${movieId}&quoteIndex=${subIndex}`;
  } else {
    return baseUrl;
  }
};

const buildContext = (movie, index) => {
  const start = index - 10 >= 0 ? index - 10 : 0;
  const end = index + 10 >= movie.subs.length ? movie.subs.length : index + 10;

  return {
    prev: movie.subs.slice(start, index),
    post: movie.subs.slice(index + 1, end + 1)
  };
};

const Quote = ({ subIndex, search, movie, handle, startingShowModal }) => {
  const [showModal, setShowModal] = useState(startingShowModal);
  const handleEsc = (e) => {
    if (e.key === "Escape" && showModal) {
      setShowModal(!showModal);
    }
  };
  const handleClickModal = () => {
    if (!showModal) {
      window.history.pushState({}, "", generateUrl(movie.id, subIndex));
    } else {
      window.history.pushState({}, "", generateUrl(null, null));
    }
    setShowModal(!showModal);
  };
  const sub = movie.subs[subIndex];
  let jSub = sub.sub.join(" ");
  let strIndex = jSub.toLowerCase().indexOf(search.toLowerCase());
  const handleClickShare = (purpose) => {
    const buildCopyTextFor = (purpose) => {
      switch (purpose) {
        case "reddit":
          return `${jSub} [(*${movie.title} ${sub.time}*)](${generateUrl(movie.id, subIndex)})`;
        default:
          return `${jSub} (${movie.title} ${sub.time})`;
      }
    };
    navigator.clipboard.writeText(buildCopyTextFor(purpose));
    handle(true);
    setTimeout(() => {
      handle(false);
    }, 1500);
    setShowModal(false);
  };

  return (
    <div className="sub" onClick={handleClickModal} onKeyPress={handleEsc}>
      <p>
        {jSub.substring(0, strIndex)}
        <span className="highlight">{jSub.substring(strIndex, strIndex + search.length)}</span>
        {jSub.substring(strIndex + search.length)}
        &nbsp;(
        <i>
          {movie.title} {sub.time}
        </i>
        )
      </p>
      <Modal show={showModal} onClose={handleClickModal}>
        <SubWheel
          title={movie.title}
          context={buildContext(movie, subIndex)}
          timestamp={sub.time}
          quote={jSub}
          onClick={handleClickShare}
        />
        <ShareBar handleClick={handleClickShare} />
      </Modal>
    </div>
  );
};

export { Quote };
