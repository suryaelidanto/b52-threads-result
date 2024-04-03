import { IThreadCard, IThreadPost } from "@/types/Thread";
import { API } from "@/lib/api";
import { ChangeEvent, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useThreads() {
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
    user: 1,
  });

  const { data: getThreads, refetch } = useQuery<IThreadCard[]>({
    queryKey: ["thread"],
    queryFn: async () => await API.get("/threads").then((res) => res.data),
  });

  const { mutateAsync } = useMutation<unknown, unknown, FormData>({
    mutationFn: async (dto) => {
      await API.post("/thread", dto);
    },
    onSuccess: () => refetch(),
  });

  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("image", form.image as string);

    mutateAsync(formData);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, files, value } = event.target;

    if (files) {
      return setForm({
        ...form,
        [name]: files[0],
      });
    }
    setForm({
      ...form,
      [name]: value,
    });
  }

  return { form, getThreads, handleChange, handlePost };
}
