import { OrganizationCard } from "@/features/orgs/components/OrgCard";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { OrganizationBrief } from "@/lib/types";

interface OrgCarouselProps {
  orgs: OrganizationBrief[];
  locale: string;
}

export default function OrgCarousel({
  orgs,
  locale,
}: Readonly<OrgCarouselProps>) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {orgs.map((org) => (
          <CarouselItem
            key={org.id}
            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1 h-full">
              <OrganizationCard
                id={org.id}
                name={org.name}
                picUrl={org.picUrl}
                province="Chiang Mai"
                country="TH"
                industries={[
                  { id: 1, name: "Industry 1" },
                  { id: 2, name: "Industry 2" },
                ]}
                headline={"Leading organization in technology and innovation"}
                locale={locale}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end gap-2 mt-8">
        <CarouselPrevious className="static bg-white border border-orange-normal text-orange-dark hover:bg-orange-50 hover:text-orange-dark h-10 w-10 rounded-full transform transition-transform duration-200 hover:scale-105" />
        <CarouselNext className="static bg-orange-normal hover:bg-orange-dark text-white h-10 w-10 rounded-full transform transition-transform duration-200 hover:scale-105" />
      </div>
    </Carousel>
  );
}
