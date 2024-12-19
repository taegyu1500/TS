type Menu = {
  auth?: boolean;
  title: string;
  nav: string;
  modal?: boolean;
};

const Menu: Menu[] = [
  { auth: true, title: "Home", nav: "/", modal: false },
  { auth: true, title: "Profile", nav: "/profile", modal: false },
  { auth: true, title: "Logout", nav: "/logout", modal: false },
  { auth: false, title: "Login", nav: "/login", modal: false },
  { auth: false, title: "Register", nav: "/register", modal: false },
];

const getMenu = (auth: boolean) => {
  return Menu.filter((menu) => menu.auth === auth);
};

export default getMenu;
