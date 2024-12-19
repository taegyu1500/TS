type Menu = {
  auth?: boolean;
  title: string;
  nav: string;
  modal?: boolean;
};

const menuItems: Menu[] = [
  { auth: true, title: "홈", nav: "/", modal: false },
  { auth: true, title: "상품", nav: "/product", modal: false },
  { auth: true, title: "로그아웃", nav: "/logout", modal: false },
  { auth: false, title: "로그인", nav: "/login", modal: false },
  { auth: false, title: "회원가입", nav: "/register", modal: false },
  { auth: true, title: "장바구니", nav: "/pending", modal: true },
  { auth: true, title: "결제", nav: "/payment", modal: false },
];

const getMenu = (auth: boolean) => {
  return menuItems.filter((menu) => menu.auth === auth);
};

export { getMenu };
