import { NextResponse } from "next/server";

/**
* @swagger
* /api/events/{eventId}:
*   get:
*     tags:
*       - Events
*     summary: Get event details by ID
*     description: Retrieves detailed information about a specific event including description, requirements, timeline, location, and organizer details
*     parameters:
*       - in: path
*         name: eventId
*         required: true
*         schema:
*           type: string
*         description: Unique identifier of the event
*     responses:
*       200:
*         description: Successfully retrieved event details
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 event:
*                   type: object
*                   properties:
*                     id:
*                       type: string
*                       example: "1"
*                     title:
*                       type: string
*                       example: "Builds Idea 2024"
*                     description:
*                       type: string
*                       example: "อยากเป็นผู้ประกอบการ แต่ไม่รู้ว่าไอเดียที่มี..."
*                     highlight:
*                       type: string
*                       example: "พบปะพูดคุย และรับคำแนะนำจาก CEO บริษัทสตารทอัพร้อยล้าน..."
*                     requirements:
*                       type: string
*                       example: "นักศึกษามหาวิทยาลัยเชียงใหม่ ปัจจุบัน ตรี โท เอก"
*                     outcomes:
*                       type: array
*                       items:
*                         type: string
*                       example: ["การทำ Design Thinking เพื่อสำรวจและออกแบบผลิตภัณฑ์"]
*                     timeline:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           date:
*                             type: string
*                             example: "13 ก.ค. 2567"
*                           content:
*                             type: string
*                             example: "Start of the event"
*                     location:
*                       type: object
*                       properties:
*                         name:
*                           type: string
*                           example: "Builds - CMU: Startup & Entrepreneurial Platform"
*                         map_url:
*                           type: string
*                           example: "google-maps-link"
*                         image_url:
*                           type: string
*                           example: "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks"
*                     contact:
*                       type: object
*                       properties:
*                         facebook:
*                           type: string
*                           example: "https://facebook.com/BuildsCMU"
*                     tickets:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           name:
*                             type: string
*                             example: "Free Entry"
*                           price:
*                             type: number
*                             example: 0
*                 organizer:
*                   type: object
*                   properties:
*                     name:
*                       type: string
*                       example: "Builds มหาวิทยาลัยเชียงใหม่"
*                     profile_image:
*                       type: string
*                       example: "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks"
*                 event_dates:
*                   type: object
*                   properties:
*                     start:
*                       type: string
*                       format: date-time
*                       example: "2024-07-13T09:00:00+07:00"
*                     end:
*                       type: string
*                       format: date-time
*                       example: "2024-08-07T20:00:00+07:00"
*       500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Failed to fetch events details"
*/
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
            name: "Free Entry",
            price: 0,
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
