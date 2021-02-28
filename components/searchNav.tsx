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
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/create">
            <button className="text-blue-600 dark:text-gray-500 text-xl dark:bg-white px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white shadow-md focus:outline-none">
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
              className="border-black bg-gray-900 dark:bg-white rounded-2xl"
              key="editor4-lamba-loomba"
            >
              <input
                type="text"
                className="rounded-2xl shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
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