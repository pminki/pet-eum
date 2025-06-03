import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/join-page";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "회원가입 | 펫이음" }
  ];
}

export default function JoinPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="닉네임(별명)"
            description="Enter your nickname"
            name="name"
            id="name"
            required
            type="text"
            placeholder="Enter your name"
          />
          <InputPair
            id="username"
            label="이름"
            description="Enter your username"
            name="username"
            required
            type="text"
            placeholder="i.e 홍길동"
          />
          <InputPair
            id="email"
            label="이메일"
            description="Enter your email address"
            name="email"
            required
            type="email"
            placeholder="i.e your@example.com"
          />
          <InputPair
            id="password"
            label="비밀번호"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          <Button className="w-full" type="submit">
            Create account
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}