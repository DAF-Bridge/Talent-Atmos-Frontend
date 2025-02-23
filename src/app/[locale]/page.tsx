"use client";

import EventCard from "@/components/common/EventCard";
import JobCard from "@/components/common/JobCard";
import BigFooter from "@/components/layout/BigFooter";
import NavigationBar from "@/components/layout/Navbar/NavBar";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Sample data for events and jobs
  const events = [
    {
      title: "Community Beach Cleanup",
      startDate: "2025-06-15",
      endDate: "2025-06-15",
      location: "Sunny Beach",
      imgUrl: "/placeholder.svg?height=300&width=400",
      orgName: "Ocean Guardians",
      orgPicUrl: "/placeholder.svg?height=100&width=100",
      cardId: "1",
    },
    {
      title: "Sustainable Living Workshop",
      startDate: "2025-06-20",
      endDate: "2025-06-21",
      location: "Green Community Center",
      imgUrl: "/placeholder.svg?height=300&width=400",
      orgName: "EcoLife Initiative",
      orgPicUrl: "/placeholder.svg?height=100&width=100",
      cardId: "2",
    },
    {
      title: "Reforestation Project",
      startDate: "2025-07-01",
      endDate: "2025-07-03",
      location: "National Forest",
      imgUrl: "/placeholder.svg?height=300&width=400",
      orgName: "TreeHuggers United",
      orgPicUrl: "/placeholder.svg?height=100&width=100",
      cardId: "3",
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Sustainability Coordinator",
      description:
        "Lead sustainability initiatives and promote eco-friendly practices within the organization.",
      work_type: "Full-time",
      workplace: "On-site",
      career_stage: "Mid-level",
      province: "Green City",
      country: "Eco Nation",
      salary: 40000,
      imgUrl: "/placeholder.svg?height=100&width=100",
      updatedDate: new Date().toISOString(),
      orgName: "EcoTech Solutions",
      industry: ["Sustainability", "Environmental"],
    },
    {
      id: 2,
      title: "Renewable Energy Engineer",
      description:
        "Design and implement renewable energy systems for residential and commercial applications.",
      work_type: "Full-time",
      workplace: "Hybrid",
      career_stage: "Senior",
      province: "Solar Valley",
      country: "Eco Nation",
      salary: 60000,
      imgUrl: "/placeholder.svg?height=100&width=100",
      updatedDate: new Date().toISOString(),
      orgName: "GreenPower Co.",
      industry: ["Energy", "Engineering"],
    },
  ];
  return (
    <>
      <NavigationBar />
      <div className="font-prompt mx-auto mt-[60px] min-h-[80vh]">
        {/* <section className="w-full py-12 bg-orange-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect, Volunteer, Sustain
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Find meaningful events and jobs that make a difference in your
                  community and the environment.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search events or jobs"
                    type="text"
                  />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section> */}
        <section className="w-full max-auto py-12 bg-white px-4 sm:px-2 lg:px-16">
          <div className="container px-2 md:px-4 mx-auto">
            <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Upcoming Events
            </h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {events.map((event, index) => (
                <EventCard key={index} {...event} showOrg={false} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-orange-normal text-white hover:bg-orange-dark">
                View All Events
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-light">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Recent Job Postings
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {jobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-orange-normal text-white hover:bg-orange-dark">
                View All Jobs
              </Button>
            </div>
          </div>
        </section>
      </div>

      <BigFooter />
    </>
  );
}
