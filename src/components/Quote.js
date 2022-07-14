import React, { useState } from 'react';
import Modal from './Modal';
import { SubWheel, ShareBar } from '.';

import '../styles/Quote.scss';

const generateUrl = (movieId, subIndex) => {
    const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}`;
    if (movieId && subIndex) {
        return `${baseUrl}?movie=${movieId}&quoteIndex=${subIndex}`;
    } else {
        return baseUrl;
    }
};


const Quote = ({key, context, sub, subIndex, search, title, movieId, time, handle, startingShowModal}) => {
    const [showModal, setShowModal] = useState(startingShowModal);
    const handleEsc = (e) => {
        if (e.key === "Escape" && showModal) {
            setShowModal(!showModal);
        }
    };
    const handleClickModal = () => {
        if (!showModal) {
            window.history.pushState({}, '', generateUrl(movieId, subIndex));
        } else {
            window.history.pushState({}, '', generateUrl(null, null));
        }
        setShowModal(!showModal);
    };
    let jSub = sub.join(' ');
    let strIndex = jSub.toLowerCase().indexOf(search.toLowerCase());
    const handleClickShare = (purpose) => {
        const buildCopyTextFor = (purpose) => {
          switch(purpose) {
            case "reddit":
              return `${jSub} [(*${title} ${time}*)](${generateUrl(movieId, subIndex)})`;
            default:
              return `${jSub} (${title} ${time})`;
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
      <div className="sub"
        onClick={handleClickModal}
        onKeyPress={handleEsc}>
        <p>
          {jSub.substring(0, strIndex)}
          <span className="highlight">{jSub.substring(strIndex, strIndex + search.length)}</span>
          {jSub.substring(strIndex + search.length)}
          &nbsp;(<i>{title} {time}</i>)
        </p>
        <Modal show={showModal} onClose={handleClickModal}>
          <SubWheel
            title={title}
            context={context}
            timestamp={time}
            quote={sub}
            onClick={handleClickShare}
          />
          <ShareBar handleClick={handleClickShare} />
        </Modal>

      </div>
    );
};

export { Quote };
