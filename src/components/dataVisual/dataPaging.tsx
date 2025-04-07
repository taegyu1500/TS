export default function DataPaging({
  currentPage,
  totalPage,
  handlePage,
}: {
  currentPage: number;
  totalPage: number;
  handlePage: (page: number) => void;
}) {
  const pageArray = Array.from({ length: totalPage }, (_, index) => index + 1);
  return (
    <div className="flex justify-center items-center mt-4">
      <ul className="flex">
        {pageArray.map((page) => (
          <li
            key={page}
            className={`mx-1 px-3 py-1 ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => handlePage(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
}
