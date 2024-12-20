import JobCard from "@/components/cards/JobCard";
import { render, screen } from "@testing-library/react";

describe("JobCard", () => {
  test("renders JobCard component", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 5"
        imgUrl="https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
        jobTitle="งานทดสอบ 5"
        location="ออนไลน์"
      />
    ); // ARRANGE
    const element = screen.getByText(/องค์กรทดสอบ 5/i); // ACT
    expect(element).toBeInTheDocument(); // ASSERT
  });

  test("renders JobCard component with different props", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 4"
        imgUrl="https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9"
        jobTitle="งานทดสอบ 4"
        location="ออนไลน์"
      />
    );
    const element = screen.getByText(/องค์กรทดสอบ 4/i);
    expect(element).toBeInTheDocument();
  });

  test("check if the image is rendered", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 4"
        imgUrl="https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9"
        jobTitle="งานทดสอบ 4"
        location="ออนไลน์"
      />
    );
    const element = screen.getByRole("img");
    expect(element).toBeInTheDocument();
  });

  test("check types of props", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 4"
        imgUrl="https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9"
        jobTitle="งานทดสอบ 4"
        location="ออนไลน์"
      />
    );

    const element1 = screen.getByText(/องค์กรทดสอบ 4/i);
    const element2 = screen.getByRole("img");
    const element3 = screen.getByText(/งานทดสอบ 4/i);
    const element4 = screen.getByText(/ออนไลน์/i);

    expect(element1).toHaveTextContent("องค์กรทดสอบ 4");
    expect(element2).toHaveAttribute("src");
    expect(element2).toHaveAttribute("alt");
    expect(element3).toHaveTextContent("งานทดสอบ 4");
    expect(element4).toHaveTextContent("ออนไลน์");
  });
});
