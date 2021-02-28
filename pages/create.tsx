import GitHubNav from 'components/githubNav';

export default function Create() {
  return (
    <main>
      <GitHubNav />
      <div className="flex md:flex-row flex-col container mx-auto md:justify-around items-center px-auto">
        <div className="md:order-2 lg:max-w-lg md:max-w-sm max-w-xs">
          <img src="/images/bookart.jpg" loading="lazy" alt="book art" className="object-cover" />
        </div>
        <div className="flex-grow md:order-1 py-6 md:pr-4 md:w-full w-80">
          <h1 className="text-3xl font-bold mb-10 md:text-left text-center">Add A New Book</h1>
          <div className="flex items-center py-2 md:justify-start justify-center">
            <hr className="w-14 border-2 hidden mr-6 md:inline-block dark:border-white border-black" />
            <p className="text-lg font-semibold ">Provide Details</p>
          </div>
          <form className="flex flex-col py-4 max-w-lg items-center md:items-start" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full">
              <h2 className="py-1">Title</h2>
              <input
                  type="text"
                  className="rounded-md shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
            </div>
            <div className="w-full">
              <h2 className="py-1">Author</h2>
              <input
                  type="text"
                  className="rounded-md shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
            </div>
            <button className="dark:bg-white text-blue-600 focus:outline-none mt-10 h-14 w-14 rounded-full text-center shadow-md hover:shadow-lg">
              <img src="/images/arrow.png" alt="" aria-hidden className="h-6"/>
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
