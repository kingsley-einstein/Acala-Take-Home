import styled from "styled-components";
import { CommonDefs } from "../commonDefs";

interface TableProps {
  borderCollapse?: "collapse" | "separate";
  width?: string;
}

interface THeadProps {
  padding?: string;
  textAlign?: string;
  border?: string;
}

interface TDProps {
  padding?: string;
  textAlign?: string;
  border?: string;
}

export const Table = styled("table")<TableProps & CommonDefs>`
  border-collapse: ${(props) => props.borderCollapse || "collapse"};
  width: ${(props) => props.width || "100%"};

  ${(props) =>
    !!props.screens &&
    props.screens.length > 0 &&
    props.screens.map(
      (screen) =>
        `@media screen and (max-width: ${screen.size + "px"}) ${
          screen.definition
        }`
    )}
`;

export const THead = styled("th")<THeadProps>`
  padding: ${(props) => props.padding || "12px"};
  text-align: ${(props) => props.textAlign || "left"};
  border: ${(props) => props.border || "none"};
`;

export const TD = styled("td")<TDProps>`
  padding: ${(props) => props.padding || "12px"};
  text-align: ${(props) => props.textAlign || "left"};
  border: ${(props) => props.border || "none"};
`;

export const TR = styled("tr")<{ stripe?: string }>`
  &:nth-child(even) {
    background-color: ${(props) => props.stripe || "#f2f2f2"};
  }
`;
