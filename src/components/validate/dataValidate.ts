import dupCheck from "../firebase/dupCheck";

const dataValidate = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  // 데이터 검증 로직
  if (data.email == "" || data.password == "") {
    return [false, "이메일과 비밀번호를 입력해주세요."];
  }
  if (await dupCheck("email", data.email)) {
    return [false, "이미 등록된 이메일입니다."];
  }
  if (await dupCheck("name", data.name)) {
    return [false, "이미 등록된 이름입니다."];
  }
  return [true, "회원가입 성공"];
};

export default dataValidate;
