import Link from "next/link";

export default function Home() {

  return (
    <div className="max-w-full min-h-screen flex items-center justify-center bg-stone-900">
      <div className="flex items-center justify-center flex-col mx-auto container">
        <h2 className="text-4xl text-white font-bold mb-5">Browse our Blog Collection</h2>
        <Link href="/blog" className="mt-2 text-white font-bold text-[16px] hover:bg-slate-200 hover:text-stone-900 hover:transition-all border-white border px-4 py-2 rounded-lg">
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
