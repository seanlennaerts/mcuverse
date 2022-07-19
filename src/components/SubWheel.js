const SubWheel = (props) => {
  const Lines = ({subs}) => {
    return subs.map((line, index) => {
      return (
        <li key={index}>
          <span>{line.sub.join(" ")}</span>
          <span>{line.time}</span>
        </li>
      );
    });
  };

  return (
    <div className="subWheel">
      <div className="preContextWrapper">
        <ul className="preContext"><Lines subs={props.context.prev}/></ul>
      </div>
      <p className="quoteModal" onClick={props.onClick}>
        <span>{props.quote}</span>
        <span>
          —{" "}
          <i>
            {props.title} {props.timestamp}
          </i>
        </span>
      </p>
      <div className="postContextWrapper">
        <ul className="postContext"><Lines subs={props.context.prev}/></ul>
      </div>
    </div>
  );
};

export { SubWheel };
