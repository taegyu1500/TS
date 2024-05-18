# E-Commerce App

상품 등록 및 결제 연동 커머스 웹사이트 구현

## 구현 및 배포기술

- React를 typescript를 통해 사용
- react-query를 통해 캐싱 및 실시간 데이터 관리
- 비즈니스, 뷰 로직 분리
- firebase

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
├── pages
├── view

```

## 판매자, 구매자 계정

```
판매자 계정
email: sellerAdmin@admin.com
password: sellerAdmin12345!

구매자 계정
email: buyerAdmin@admin.com
password: admin12345
```

## 목표

- [ ] 레이아웃 구성
- [ ] 상품 리스트 무한스크롤
- [ ] 로그인 유지
- [x] 상품 상세 페이지
- [x] 장바구니 기능 구현
- [x] 결제 연동
- [x] 상품 등록 페이지
- [x] 상품 리스트 페이지
- [x] 조건부 라우팅

## 현재 진행중인 이슈

- 로그인 유지가 되지 않으나, 로그인은 되어 있는 상태

ㄴ 2024/05/17 mainLayout에 체크하는 state와 loading... 페이지를 만들어 해결

- 레이아웃

ㄴ 2024/05/17 레이아웃 문제의 원인이었던 bodyLayout 파일을 삭제하고 해당 내용중 일부를 mainLayout에 하드코딩으로 추가함

- 중복체크 로직을 zod를 사용하여 구현(진행중)

## 프로젝트 개발환경

React(17.0.2), Typescript(4.4.3), react-query(3.21.0), react-router-dom(5.3.0)

## 해결된 이슈

- [x] 로그인 유지

```
localStorage에 token을 저장하는 방식을 사용하려 했으나, firebase에 해당 기능을 지원하는 것을 보고 적용.
setPersistence을 통해 로그인 전에 로그인을 유지하도록 만들고 로그아웃을 하지 않는 한 계속 로그인 상태를 유지함

문제발생: 새로고침 시 한번의 로그인 과정이 필요함
해결: 최상위 컴포넌트인 mainLayout에서 로그인 상태를 체크(useEffect, useState)하고, 해당 체크 중에는 loading...이 보여지게 하여 해결.
```

- [x] 레이아웃

```
문제: 레이아웃이 중앙에 뭉쳐있고 화면 바깥에 렌더링 되거나 내용없이 스크롤바를 만드는 등의 문제 발생
해결: 헤더와 내용을 포함시키던 bodyLayout.tsx 파일 내 css가 문제였고, 해당 파일을 삭제하고 mainLayout에 <div></div>를 만들고 하드코딩하여 해결함.
```

- [x] 로그인이 안됨에도 불구하고 로그인 로직을 통과함

```
문제: firebase에서 에러를 리턴했음에도 불구하고 성공 로직을 탐
해결: firebase에서 에러를 리턴하면 해당 에러를 catch하게 하여 진행을 막고, 추가로 setPersistence를 return 시키고 이후에 작업되게 하여 유지 안됨 문제 추가 해결
```

- [x] toast 위치 문제

```
문제: toast가 화면 중앙 위쪽에 렌더링 되어야 하는데 화면 중앙 아래에 렌더링 됨
해결: shadcn-ui의 toast ui component 내부 tailwindcss를 적용하는 부분을 수정하여 해결
미해결: toast가 렌더링 될 때 추가 prop을 받아서 alert, error, success 등을 구현해야 함. 해당 내용을 위해선 shadcn-ui의 toast ui component를 뜯어보고 수정해야함
```

- [x] 미사용 파일 삭제

```
문제: 사용할 것이라고 예상해놓고 만든 파일이 많아 불필요한 파일들이 감지됨
해결: firebase연동 원본함수 파일들을 제외한 불필요한 파일들을 모두 삭제함. 해당 원본함수들은 import하는 곳이 많아 당장은 삭제하지 않았고, 차후 util/firebasFunctions에 모아두었기 때문에 import 경로들을 모두 수정하여 레퍼런스되지 않음을 확인하고 삭제할 예정
```
