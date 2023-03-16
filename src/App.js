import styled from "styled-components";
import StageZero from "./components/stages/StageZero";
import "./reset.css";

export default function App() {
  return (
    <AppWrapper>
      <StageZero />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  height: 100vh;
`;
