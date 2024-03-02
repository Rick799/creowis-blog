import Link from "next/link";

function Home() {
  return (
    <div>
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        <Link href="./creo">
        CreoWis Blogs
        </Link>
      </div>
    </div>
  );
}

export default Home;

