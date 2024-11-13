import { Input } from '@/components/ui/input';
import { InputHTMLAttributes, forwardRef } from 'react';

interface AuthInputProps {
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  message?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput({ message, type, placeholder, ...props }, ref) {
    return (
      <div className="flex flex-col gap-1">
        <Input placeholder={placeholder} type={type} {...props} ref={ref} />
        {message && <p className="text-sm text-red-500"> {message}</p>}
      </div>
    );
  },
);

export default AuthInput;
