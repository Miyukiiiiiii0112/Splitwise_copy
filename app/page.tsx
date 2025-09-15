import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const response = await  supabase.from('test').select('*');
  const data = response.data;
  if(!data) {
    return <div>No data</div>
  }


  return (
    <div className="text-red-600 font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     {data.map((item) => (
      <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
