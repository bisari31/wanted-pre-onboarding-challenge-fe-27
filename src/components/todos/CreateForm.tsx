import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateTodo } from '@/queries/todo';
import { useState } from 'react';

export default function CreateForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { mutate } = useCreateTodo();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, content });
    setTitle('');
    setContent('');
  };
  return (
    <div className="flex justify-end">
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
        <Input
          className="max-w-60"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="타이틀을 입력해주세요"
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="콘텐츠를 입력해주세요"
        />
        <Button disabled={!title || !content} className="">
          등록
        </Button>
      </form>
    </div>
  );
}
