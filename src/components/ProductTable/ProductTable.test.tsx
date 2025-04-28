import { render, screen, waitFor } from "@testing-library/react";
import { ProductTable } from "./ProductTable";
import { Filter } from "../../types/types";

jest.mock("../../hooks/useProducts", () => ({
  useProducts: () => ({
    products: [
      {
        productId: "1",
        name: "Test Product",
        storeName: "Test Store",
        prices: { normalPrice: 100, offerPrice: 90, lowest: 80 },
      },
    ],
    pagingResponse: { pages: 1 },
    getProducts: jest.fn(),
    error: null,
  }),
}));

describe("ProductTable", () => {
  it("renderiza correctamente el snapshot", async () => {
    const filter: Filter = { status: ["AVAILABLE"], brand: "LG" };
    const { asFragment } = render(<ProductTable filter={filter} />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('muestra el encabezado "Name" en la tabla', async () => {
    const filter: Filter = { status: ["AVAILABLE"], brand: "LG" };
    render(<ProductTable filter={filter} />);
    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });
  });
});
