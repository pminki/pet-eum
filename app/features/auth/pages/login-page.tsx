import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "로그인 | 펫이음" }
  ];
}

export default function LoginPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="이메일"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            id="password"
            label="비밀번호"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="i.e wemake@example.com"
          />
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}