import { db } from "@/db";

export default async function Home() {

  const item = await db.query.testing.findMany();
  console.log(item);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        item.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })
      }
    </main>
  );
}
