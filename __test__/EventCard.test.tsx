import EventCard from "@/components/cards/EventCard";
import { render, screen } from "@testing-library/react";

describe("EventCard", () => {
  test("renders EventCard component", () => {
    render(
      <EventCard
        title="งานทดสอบ"
        date="10-12-2024"
        time="06:30"
        location="สถานที่"
        imgUrl="https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks"
        orgName="องค์กรทดสอบ"
        orgPicUrl="https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks"
        cardId="1"
      />
    );
    const element = screen.getByText(/งานทดสอบ/i);
    expect(element).toBeInTheDocument();
  });
});
