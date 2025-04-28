import { render, screen } from "@testing-library/react";
import FilterBox, { getFilters } from "./FilterBox";
import { FilterTypes } from "../../types/types";

describe("FilterBox", () => {
  it("renderiza correctamente los checkboxes para STATUS (snapshot)", () => {
    const checkedMap = getFilters(FilterTypes.STATUS);

    const { asFragment } = render(
      <FilterBox
        filterType={FilterTypes.STATUS}
        checkedMap={checkedMap}
        onChange={() => {}}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renderiza correctamente los radios para BRAND", () => {
    const checkedMap = getFilters(FilterTypes.BRAND);

    render(
      <FilterBox
        filterType={FilterTypes.BRAND}
        checkedMap={checkedMap}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("LG")).toBeInTheDocument();
  });
});
