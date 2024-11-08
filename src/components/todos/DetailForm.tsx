import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useTodoById, useDeleteTodo, useUpdateTodo } from '@/queries/todo';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function DetailForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const { data } = useTodoById(id);
  const { mutate: deleteMutate } = useDeleteTodo();
  const { mutate: updateMutate } = useUpdateTodo(toggleEditMode);

  const resetForm = () => {
    setTitle(data?.title ?? '');
    setContent(data?.content ?? '');
  };

  const handleCancel = () => {
    resetForm();
    toggleEditMode();
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  return (
    <div className="w-full">
      <h2 className="py-3 text-lg font-bold">상세보기</h2>
      {data && id && (
        <div className="flex w-full flex-col gap-1">
          <Input
            readOnly={!isEditing}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(isEditing && 'border-black')}
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            readOnly={!isEditing}
            className={cn(
              isEditing && 'border-black',
              'h-56 w-full resize-none',
            )}
          />
          <div className="mt-5 flex w-full gap-5">
            {isEditing ? (
              <>
                <Button
                  className="w-full"
                  type="button"
                  variant={'outline'}
                  onClick={handleCancel}
                >
                  취소
                </Button>
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => updateMutate({ content, id, title })}
                >
                  완료
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => deleteMutate(id)}
                  variant={'destructive'}
                  className="w-full"
                >
                  삭제
                </Button>
                <Button
                  className="w-full"
                  type="button"
                  onClick={toggleEditMode}
                >
                  수정
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
