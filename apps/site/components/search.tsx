import { usePathname } from "next/navigation";

export default function Search() {
  const pathname = usePathname();

  if (pathname !== ("/" || "/pricing")) {
    return;
  } else {
    return <></>;
  }
}
