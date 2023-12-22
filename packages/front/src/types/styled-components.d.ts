import { Theme } from "@/styles/common";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
