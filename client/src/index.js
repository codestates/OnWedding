import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styled from "styled-components";
import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://localhost:4000";
axios.defaults.baseURL = "https://server.onwedding.shop";

const StyledBody = styled.div`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  @font-face {
    font-family: "MaplestoryOTFLight";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFLight.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "IBMPlexSansKR-Regular";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "paybooc-Medium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Medium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <StyledBody>
      <App />
    </StyledBody>
  </React.StrictMode>,
  document.getElementById("root")
);
