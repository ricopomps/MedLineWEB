import { User } from "@/models/user";
import { formatDate } from "@/utils/utils";

interface UserProps {
  user: User;
}

export default function User({ user }: UserProps) {
  return (
    <div>
      <div>Nome: {user.name}</div>
      <div>Data de ingresso: {formatDate(user.createdAt)}</div>
    </div>
  );
}
