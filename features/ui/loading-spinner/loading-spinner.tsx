import styled from "styled-components";

const Loader = styled.div`
  position: relative;
  width: 58px;
  height: 58px;
`;

const Background = styled.img`
  position: absolute;
  width: 58px;
`;

// Positioning using half pixels here is largely guesswork, i.e. not based on a mathemtical relationship. However, it renders well on Chrome, Edge, FF on both 2160p and 1080p displays.
const Line = styled.img`
  position: absolute;
  right: 0;
  width: 32.5px;
  transform-origin: 3.5px 29px;
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
    <Loader data-cy="spinner">
      <Background src="./icons/spinner-background.svg" />
      <Line src="/icons/spinner-line.svg" />
    </Loader>
  );
};
