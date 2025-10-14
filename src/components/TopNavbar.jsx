import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";

function TopNavbar(props) {
  const { activeItem, isSearchOpen, setIsSearchOpen, inputRef, searchQuery, setSearchQuery, setIsNotificationSidebarOpen, hasNotification } = props;
  return (
    <div className="bg-white border-b border-gray-300 px-6 py-4 flex justify-between items-center">
  <h2 className="text-xl font-semibold text-gray-800">{activeItem}</h2>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li className="relative">
          {isSearchOpen ? (
            <div ref={inputRef} className="flex items-center border border-gray-300 rounded overflow-hidden" style={{ width: "200px" }}>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") alert(`Searching: ${searchQuery}`);
                  else if (e.key === "Escape") setIsSearchOpen(false);
                }}
                placeholder="Search..."
                className="px-2 py-1 w-full focus:outline-none"
              />
              <button className="px-3 text-gray-600 hover:text-blue-600" type="button">
                <IoIosSearch />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-blue-600 text-2xl" type="button">
              <IoIosSearch />
            </button>
          )}
        </li>
        <li className="relative hover:text-blue-600 text-2xl cursor-pointer" onClick={() => setIsNotificationSidebarOpen((p) => !p)}>
          <GoBell />
          {hasNotification && <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-600 rounded-full ring-2 ring-white"></span>}
        </li>
      </ul>
    </div>
  );
}

export default TopNavbar;
