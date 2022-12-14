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

const Icon = styled.svg`
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

// Visible to screen readers only
const AccessibleLabel = styled.span`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

export const Spinner = () => {
  return (
    <Container>
      <div data-cy="spinner" role="status">
        <AccessibleLabel className="sr-only">Loading...</AccessibleLabel>
        <Icon
          width="67"
          height="66"
          viewBox="0 0 67 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M62.5 33C62.5 36.8083 61.7499 40.5794 60.2925 44.0978C58.8351 47.6163 56.699 50.8132 54.0061 53.5061C51.3132 56.199 48.1163 58.3351 44.5978 59.7925C41.0794 61.2499 37.3083 62 33.5 62C29.6917 62 25.9206 61.2499 22.4022 59.7925C18.8837 58.3351 15.6868 56.199 12.9939 53.5061C10.301 50.8132 8.16488 47.6163 6.70749 44.0978C5.2501 40.5794 4.5 36.8083 4.5 33C4.5 29.1917 5.25011 25.4206 6.7075 21.9022C8.16489 18.3837 10.301 15.1868 12.9939 12.4939C15.6868 9.801 18.8837 7.66487 22.4022 6.20749C25.9206 4.7501 29.6917 4 33.5 4C37.3083 4 41.0794 4.75011 44.5978 6.2075C48.1163 7.66489 51.3132 9.80101 54.0061 12.4939C56.699 15.1868 58.8351 18.3838 60.2925 21.9022C61.7499 25.4206 62.5 29.1917 62.5 33L62.5 33Z"
            stroke="#F9F5FF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M33.5 4C37.3083 4 41.0794 4.75011 44.5978 6.20749C48.1163 7.66488 51.3132 9.80101 54.0061 12.4939C56.699 15.1868 58.8351 18.3837 60.2925 21.9022C61.7499 25.4206 62.5 29.1917 62.5 33"
            stroke="#7F56D9"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      </div>
    </Container>
  );
};
