import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "../../components/Authentication/Login";
import { SigninForm } from "../../components/Authentication/Signin";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type formType = "login" | "register";

export function LoginModal() {
  const [selectedForm, setSelectedForm] = useState<formType>("login");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Get started</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedForm}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {selectedForm === "login" ? (
              <LoginForm setSelectedForm={setSelectedForm} />
            ) : (
              <SigninForm setSelectedForm={setSelectedForm} />
            )}
          </motion.div>
        </AnimatePresence>

      
      </DialogContent>
    </Dialog>
  );
}
