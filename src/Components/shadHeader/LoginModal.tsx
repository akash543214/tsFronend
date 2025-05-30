import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "../Authentication/ShadcnLogin";

export function LoginModal() {
  return (
    <Dialog>
      {/* Trigger button to open the modal */}
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>

      {/* Dialog content just wraps your LoginForm */}
      <DialogContent className="sm:max-w-[425px]">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
