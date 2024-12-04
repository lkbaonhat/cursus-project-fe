import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { CardBody, CardContainer } from "./CardContact";
import React from "react";

interface ICardFeedbackProps {
  item: MODEL.REVIEW;
}

export default function CardFeedback(props: (MODEL.IStyleProps & ICardFeedbackProps)) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      props.onWidthChange?.(width);
    }
  }, [props.width]);

  return (
    <CardContainer width={props.width} ref={ref}>
      <CardBody className="p-4">
        <div className="say-content">
          <p className="fs-6 text-start mt-0">
            "{props.item.comment}"
          </p>
        </div>
        <div className="d-flex align-items-center">
          <Avatar
            src={props.item.userId?.image || "https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-1.jpg"}
            width="50"
            height="50"
          />
          <h4 className="ms-3 mb-0 fs-6">{props.item.userId?.fullname}</h4>
        </div>
      </CardBody>
    </CardContainer>
  );
}
