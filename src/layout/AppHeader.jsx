"use client";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import HeaderSettings from "../components/header/HeaderSettings";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import { useSidebar } from "../context/SidebarContext";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const AppHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  // Mock search results data
  const searchResults = [
    {
      id: 1,
      title: "Dashboard Analytics",
      description: "View your performance metrics",
      type: "Page",
      url: "/kanban",
    },
    {
      id: 2,
      title: "User Settings",
      description: "Manage your account preferences",
      type: "Page",
      url: "/kanban",
    },
    {
      id: 3,
      title: "Project Timeline",
      description: "Check project progress and deadlines",
      type: "Project",
      url: "/kanban",
    },
    {
      id: 4,
      title: "Team Members",
      description: "View and manage your team",
      type: "Team",
      url: "/kanban",
    },
    {
      id: 5,
      title: "Documentation",
      description: "Access help guides and documentation",
      type: "Resource",
      url: "/kanban",
    },
  ];

  // Check for tablet view on mount and resize
  useEffect(() => {
    const checkTabletView = () => {
      setIsTabletView(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkTabletView();
    window.addEventListener("resize", checkTabletView);

    return () => {
      window.removeEventListener("resize", checkTabletView);
    };
  }, []);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setShowSearchResults(true);
      }

      // Close search results on escape
      if (event.key === "Escape" && showSearchResults) {
        setShowSearchResults(false);
        inputRef.current?.blur();
      }

      // Close mobile search on escape
      if (event.key === "Escape" && isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
      }
    };

    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }

      // Close mobile search when clicking outside
      if (
        isMobileSearchOpen &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target) &&
        !event.target.closest(".mobile-search-icon")
      ) {
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchResults, isMobileSearchOpen]);

  // Filter results based on search query
  const filteredResults = searchQuery
    ? searchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchResults;

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSearchResults(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);
    setApplicationMenuOpen(false);
    // Focus on input when it appears
    setTimeout(() => {
      const mobileInput = document.getElementById("mobile-search-input");
      if (mobileInput) mobileInput.focus();
    }, 100);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setShowSearchResults(false);
    setSearchQuery(""); // Clear search query when closing
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200  z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b sm:h-[64px]">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6 w-full">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-50 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {/* Application Name - Visible on mobile and tablet */}
          {isTabletView ? (
            <div className="lg:ml-2">
              <p className="text-[18px] font-medium text-gray-900 dark:text-white pr-2 truncate max-w-[240px] md:max-w-[350px]">
                After Sales Support Dashboard
              </p>
            </div>
          ) : (
            <div className="lg:ml-2">
              <p className="text-[18px] font-medium text-gray-900 dark:text-white pr-2">
                After Sales Support
              </p>
            </div>
          )}

          {/* Tablet Search - Shows in the header on tablet view */}
          {isTabletView && (
            <div
              className={`
      hidden md:flex mx-2
      ${isTabletView ? "max-w-[250px] flex-shrink" : "flex-grow"}
    `}
              ref={searchRef}
            >
              <div className="relative w-full">
                <span className="absolute -translate-y-1/2 left-3 top-1/2 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-10 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute -translate-y-1/2 right-3 top-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {showSearchResults && filteredResults.length > 0 && (
                  <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white rounded-lg shadow-theme-lg top-full dark:bg-gray-900 dark:border dark:border-gray-800">
                    <div className="max-h-64 overflow-y-auto">
                      {filteredResults.map((result) => (
                        <Link
                          key={result.id}
                          href={result.url}
                          className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 last:border-b-0"
                          onClick={() => setShowSearchResults(false)}
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {result.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {result.description}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {result.type}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/search-results"
                      className="block px-4 py-3 text-sm font-medium text-center text-blue-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                      onClick={() => setShowSearchResults(false)}
                    >
                      View all results for "{searchQuery}"
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* if th application name is bigger, in tablet mode reduce the width of the search bar so the user can see the complete aplication name */}

          {/* Mobile Search Icon - Only show when search is closed and not in tablet view */}
          {!isTabletView && (
            <button
              className="lg:hidden mobile-search-icon p-2 -mr-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              onClick={() =>
                isMobileSearchOpen ? closeMobileSearch() : openMobileSearch()
              }
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Search Container - Shows at bottom of header */}
          {isMobileSearchOpen && !isTabletView && (
            <div
              className="absolute left-0 right-0 top-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2 lg:hidden"
              ref={mobileSearchRef}
            >
              <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                  <span className="absolute -translate-y-1/2 left-3 top-1/2 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </span>
                  <input
                    id="mobile-search-input"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-10 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute -translate-y-1/2 right-3 top-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={closeMobileSearch}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results for Mobile */}
              {showSearchResults && filteredResults.length > 0 && (
                <div className="absolute left-0 right-0 z-9999 mt-0 overflow-hidden bg-white rounded-lg shadow-theme-lg top-full dark:bg-gray-900 dark:border dark:border-gray-800">
                  <div className="max-h-52 overflow-y-auto">
                    {filteredResults.map((result) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 last:border-b-0"
                        onClick={closeMobileSearch}
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {result.description}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {result.type}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/search-results?q=${searchQuery}`}
                    className="block px-4 py-3 text-sm font-medium text-center text-blue-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                    onClick={closeMobileSearch}
                  >
                    View all results for "{searchQuery}"
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-50 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            {isApplicationMenuOpen ? (
              <X />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {/* Desktop Search */}
        </div>
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none  md:dark:bg-[#16181D] md:bg-white md:-mt-1 md:h-[60px]  md:border-gray-800`}
        >
          {/* Desktop Search - Hidden on tablet */}
          {!isTabletView && (
            <div className="hidden lg:block" ref={searchRef}>
              <form>
                <div className="relative">
                  <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search "
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute -translate-y-1/2 right-3 top-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* Search Results Dropdown for Desktop */}
                  {showSearchResults && filteredResults.length > 0 && (
                    <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white rounded-lg shadow-theme-lg top-full dark:bg-gray-900 dark:border dark:border-gray-800">
                      <div className="max-h-64 overflow-y-auto">
                        {filteredResults.map((result) => (
                          <Link
                            key={result.id}
                            href={result.url}
                            className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 last:border-b-0"
                            onClick={() => setShowSearchResults(false)}
                          >
                            <div className="font-medium text-gray-900 dark:text-white">
                              {result.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {result.description}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {result.type}
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/search-results"
                        className="block px-4 py-3 text-sm font-medium text-center text-blue-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                        onClick={() => setShowSearchResults(false)}
                      >
                        View all results for "{searchQuery}"
                      </Link>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}

          <div className="flex items-center gap-2 2xsm:gap-3">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeToggleButton />
            {/* <!-- Dark Mode Toggler --> */}

            <NotificationDropdown />
            {/* <!-- Notification Menu Area --> */}

            <div className=" sm:hidden border-2 dark:border-gray-800  rounded-full ml-0.5">
              <HeaderSettings />
            </div>
          </div>
          {/* <!-- User Area --> */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
