import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

interface SortOptionsProps {
  optionType?: "list" | "card";
  selectedSortOption: string;
  setSelectSortOption: (option: string) => void;
  filterProduct: (category: string | null) => void;
  resetProduct: () => void;
  selectedPagingCount: number;
  setSelectedPagingCount: (count: number) => void;
}

export default function SortOptions({
  optionType = "list",
  selectedSortOption,
  setSelectSortOption,
  filterProduct,
  resetProduct,
  selectedPagingCount,
  setSelectedPagingCount,
}: SortOptionsProps) {
  // 부모 컴포넌트로 넘겨받은 함수
  return (
    <div>
      {optionType === "list" ? (
        <Card>
          <CardTitle className="ml-5 mt-5 mb-5">정렬 옵션</CardTitle>
          <CardContent>
            <div className="flex flex-col flex-1">
              <div className="flex flex-row items-center w-full">
                <p className="mr-4 w-20">정렬</p> {/* 고정 너비 설정 */}
                <RadioGroup
                  className="flex flex-row flex-wrap flex-grow"
                  value={selectedSortOption}
                  onValueChange={(value) => setSelectSortOption(value)}
                >
                  {["의류", "가전제품", "가구", "생활용품", "식품", "기타"].map(
                    (category) => (
                      <div className="flex items-center mr-4" key={category}>
                        <RadioGroupItem id={category} value={category} />
                        <Label htmlFor={category} className="ml-2">
                          {category}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-4 w-20">표시 개수</p>
                <Select
                  defaultValue={selectedPagingCount.toString()}
                  onValueChange={(value) => setSelectedPagingCount(+value)}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder={`${selectedPagingCount}개`} />
                  </SelectTrigger>
                  <SelectContent>
                    {["10", "20", "30", "40", "50"].map((count) => (
                      <SelectItem key={count} value={count}>
                        {count}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => filterProduct(selectedSortOption)}>
              검색
            </Button>
            <Button onClick={() => resetProduct()}>초기화</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardTitle className="p-5 bg-gray-50 border-b">상세 검색</CardTitle>

          <CardContent className="p-5">
            <div className="space-y-6">
              {/* 카테고리 섹션 */}
              <div>
                <h3 className="text-sm font-medium mb-3">카테고리</h3>
                <RadioGroup
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                  value={selectedSortOption}
                  onValueChange={(value) => setSelectSortOption(value)}
                >
                  {["의류", "가전제품", "가구", "생활용품", "식품", "기타"].map(
                    (category) => (
                      <div
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 min-h-[40px]"
                        key={category}
                      >
                        <RadioGroupItem
                          id={`card-${category}`}
                          value={category}
                        />
                        <Label
                          htmlFor={`card-${category}`}
                          className="cursor-pointer whitespace-nowrap"
                        >
                          {category}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </div>

              {/* 표시 개수 섹션 */}
              <div>
                <h3 className="text-sm font-medium mb-3">표시 개수</h3>
                <Select
                  defaultValue={selectedPagingCount.toString()}
                  onValueChange={(value) => setSelectedPagingCount(+value)}
                >
                  <SelectTrigger className="w-full max-w-[200px]">
                    <SelectValue placeholder={`${selectedPagingCount}개`} />
                  </SelectTrigger>
                  <SelectContent>
                    {["4", "8", "12", "16", "20"].map((count) => (
                      <SelectItem key={count} value={count}>
                        {count}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-5 py-4 bg-gray-50 border-t flex justify-between">
            <div className="space-x-2">
              <Button
                onClick={() => filterProduct(selectedSortOption)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                검색
              </Button>
              <Button onClick={() => resetProduct()} variant="outline">
                초기화
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
