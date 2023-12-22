import { ReactNode } from "react";
import { MemoryRouter, Routes } from "react-router-dom";

export function withRouter(
  routes: ReactNode,
  initialEntires: string[] = ["/"],
) {
  return (
    <MemoryRouter initialEntries={initialEntires}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}
