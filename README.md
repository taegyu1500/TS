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

- [x] 레이아웃 구성
- [x] 상품 리스트 무한스크롤
- [x] 로그인 유지
- [o] 상품 상세 페이지
- [o] 장바구니 기능 구현
- [o] 결제 연동
- [o] 상품 등록 페이지
- [o] 상품 리스트 페이지
- [o] 조건부 라우팅

## 현재 진행중인 이슈

- 로그인 유지가 되지 않으나, 로그인은 되어 있는 상태

ㄴ 2024/05/17 mainLayout에 체크하는 state와 loading... 페이지를 만들어 해결

- 레이아웃

ㄴ 2024/05/17 레이아웃 문제의 원인이었던 bodyLayout 파일을 삭제하고 해당 내용중 일부를 mainLayout에 하드코딩으로 추가함

- 중복체크 로직을 zod를 사용하여 구현(진행중)

## 프로젝트 개발환경

React(17.0.2), Typescript(4.4.3), react-query(3.21.0), react-router-dom(5.3.0)
