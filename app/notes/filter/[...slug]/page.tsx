import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const initialPage = 1;
  const initialSearch = "";

  const tag = slug?.[0] === "All" ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: initialSearch, page: initialPage, tag }],
    queryFn: () => fetchNotes(initialSearch, initialPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
