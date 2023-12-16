import UserCard from "@/components/UserCard";
import { useQuery } from "@tanstack/react-query"
import { z } from "zod";

function fetchData() {
  return fetch('/api/users')
    .then(response => response.json());
}

export default function Home() {

  const { isLoading, error, data } = useQuery({
    queryKey: ["hi"],
    queryFn: fetchData
  })
  if (isLoading) {
    return <div>Loading!</div>
  }

  if (error) {
    return <div>Error! {error.message}</div> //ignore error... error is created on failure
  }

  const parsedData = z.object({
    name: z.string(),
    id: z.string(),
  }).array().parse(data.users)
  return (
    <div>
      {parsedData.map(item =>
        <UserCard key={item.id} name={item.name} id={item.id} />
      )}
    </div>
  )
}
