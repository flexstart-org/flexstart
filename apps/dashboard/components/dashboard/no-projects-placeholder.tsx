import BlurImage from "@/components/shared/blur-image";

export default function NoProjectsPlaceholder({
  setShowAddProjectModal,
}: {
  setShowAddProjectModal: (show: boolean) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
      <h2 className="z-10 text-xl font-semibold text-gray-700">
        You don&apos;t have any projects yet!
      </h2>
      <BlurImage
        src="/_static/illustrations/podcast.svg"
        alt="No projects yet"
        width={400}
        height={400}
        className="pointer-events-none -my-8"
      />
      <button
        onClick={() => setShowAddProjectModal(true)}
        className="rounded-md border border-black bg-black px-10 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
      >
        Create project
      </button>
    </div>
  );
}
