import { render, screen } from "@testing-library/react";
import OrgCard from "@/components/cards/OrgCard";

describe("OrgCard", () => {
  test("renders OrgCard component", () => {
    render(
      <OrgCard
        name="ไทยสตาร์ทอัพ"
        imgUrl="https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
      />
    );
    const element = screen.getByText(/ไทยสตาร์ทอัพ/i);
    expect(element).toBeInTheDocument();
  });

  test("renders OrgCard component with different props", () => {
    render(
      <OrgCard
        name="SEA Bridge Talent"
        imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
      />
    );
    const element = screen.getByText(/SEA Bridge Talent/i);
    expect(element).toBeInTheDocument();
  });

  test("check if the image is rendered", () => {
    render(
      <OrgCard
        name="SEA Bridge Talent"
        imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
      />
    );
    const element = screen.getByRole("img");
    expect(element).toBeInTheDocument();
  });
});
