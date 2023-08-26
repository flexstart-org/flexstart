import Link from "next/link";
import useSWR from "swr";
import BlurImage from "@/components/shared/blur-image";
import { Edit } from "@/components/shared/icons";
import Tooltip, { TooltipContent } from "@/components/shared/tooltip";
import { ProjectProps } from "@/lib/types";
import { GOOGLE_FAVICON_URL } from "@/lib/constants";

export default function ProjectCard({
  name,
  replicas,
  logo,
  domain,
  domainVerified,
}: ProjectProps) {

  return (
    <Link
      key={name}
      href={`/${name}`}
      className="flex flex-col space-y-10 rounded-lg border border-gray-100 bg-white p-6 shadow transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <BlurImage
            src={logo || `${GOOGLE_FAVICON_URL}${domain}`}
            alt={name}
            className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full"
            width={48}
            height={48}
          />
          <div>
            <h2 className="text-lg font-medium text-gray-700">{name}</h2>
            <div className="flex items-center">
              <p className="text-gray-500">{domain}</p>
              <Tooltip
                content={
                  <TooltipContent
                    title=""
                    cta="Change Domain"
                    ctaLink={`/${name}/settings`}
                  />
                }
              >
                <div className="flex w-8 justify-center">
                  <Link href={`/${name}/settings`}>
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Link>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-500">
          <BarChart2 className="h-4 w-4" />
          <h2 className="text-sm">
            {nFormatter(replicas)} pod{replicas != 1 && "s"}
          </h2>
        </div>
      </div> */}
    </Link>
  );
}
