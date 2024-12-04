import React from "react";
import styled from "styled-components";
import { style } from "@/theme/index";

const AboutContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  p {
    color: ${style.colors.gray.text};
    font-size: 14px;
  }
`;

export default function About() {
  return (
    <AboutContainer>
      <h3>About me</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        scelerisque nibh sed ligula blandit, quis faucibus lorem pellentesque.
        Suspendisse pulvinar dictum pellentesque. Vestibulum at sagittis lectus,
        sit amet aliquam turpis. In quis elit tempus, semper justo vitae,
        lacinia massa. Etiam sagittis quam quis fermentum lacinia. Curabitur
        blandit sapien et risus congue viverra. Mauris auctor risus sit amet
        cursus sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nulla feugiat sodales massa, in viverra dolor condimentum ut. In
        imperdiet, justo nec volutpat blandit, tellus justo tempor quam, sed
        pretium nibh nunc nec mauris. Mauris vel malesuada magna. Quisque
        iaculis molestie purus, non luctus mauris porta id. Maecenas imperdiet
        tincidunt mauris vestibulum vulputate. Aenean sollicitudin pretium nibh,
        et sagittis risus tincidunt ac. Phasellus scelerisque rhoncus massa, ac
        euismod massa pharetra non. Phasellus dignissim, urna in iaculis varius,
        turpis libero mollis velit, sit amet euismod arcu mi ac nibh. Praesent
        tincidunt eros at ligula pellentesque elementum. Fusce condimentum enim
        a tellus egestas, sit amet rutrum elit gravida. Pellentesque in porta
        sapien. Fusce tristique maximus ipsum et mollis. Sed at massa ac est
        dapibus vulputate at eu nibh.
      </p>
    </AboutContainer>
  );
}
