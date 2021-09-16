import styled from "styled-components";

interface ButtonProps {
  padding?: string;
  color?: string;
  margin?: string;
  fontSize?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  fontWeight?: "bold" | "bolder" | "normal";
  cursor?: string;
  fontStyle?: "italic" | "normal";
  fontFamily?: string;
}

const Button = styled("button")<ButtonProps>`
  padding: ${(props) => props.padding || "10px"};
  color: ${(props) => props.color || "black"};
  margin: ${(props) => props.margin || "4px"};
  font-size: ${(props) => props.fontSize || "12px"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-style: ${(props) => props.fontStyle || "normal"};
  font-family: ${(props) => props.fontFamily || "sans-serif"};
  font-size: ${(props) => props.fontSize || "14px"};
  cursor: ${(props) => props.cursor || "pointer"};
`;

export default Button;
