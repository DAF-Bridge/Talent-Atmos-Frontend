import JobDisplay from "@/features/jobs/components/JobDisplay";

export default function JobPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  return (
    <main className="container mx-auto sm:py-8 mt-[65px]">
      <JobDisplay id={params.id} />
    </main>
  );
}
