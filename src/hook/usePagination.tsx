import { useState, useEffect } from "react";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  pageLimit: number;
}

export const usePagination = ({
  totalPage,
  currentPage,
  pageLimit,
}: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const totalPageCount = Math.ceil(totalPage / pageLimit);
    const pageArray = Array.from(
      { length: totalPageCount },
      (_, index) => index + 1
    );
    setPages(pageArray);
  }, [totalPage, pageLimit]);

  const handlePage = (page: number) => {
    if (page === currentPage) return;
    // 페이지 이동 로직
    // Keep the existing pages array structure
    setPages((prevPages) => prevPages);
  };

  return { pages, handlePage };
};
