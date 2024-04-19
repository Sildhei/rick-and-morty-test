"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  return (
    <div className="flex flex-row justify-center gap-6 my-6 w-[150px] border-[1px] border-gray-800 rounded-md p-1 mx-auto">
      <button
        className={`text-gray-800 text-lg ${
          Number(page) !== 1 && "hover:text-green-500"
        } ${Number(page) === 1 && "cursor-not-allowed text-gray-500"} `}
        onClick={() =>
          router.push(`/?page=${Number(page) - 1}`, {
            scroll: false,
          })
        }
        disabled={Number(page) === 1}
      >
        Prev
      </button>
      <p className="text-gray-800 text-lg font-bold">{page}</p>
      <button
        className={`text-gray-800 text-lg ${
          Number(page) !== totalPages - 1 && "hover:text-green-500"
        } ${
          Number(page) === totalPages - 1 && "cursor-not-allowed text-gray-500"
        } `}
        onClick={() =>
          router.push(`/?page=${Number(page) + 1}`, {
            scroll: false,
          })
        }
        disabled={Number(page) === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
