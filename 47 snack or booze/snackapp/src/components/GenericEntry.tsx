import { GenericItem } from "./provider";

export default function GenericEntry({ data }: { data: GenericItem }) {
  return (
    <div className="flex flex-col gap-4">
      <h1>
        {data.name}#{data.id}
      </h1>
      <p>{data.description}</p>
    </div>
  );
}
