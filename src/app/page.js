import Link from "next/link";

export default function Home() {
  
  return (
    <div className="min-h-screen flex items-center justify-center">
    <Link href="/blog">
      <button className="text-white font-bold text-[16px] border-white border px-4 py-3 rounded-lg">Blog Page</button>
    </Link>
    </div>
  );
}
