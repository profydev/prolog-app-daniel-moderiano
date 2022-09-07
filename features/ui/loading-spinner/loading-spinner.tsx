import { breakpoint, space } from "@styles/theme";
import styled from "styled-components";

const Container = styled.div`
  height: 300px;
  margin-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoint("desktop")}) {
    /* Offset the margin-bottom of the PageContainer Info component */
    margin-top: -${space(6)};
  }
`;

const Loader = styled.div`
  position: relative;
  width: 66px;
  height: 66px;
`;

const Background = styled.img`
  position: absolute;
`;

const Line = styled.img`
  position: absolute;
  right: 0;
  /* x-offset + y-offset = Line width, where y-offset = (0.5 * Background width) */
  transform-origin: 4px 33px;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => {
  return (
    <Container>
      <Loader data-cy="spinner">
        <Background src="./icons/spinner-background.svg" />
        <Line src="/icons/spinner-line.svg" />
      </Loader>
    </Container>
  );
};
