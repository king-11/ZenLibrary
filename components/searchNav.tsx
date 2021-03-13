import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function Nav({
  state,
  setState,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) {
  return (
    <nav>
      <ul className="flex items-center justify-between sm:px-8 px-3 py-8 text-base sm:text-lg">
        <li>
          <Link href="/create">
            <button className="px-2 sm:px-4 py-1 rounded-md shadow-md focus:outline-none hover:shadow-lg hover:scale-110 transform transition-transform hover:bg-white hover:text-cyan-600">
              Add Book
            </button>
          </Link>
        </li>
        <li className="flex-grow max-w-full pl-8">
          <form
            className="max-w-lg ml-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div
              className="border-black bg-gray-900 rounded-2xl"
              key="editor4-lamba-loomba"
            >
              <input
                type="text"
                className="rounded-2xl shadow appearance-none w-full py-1 sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                value={state}
                placeholder="Search"
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </form>
        </li>
      </ul>
    </nav>
  );
}
