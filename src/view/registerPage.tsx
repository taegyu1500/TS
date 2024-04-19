import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useState } from "react";

function register(email: string, password: string) {
  if (legitCheck(email, password)) {
    // 회원가입 로직 필요
    console.log("회원가입 로직 필요");
  } else {
    console.log("이메일 또는 비밀번호가 형식에 맞지 않습니다.");
  }
}
function legitCheck(email: string, password: string) {
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (emailReg.test(email) && passwordReg.test(password)) {
    return true;
  }
  return false;
}
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    // Tab을 통해서 기본 로그인에 필요한 정보와 사용자 정보를 입력받을 탭을 구별해야 함. 현재는 파이어베이스 기능 확인을 위해 로그인에 필요한 정보만 구성
    <Card>
      <CardHeader>
        <h1>회원가입</h1>
      </CardHeader>
      <CardContent>
        <Form>
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="이메일을 입력해주세요."
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormDescription>
              비밀번호는 8자 이상, 영문, 숫자를 포함해야 합니다.
            </FormDescription>
          </FormItem>
        </Form>
      </CardContent>
      <Button variant="default" onClick={() => register(email, password)}>
        회원가입
      </Button>
    </Card>
  );
};

export default RegisterPage;
