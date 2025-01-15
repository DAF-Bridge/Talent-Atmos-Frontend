import JobCard from "@/components/common/JobCard";
import { render, screen } from "@testing-library/react";

describe("JobCard", () => {
  test("renders JobCard component", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 1"
        title="พนักงานทดสอบ 1"
        description="สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ"
        work_type="Fulltime"
        workplace="Hybrid"
        career_stage="Entry-Level"
        province="กรุงเทพมหานคร"
        country="ประเทศไทย"
        salary="30,000"
        imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
        updatedDate="2024-12-29:10:00"
        industry={["IT", "เทคโนโลยี", "องค์กร", "งานทดสอบ"]}
      />
    ); // ARRANGE
    const element = screen.getByText(/พนักงานทดสอบ 1/i); // ACT
    expect(element).toBeInTheDocument(); // ASSERT
  });

  test("renders JobCard component with different props", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 1"
        title="พนักงานทดสอบ 1"
        description="สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ"
        work_type="Fulltime"
        workplace="Hybrid"
        career_stage="Entry-Level"
        province="กรุงเทพมหานคร"
        country="ประเทศไทย"
        salary="30,000"
        imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
        updatedDate="2024-12-29:10:00"
        industry={["IT", "เทคโนโลยี", "องค์กร", "งานทดสอบ"]}
      />
    );
    const element = screen.getByText(/พนักงานทดสอบ 1/i);
    expect(element).toBeInTheDocument();
  });

  test("check if the image is rendered", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 1"
        title="พนักงานทดสอบ 1"
        description="สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ"
        work_type="Fulltime"
        workplace="Hybrid"
        career_stage="Entry-Level"
        province="กรุงเทพมหานคร"
        country="ประเทศไทย"
        salary="30,000"
        imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
        updatedDate="2024-12-29:10:00"
        industry={["IT", "เทคโนโลยี", "องค์กร", "งานทดสอบ"]}
      />
    );
    const element = screen.getByRole("img");
    expect(element).toBeInTheDocument();
  });

  test("check types of props", () => {
    render(
      <JobCard
        orgName="องค์กรทดสอบ 1"
        title="พนักงานทดสอบ 1"
        description="สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ"
        work_type="Fulltime"
        workplace="Hybrid"
        career_stage="Entry-Level"
        province="กรุงเทพมหานคร"
        country="ประเทศไทย"
        salary="30,000"
        imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
        updatedDate="2024-12-29:10:00"
        industry={["IT", "เทคโนโลยี", "องค์กร", "งานทดสอบ"]}
      />
    );

    const element1 = screen.getByText(/องค์กรทดสอบ 1/i);
    const element2 = screen.getByRole("img");
    const element3 = screen.getByText(/งานทดสอบ 1/i);
    const element4 = screen.getByText(/Hybrid/i);

    expect(element1).toHaveTextContent("องค์กรทดสอบ 1");
    expect(element2).toHaveAttribute("src");
    expect(element2).toHaveAttribute("alt");
    expect(element3).toHaveTextContent("พนักงานทดสอบ 1");
    expect(element4).toHaveTextContent("Hybrid");
  });
});
