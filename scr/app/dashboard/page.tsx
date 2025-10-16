import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CreatePostForm from "@/components/CreatePostForm";

export default async function CreatePost() {
  const session = await getServerSession(authOptions as any);

  if (!session) {
    return <p className="text-center mt-10">Please log in to create a post.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <CreatePostForm />
    </div>
  );
}
