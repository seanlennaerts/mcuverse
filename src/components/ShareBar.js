import "../styles/Quote.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faReddit } from "@fortawesome/free-brands-svg-icons";

const ShareBar = ({ handleClick }) => {
  return (
    <div className={"shareBar"}>
      <div className={"shareButton"} onClick={() => handleClick()} title="copy to clipboard">
        <FontAwesomeIcon icon={faCopy} size="2x" />
      </div>
      <div
        className={"shareButton"}
        onClick={() => handleClick("reddit")}
        title="copy with reddit markdown"
      >
        <FontAwesomeIcon icon={faReddit} size="2x" />
      </div>
    </div>
  );
};

export { ShareBar };
