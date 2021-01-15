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
          <Link href="/">
            <div className="text-blue-500 no-underline text-accent-1 dark:text-blue-300 text-lg py-1 px-2">
              Home
            </div>
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
                className="px-4 py-1 rounded-2xl"
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
