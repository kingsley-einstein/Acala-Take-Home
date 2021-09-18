import styled from "styled-components";
import { CommonDefs } from "../commonDefs";

interface FlexProps {
  flexFlow?: "row wrap" | "column wrap" | "row nowrap" | "column nowrap";
  justifyContent?: string;
  alignItems?: string;
  margin?: string;
}

export const Flex = styled("div")<FlexProps & CommonDefs>`
  display: flex;
  flex-flow: ${(props) => props.flexFlow || "row wrap"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  margin: ${(props) => props.margin || "0px"};

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

export const Spacer = styled.div<{ flex?: string }>`
  flex: ${(props) => props.flex || "0 1"};
`;
