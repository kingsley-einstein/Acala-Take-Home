import styled from "styled-components";

interface InputProps {
  padding?: string;
  width?: string;
  fontSize?: string;
  fontWeight?: "bold" | "bolder" | "normal";
  color?: string;
  border?: string;
  borderRadius?: string;
  fontFamily?: string;
  margin?: string;
}

const Input = styled("input")<InputProps>`
  width: ${(props) => props.width || "200px"};
  padding: ${(props) => props.padding || "8px"};
  font-size: ${(props) => props.fontSize || "12px"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-family: ${(props) => props.fontFamily || "sans-serif"};
  color: ${(props) => props.color || "black"};
  border: ${(props) => props.border || "1px solid #000"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  margin: ${(props) => props.margin || "0px"};
`;

export default Input;
