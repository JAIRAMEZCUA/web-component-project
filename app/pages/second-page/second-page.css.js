/* eslint-disable no-unused-vars */
import { css, } from 'lit';

export default css`
a,
h1 {
  margin: 0;
  padding: 0;
}

[slot=app-header] {
  padding: 2rem;
  font-family: "Tiempos Headline Bold";
}

[slot=app-main-content] {
  height: 100%;
  padding: 2rem;
}
`;
