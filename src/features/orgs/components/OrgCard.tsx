import Badge from "@/components/common/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getProvinceNameByCode } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface OrganizationCardProps {
  id: number;
  name: string;
  pictureUrl: string;
  province: string;
  country: string;
  industries: { id: number; name: string }[];
  headline: string;
  locale: string;
}

export function OrganizationCard({
  id,
  name,
  pictureUrl,
  province,
  country,
  industries,
  headline,
  locale,
}: Readonly<OrganizationCardProps>) {
  return (
    <Link href={`/orgs/${id}/org-detail`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full">
        <CardHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-md shrink-0">
              <Image
                src={pictureUrl}
                alt={`${name}-logo`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
              <div className="flex items-center text-sm text-muted-foreground gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {getProvinceNameByCode(province, locale)}, {country}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <h2 className="text-sm font-base mb-2 text-muted-foreground line-clamp-1">
            {headline}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {industries.map((industry) => (
              <Badge
                key={industry.id}
                className="font-normal"
                label={industry.name}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="sr-only"></CardFooter>
      </Card>
    </Link>
  );
}
