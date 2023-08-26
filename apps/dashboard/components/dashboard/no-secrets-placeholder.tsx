import BlurImage from "@/components/shared/blur-image";

export default function NoProjectsPlaceholder({
  setShowAddSecretModal,
}: {
  setShowAddSecretModal: (show: boolean) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
      <h2 className="z-10 text-xl font-semibold text-gray-700">
        You don&apos;t have any secrets yet!
      </h2>
      <BlurImage
        src="/_static/illustrations/coffee-call.svg"
        alt="No secrets yet"
        width={400}
        height={400}
        className="pointer-events-none -my-8"
      />
      <button
        onClick={() => setShowAddSecretModal(true)}
        className="rounded-md border border-black bg-black px-10 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
      >
        Create a secret
      </button>
    </div>
  );
}
