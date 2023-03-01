import { Accordion } from "react-bootstrap";
const OrgariumAcc = ({ event, active, onClick, title }) => {
  return (
    <div className="card mb-20">
      <div className="card-header">
        <Accordion.Toggle
          as="a"
          eventKey={event}
          className="c-pointer"
          aria-expanded={active === event ? "true" : "false"}
          onClick={() => onClick()}
        >
          {title}
        </Accordion.Toggle>
      </div>
      <Accordion.Collapse eventKey={event}>
        <div className="card-body">
          <p>
            Sed ut perspicia unde omnis natus voluptatem accusane tium
            doloremque laudantium totam rem aperiam eaquuaec abillo inventore
            veritatis quasi architecto beatae
          </p>
        </div>
      </Accordion.Collapse>
    </div>
  );
};
export default OrgariumAcc;
