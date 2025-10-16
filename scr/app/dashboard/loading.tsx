export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <div className="h-10 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-48 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
