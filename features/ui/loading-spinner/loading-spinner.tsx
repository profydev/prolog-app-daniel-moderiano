import styled from "styled-components";

const Loader = styled.div`
  /* The bulk of the spinner 'body' that rotates */
  width: 300px;
  height: 300px;
  border: 30px solid grey;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
  position: relative;

  /* Essentially two rounded 'caps' on either end of the spinner body */
  &:before,
  &:after {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ff3d00;
    position: absolute;
  }

  /* Position at one end of the spinner body */
  &:before {
    bottom: 11px;
    left: 8px;
  }

  /* Position at the other end of the spinner body */
  &:after {
    bottom: 11px;
    right: 8px;
  }

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
  return <Loader data-cy="spinner"></Loader>;
};
