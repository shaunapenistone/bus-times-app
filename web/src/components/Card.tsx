import { BusType } from "../lib/types";

const Card: React.FC<BusType> = (props): React.ReactElement => {
  return (
    <div className="Card" key={props.id}>
      <div className="Card__Header">
        <b>{props.busId}</b>
      </div>
      <div className="Card__Details">
        <div>To {props.destination}</div>
        <div>
          {props.minutesUntilArrival <= 1
            ? "Due"
            : props.minutesUntilArrival + " mins"}
        </div>
      </div>
    </div>
  );
};

export default Card;
