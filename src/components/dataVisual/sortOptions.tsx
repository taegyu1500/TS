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
        <Card>
          <CardTitle className="ml-5 mt-5">상세 검색</CardTitle>
          <CardContent>
            {/* 타입구별할 것 */}
            <div className="flex flex-col flex-1">
              <div className="flex flex-row items-center w-full">
                <RadioGroup
                  className="flex flex-col flex-wrap flex-grow mt-4"
                  value={selectedSortOption}
                  onValueChange={(value) => setSelectSortOption(value)}
                >
                  {["의류", "가전제품", "가구", "생활용품", "식품", "기타"].map(
                    (category) => (
                      <div
                        className="flex flex-items-center mr-4"
                        key={category}
                      >
                        <RadioGroupItem id={category} value={category} />
                        <Label htmlFor={category} className="ml-2">
                          {category}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
                <div>
                  <Select
                    defaultValue="4"
                    onValueChange={(value) => {
                      setSelectedPagingCount(+value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="10개" />
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <Button onClick={() => filterProduct(selectedSortOption)}>
              검색
            </Button>
            <Button onClick={() => resetProduct()}>초기화</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
