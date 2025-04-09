import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, User, Package, LogOut, Edit, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hook/useAuth";
import { useQuery } from "react-query";
import { getOrderByUserId, getUser } from "@/util/firebaseFunctions";
import Order from "@/type/Order";

export const ProfileLayout = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);

  // 주문 내역 조회
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[]>(
    ["orders", currentUser?.uid],
    () => getOrderByUserId(currentUser?.uid),
    {
      enabled: !!currentUser?.uid,
      staleTime: 60000,
    }
  );

  // 사용자 정보 조회
  // useQuery 부분에 디버깅 콘솔 추가
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery(
    ["user", currentUser?.uid],
    async () => {
      const data = await getUser(currentUser?.uid);
      console.log("Firestore에서 가져온 userData:", data); // 데이터 구조 확인용
      return data;
    },
    {
      enabled: !!currentUser?.uid,
      staleTime: 60000,
    }
  );

  // 사용자 정보 상태 초기화 - nickname으로 통일
  const [userInfo, setUserInfo] = useState({
    nickname: currentUser?.displayName || "사용자",
    email: currentUser?.email || "-",
    phone: "-",
    address: "-",
  });

  // 사용자 정보 업데이트 - 통합 로직
  useEffect(() => {
    // 데이터 구조 로깅

    // 이전 상태를 복사하지 않고 새 객체 생성
    // 이렇게 하면 이전 userInfo 상태에 의존하지 않게 됨
    const updatedInfo = {
      nickname: "", // 기본값
      email: "",
      phone: "-",
      address: "-",
    };

    // Firebase Auth 정보 적용
    if (currentUser) {
      updatedInfo.nickname = currentUser.displayName || "사용자";
      updatedInfo.email = currentUser.email || "-";
    }

    // Firestore 정보 적용 (더 구체적인 필드 검사)
    if (userData) {
      console.log("userData 필드들:", Object.keys(userData));

      // userData가 null이 아니고 객체인 경우에만 접근
      if (typeof userData === "object" && userData !== null) {
        // nickname 필드 존재 확인 후 적용
        if ("nickname" in userData && userData.nickname) {
          updatedInfo.nickname = userData.nickname;
        }
        // name 필드가 있으면 대안으로 사용
        else if ("name" in userData && userData.name) {
          updatedInfo.nickname = userData.name;
        }

        // 다른 필드들도 명시적으로 확인
        if ("email" in userData && userData.email) {
          updatedInfo.email = userData.email;
        }

        if ("phone" in userData && userData.phone) {
          updatedInfo.phone = userData.phone;
        }

        if ("address" in userData && userData.address) {
          updatedInfo.address = userData.address;
        }
      }
    }

    console.log("업데이트할 userInfo:", updatedInfo);
    setUserInfo(updatedInfo);
  }, [currentUser, userData]);

  // 타임스탬프 변환 함수
  const formatTimestamp = (timestamp: any): string => {
    if (!timestamp) return "-";

    try {
      // Firestore Timestamp
      if (typeof timestamp === "object" && "toDate" in timestamp) {
        return timestamp.toDate().toLocaleDateString();
      }

      // Date 객체
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString();
      }

      // 문자열
      return String(timestamp);
    } catch (e) {
      console.error("날짜 형식 변환 오류:", e);
      return "-";
    }
  };

  const handleGoBack = () => navigate(-1);

  const handleSaveProfile = () => {
    // 프로필 저장 로직 구현 필요
    console.log("프로필 저장:", userInfo);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* 상단 버튼 영역 */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={18} />
          뒤로가기
        </Button>

        <Button
          variant="outline"
          onClick={logout}
          className="flex items-center gap-1 text-red-500 hover:text-red-600"
        >
          <LogOut size={16} />
          로그아웃
        </Button>
      </div>

      {/* 프로필 요약 카드 */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              {userLoading ? (
                <p className="text-gray-500">로딩 중...</p>
              ) : userError ? (
                <p className="text-red-500">정보를 불러올 수 없습니다</p>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{userInfo.nickname}</h2>
                  <p className="text-gray-500">{userInfo.email}</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 내비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package size={16} />
            <span>주문내역</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>개인정보</span>
          </TabsTrigger>
        </TabsList>

        {/* 주문내역 탭 */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>주문내역</CardTitle>
              <CardDescription>
                최근 주문 내역과 배송 상태를 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  주문 내역을 불러오는 중...
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  주문 내역을 불러오는 중 오류가 발생했습니다.
                </div>
              ) : !orders || orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  주문 내역이 없습니다.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-2 text-left">주문번호</th>
                        <th className="py-3 px-2 text-left">상태</th>
                        <th className="py-3 px-2 text-left">날짜</th>
                        {/* <th className="py-3 px-2 text-center">상세보기</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 px-2">{order.id}</td>
                          <td className="py-3 px-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                order.Status === "주문 완료"
                                  ? "bg-green-100 text-green-800"
                                  : order.Status === "발송 대기"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.Status}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            {formatTimestamp(order.updatedAt)}
                          </td>
                          {/* <td className="py-3 px-2 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/orders/${order.id}`)}
                            >
                              상세보기
                            </Button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 개인정보 탭 */}
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>개인정보</CardTitle>
                <CardDescription>
                  개인정보를 확인하고 수정할 수 있습니다.
                </CardDescription>
              </div>
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1"
                  disabled={userLoading}
                >
                  <Edit size={16} />
                  정보 수정
                </Button>
              ) : (
                <Button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-1"
                >
                  <Save size={16} />
                  저장
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {userLoading ? (
                <div className="text-center py-8 text-gray-500">
                  사용자 정보를 불러오는 중...
                </div>
              ) : userError ? (
                <div className="text-center py-8 text-red-500">
                  사용자 정보를 불러오는 중 오류가 발생했습니다.
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="nickname">닉네임</Label>
                    <Input
                      id="nickname"
                      disabled={!isEditing}
                      value={userInfo.nickname}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, nickname: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      disabled={true}
                      value={userInfo.email}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="phone">연락처</Label>
                    <Input
                      id="phone"
                      disabled={!isEditing}
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="address">배송지 주소</Label>
                    <Input
                      id="address"
                      disabled={!isEditing}
                      value={userInfo.address}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, address: e.target.value })
                      }
                    />
                  </div>

                  {isEditing && (
                    <div className="grid gap-3">
                      <Label htmlFor="password">비밀번호 변경</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="새 비밀번호"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
