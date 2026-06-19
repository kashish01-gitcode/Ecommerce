const SearchBar = () => {
  return (
    <div className="text-center border-t border-b bg-gray-50">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;