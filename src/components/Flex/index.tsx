import styled from "styled-components";

interface FlexProps {
  flexFlow: "row wrap" | "column wrap" | "row nowrap" | "column nowrap";
  justifyContent: string;
  alignItems: string;
}

export const Flex = styled("div")<FlexProps>`
  display: flex;
  flex-flow: ${(props) => props.flexFlow || "row wrap"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
`;

export const Spacer = styled.div<{ flex: string }>`
  flex: ${(props) => props.flex || "0 1"};
`;
