import { useState } from "react";
import { ExternalLink } from "@/components/shared/icons";

export const InlineSnippet = ({ children }: { children: string }) => {
  return (
    <span className="inline-block rounded-md bg-blue-100 px-1 py-0.5 font-mono text-blue-900">
      {children}
    </span>
  );
};

export default function DomainConfiguration({ domain }) {
  return (
    <div className="border-t border-gray-200 pt-5">
      <div className="flex justify-start space-x-4">
        <button className="border-black text-black ease border-b-2 pb-1 text-sm transition-all duration-150">
          CNAME Record
        </button>
      </div>
      <p className="my-5 text-sm text-gray-500">
        Set the following record on your DNS provider to continue:
      </p>
      <div className="my-3 text-left">
        <div className="flex items-center justify-between sm:space-x-5 rounded-md bg-gray-50 p-2">
          <div>
            <p className="text-sm font-bold">Type</p>
            <p className="mt-2 font-mono text-sm">CNAME</p>
          </div>
          <div>
            <p className="text-sm font-bold">Name</p>
            <p className="mt-2 font-mono text-sm">{domain}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Value</p>
            <p className="mt-2 font-mono text-sm">cname.flexstart.org</p>
          </div>
          <div>
            <p className="text-sm font-bold">TTL</p>
            <p className="mt-2 font-mono text-sm">Auto</p>
          </div>
        </div>
        <p className="mt-10 text-sm text-gray-500">
          Note: Depending on your provider, it might take some time for the DNS
          records to apply.
        </p>
        {/* <p className="mt-5 text-sm text-gray-500">
          You can also set additional ip{" "}
          <InlineSnippet>65.2.61.209</InlineSnippet> and{" "}
          <InlineSnippet>3.7.167.46</InlineSnippet> to the same hostname (
          {domain}) to distribute traffic across our multiple servers.
          <a
            href="https://developers.cloudflare.com/dns/manage-dns-records/how-to/round-robin-dns/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-blue-500 space-x-1"
          >
            <p>Learn More</p>
            <ExternalLink className="h-3 w-3 flex" />
          </a>
        </p> */}
      </div>
    </div>
  );
}
