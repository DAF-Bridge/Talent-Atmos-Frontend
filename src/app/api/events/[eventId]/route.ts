import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const mockEventDetails = {
      event: {
        id: params.eventId,
        title: "Builds Idea 2024",
        description:
          "อยากเป็นผู้ประกอบการ แต่ไม่รู้ว่าไอเดียที่มี\nจะเป็นไปได้ไหม? โครงการสำหรับการผู้ที่สนใจทำธุรกิจ  มาเริ่มคิดค้นไอเดีย และเรียนรู้เครื่องมือพิสูจน์ไอเดียไปด้วยกัน! เริ่มต้นเรียนคอร์สออนไลน์จากตลาดหลักทรัพย์แห่งประเทศไทย และร่วมกิจกรรม Workshop แบบออนไซต์เพื่อเพิ่มทักษะผู้ประกอบการ!",
        highlight: "พบปะพูดคุย และรับคำแนะนำจาก CEO บริษัทสตารทอัพร้อยล้าน...",
        requirements: "นักศึกษามหาวิทยาลัยเชียงใหม่ ปัจจุบัน ตรี โท เอก",
        outcomes: [
          "การทำ Design Thinking เพื่อสำรวจและออกแบบผลิตภัณฑ์",
          "การออกแบบธุรกิจด้วยเครื่องมือต่างๆ เช่น Business Model Canvas",
          "ทักษะการพิชชิ่งต่ิหน้ากรรมการ",
          "ทักษะด้านทีมเวิร์ค",
        ],
        timeline: [
          {
            date: "13 ก.ค. 2567",
            content: "Start of the event",
          },
          {
            date: "24 ก.ค. 2567",
            content: "Workshop 1",
          },
          {
            date: "7 ส.ค. 2567",
            content: "Final Pitch",
          },
        ],
        location: {
          name: "Builds - CMU: Startup & Entrepreneurial Platform",
          map_url: "google-maps-link",
          image_url:
            "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
        },
        contact: {
          facebook: "https://facebook.com/BuildsCMU",
        },
        tickets: [
          {
            id: "1",
            name: "Free Entry",
            price: 0,
          },
          {
            id: "123",
            name: "Paid Entry",
            price: 1000,
          },
        ],
      },
      organizer: {
        name: "Builds มหาวิทยาลัยเชียงใหม่",
        profile_image:
          "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
      },
      event_dates: {
        start: "2024-07-13T09:00:00+07:00",
        end: "2024-08-07T20:00:00+07:00",
      },
    };

    // Delay for 3 seconds before sending the response, remove after you have a backend
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(mockEventDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events details" },
      { status: 500 }
    );
  }
}
