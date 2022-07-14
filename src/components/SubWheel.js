const SubWheel = (props) => {
    const buildLines = (subs) => {
        return subs.map((line, index) => {
          return <li key={index}><span>{line.sub.join(' ')}</span><span>{line.time}</span></li>
        });
    };

    return (
        <div className="subWheel">
          <div className="preContextWrapper">
            <ul className="preContext">
              {buildLines(props.context.prev)}
            </ul>
          </div>
          <p className="quoteModal" onClick={props.onClick}>
            <span>{props.quote.join(' ')}</span>
            <span>— <i>{props.title} {props.timestamp}</i></span>
          </p>
          <div className="postContextWrapper">
            <ul className="postContext">
              {buildLines(props.context.post)}
            </ul>
          </div>

        </div>
    );
};

export { SubWheel };