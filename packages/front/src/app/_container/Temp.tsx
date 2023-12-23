"use client";
import { TEXT } from "@/styles/common";
import styled from "styled-components";

export default function Temp() {
  return (
    <TempContainer>해당 텍스트는 20px, 빨간색으로 출력됩니다.</TempContainer>
  );
}

const TempContainer = styled.div`
  color: red;
  font-size: ${TEXT["size"]["xl"]};
`;
