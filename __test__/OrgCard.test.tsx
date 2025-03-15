import { screen } from "@testing-library/react";
import OrgCard from "@/features/orgs/components/OrgCard";
import { getLangList, renderWithIntl } from "./renderUtilsWithInt";

describe("OrgCard", () => {
  const langList = getLangList();

  langList.forEach((lang) => {
    test("renders OrgCard component", () => {
      renderWithIntl(
        <OrgCard
          id={1}
          name="ไทยสตาร์ทอัพ"
          imgUrl="https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
        />,
        { locale: lang }
      );
      const element = screen.getByText(/ไทยสตาร์ทอัพ/i);
      expect(element).toBeInTheDocument();
    });

    test("renders OrgCard component with different props", () => {
      renderWithIntl(
        <OrgCard
          id={1}
          name="SEA Bridge Talent"
          imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
        />,
        { locale: lang }
      );
      const element = screen.getByText(/SEA Bridge Talent/i);
      expect(element).toBeInTheDocument();
    });

    test("check if the image is rendered", () => {
      renderWithIntl(
        <OrgCard
          id={1}
          name="SEA Bridge Talent"
          imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
        />,
        { locale: lang }
      );
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});
