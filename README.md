# E-Commerce App

상품 등록 및 결제 연동 커머스 웹사이트 구현

## 구현 및 배포기술

<<<<<<< HEAD

- React를 typescript를 통해 사용
- react-query를 통해 캐싱 및 실시간 데이터 관리
- 비즈니스, 뷰 로직 분리
- =======
- <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" />
- <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
- <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white" />
- <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=Tailwind-CSS&logoColor=white" />
- <img src="https://img.shields.io/badge/ReactQuery-000000?style=flat-square&logo=React-Query&logoColor=white" />
- <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=React-Router&logoColor=white" />
- <img src="https://img.shields.io/badge/ContextAPI-61DAFB?style=flat-square&logo=React&logoColor=white" />
- <img src="https://img.shields.io/badge/Zod-000000?style=flat-square&logo=Zod&logoColor=white" />
- <img src="https://img.shields.io/badge/ShadcnUI-38B2AC?style=flat-square&logo=Tailwind-CSS&logoColor=white" />

## 디렉토리 구조

```
src
├── components
│   ├── common
│   ├── dataVisual
│   ├── formSetup
│   ├── inputs
│   ├── payment
│   ├── ui
├── hooks
├── context
├── layout
├── util
├── type
├── router
├── view
```

- dataVisual: 데이터 시각화 관련 컴포넌트, 상품 리스트나 정렬 옵션 등의 데이터 시각화를 위한 컴포넌트들
- formSetup: funnel과 generalForm 컴포넌트를 활용해 form을 구성하는 컴포넌트들. 회원가입과 상품 등록 페이지에서 사용
- inputs: 상황에 따라 다른 input을 사용하기 위해 만든 컴포넌트들, formSetup에서 사용되며 type에 따라 구별되고 중복 체크 로직을 포함한 컴포넌트들
- payment: 결제 관련 컴포넌트들, 결제 로직을 포함하고 있음
- ui: shadcn-ui 라이브러리 컴포넌트들
- context: context api를 사용하는 전역 상태관리 컴포넌트들, react-query와 modal이 포함되어 있음
- layout: 레이아웃 관련 컴포넌트들, header, main 등 데이터를 받고 렌더링 하는 레이아웃 컴포넌트들
- type: 타입스크립트 타입 관련 파일들
- util: 파이어베이스 함수들을 모아둠.
- router: 라우터와 조건부 라우팅 관련 컴포넌트들
- view: 페이지를 구성하는 컴포넌트들

## 판매자, 구매자 계정 및 배포 링크

[배포링크](https://testproject-83faf.web.app/)
배포는 firebase hosting을 사용.

```
판매자 계정
email: sellerAdmin@admin.com
password: sellerAdmin12345!

구매자 계정
email: buyerAdmin@admin.com
password: admin12345
```

> > > > > > > b104a35 (chore: 리드미 3차수정)

## 기능 구현

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

- [x] 레이아웃 구성
- [x] 상품 리스트 무한스크롤
- [x] 로그인 유지
- [O] 상품 상세 페이지
- [O] 장바구니 기능 구현
- [O] 결제 연동
- [O] 상품 등록 페이지
- [O] 상품 리스트 페이지
- # [O] 조건부 라우팅
- [] 레이아웃 구성
- [] 상품 리스트 무한스크롤
- # [] 로그인 유지
- [ ] 레이아웃 구성
- [ ] 상품 리스트 무한스크롤
- [ ] 로그인 유지
  > > > > > > > 1532874 (chore: 체크박스 추가 수정)
- [x] 상품 상세 페이지
- [x] 장바구니 기능 구현
- [x] 결제 연동
- [x] 상품 등록 페이지
- [x] 상품 리스트 페이지
- [x] 조건부 라우팅

  > > > > > > > # 08cb7b8 (chore: 체크박스 수정)
  > > > > > > >
  > > > > > > > 로그인, 계정 관리

- 로그인과 계정관리는 firebase Authentification을 사용하여 구현
- 로그인 유지는 firebase가 지원하는 setPersistence를 사용, browserLocalPersistence을 사용하여 구현
  - 파이어베이스가 localStorage에 token을 저장하고, 해당 token을 사용하여 로그인 상태 유지
- 회원가입은 db에 중복된 이메일이 있는지 확인하고, zod를 통해 유효성 검사 시행

> 상품 등록

- 상품 등록 페이지에서 상품명, 가격, 설명, 이미지 등록
  - 이미지는 firebase storage에 업로드
  - 상품 등록 시 db에 상품 정보 저장
- 상품 리스트 페이지에서 등록된 상품 확인

> 상품 상세 페이지

- 상품 리스트 페이지에서 상품 클릭 시 상세 페이지로 이동
- 상품 상세 페이지에서 상품 정보 확인 및 장바구니 담기

> 장바구니

- 상품 상세 페이지에서 구매 버튼 누를 시 장바구니에 상품 추가
- 장바구니 페이지에서 구매할 수량 변경, 삭제 가능
- 장바구니 페이지에 있는 내용은 firebase db에 따로 저장되어 해당 유저의 장바구니 내용이 유지됨

> 결제

- 결제 페이지는 토스페이먼츠와 연동하여 구현
- 결제 페이지에서 결제 버튼 클릭 시 토스페이먼츠 결제 팝업이 뜨고, 결제 완료 시 db에 주문 내용 저장

> 조건부 라우팅

- 로그인 상태에 따라 접근 가능한 페이지가 달라지고, 강제로 접근하려 할 시 에러 페이지로 이동
- 계정은 판매자, 구매자로 나뉘어서 접근 가능한 페이지가 달라짐

> 전역 상태 관리

- context api와 react query를 사용하여 전역 상태 관리
- context api는 모달을 띄울 때 관련 상태를 관리함
- react query는 상품 리스트와 장바구니 내용을 캐싱하여 사용
  > > > > > > > b104a35 (chore: 리드미 3차수정)

## 현재 진행중인 이슈

- 로그인 유지가 되지 않으나, 로그인은 되어 있는 상태

ㄴ 2024/05/17 mainLayout에 체크하는 state와 loading... 페이지를 만들어 해결

- 레이아웃

ㄴ 2024/05/17 레이아웃 문제의 원인이었던 bodyLayout 파일을 삭제하고 해당 내용중 일부를 mainLayout에 하드코딩으로 추가함

- 중복체크 로직을 zod를 사용하여 구현(진행중)

## 프로젝트 개발환경

React(17.0.2), Typescript(4.4.3), react-query(3.21.0), react-router-dom(5.3.0)
