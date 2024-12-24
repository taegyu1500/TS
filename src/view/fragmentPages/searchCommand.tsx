import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getSearchRecord, createSearchRecord } from "@/util/searchRecord";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCommand() {
  const [isFocus, setIsFocus] = useState(false);
  const searchRecord = getSearchRecord();
  const navigate = useNavigate();
  const searchInput = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full z-50">
      <Command
        className="w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchInput.current) {
            const searchTerm = searchInput.current.value;
            createSearchRecord(searchTerm);
            navigate(`/search/${searchTerm}`);
          }
        }}
      >
        <CommandInput
          placeholder="검색어를 입력하세요"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          ref={searchInput}
          className="w-full"
        />
        <CommandList
          className={`${
            isFocus
              ? "visible absolute top-full left-0 w-full shadow-lg bg-white"
              : "hidden"
          }`}
        >
          <CommandGroup heading="과거 검색어">
            {searchRecord.length === 0 ? (
              <CommandItem>과거 검색어가 없습니다</CommandItem>
            ) : (
              searchRecord.map((record, index) => (
                <CommandItem key={record.name || index}>
                  <div className="flex justify-between w-full">
                    <div>{record.name}</div>
                    <div>{record.date ? record.date.toString() : ""}</div>
                  </div>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
