// layout/AppSidebar.jsx
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDown,
  FlipHorizontal2Icon,
  Settings,
  Settings2Icon,
} from "lucide-react";
import { Dropdown } from "../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../components/ui/dropdown/DropdownItem";
import sidebarConfig from "../config/sidebarConfig";

const AppSidebar = ({ role = "admin" }) => {
  const pathname = usePathname();
  const roles = pathname.split("/")[1];
  const { isExpanded, isMobileOpen, isHovered } = useSidebar();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isActive = useCallback((path) => path === pathname, [pathname]);

  // Get the correct sidebar config based on role
  //
  const roleConfig = sidebarConfig[role] || sidebarConfig.admin;

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) =>
      prev?.type === menuType && prev?.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDown
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active "
                      : "menu-item-icon-inactive "
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-text-wrapper">
                    <span
                      className="menu-text"
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        const wrapper = el.parentElement;

                        // Reset animation so it can retrigger
                        el.style.animation = "none";

                        // केवल तभी animate जब text container से बड़ा हो
                        if (el.scrollWidth > wrapper.offsetWidth) {
                          const shift = `-${
                            el.scrollWidth - wrapper.offsetWidth
                          }px`;

                          // Pass dynamic distance via CSS variable
                          el.style.setProperty("--shift", shift);

                          // Force reflow to restart animation
                          void el.offsetWidth;

                          // Animation run करो
                          el.style.animation =
                            "marquee-once 0.8s linear forwards";
                        }
                      }}
                      onAnimationEnd={(e) => {
                        const el = e.currentTarget;

                        // Animation खत्म होने के बाद delay रखो (जैसे 1s)
                        setTimeout(() => {
                          el.style.animation = "none"; // reset so next hover can retrigger
                        }, 500); // 500ms = 0.5s delay
                      }}
                    >
                      {nav.name}
                    </span>
                  </span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => (subMenuRefs.current[`${menuType}-${index}`] = el)}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((sub) => (
                  <li key={sub.heading || sub.name}>
                    {sub.heading ? (
                      <div className="mb-2">
                        <h4 className="flex items-center gap-2 text-xs uppercase text-gray-400 dark:text-gray-500 ml-0 mb-2 mt-4">
                          {sub.icon && (
                            <span className="w-4 h-4">{sub.icon}</span>
                          )}
                          <span className="menu-text-wrapper">
                            <span
                              className="menu-text"
                              onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                const wrapper = el.parentElement;

                                // Reset animation so it can retrigger
                                el.style.animation = "none";

                                // Only animate if text is longer than container
                                if (el.scrollWidth > wrapper.offsetWidth) {
                                  const shift = `-${
                                    el.scrollWidth - wrapper.offsetWidth
                                  }px`;

                                  // Pass dynamic distance via CSS variable
                                  el.style.setProperty("--shift", shift);

                                  // Force reflow to restart animation
                                  void el.offsetWidth;

                                  el.style.animation =
                                    "marquee-once 0.8s linear forwards";
                                }
                              }}
                              onAnimationEnd={(e) => {
                                const el = e.currentTarget;

                                // Animation खत्म होने के बाद delay रखो (जैसे 1s)
                                setTimeout(() => {
                                  el.style.animation = "none"; // reset so next hover can retrigger
                                }, 500); // 500ms = 0.5s delay
                              }}
                            >
                              {sub.heading}
                            </span>
                          </span>
                        </h4>
                        <ul className="ml-1 space-y-1">
                          {sub.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.path}
                                className={`menu-dropdown-item flex items-center gap-2 ${
                                  isActive(child.path)
                                    ? "menu-dropdown-item-active"
                                    : "menu-dropdown-item-inactive"
                                }`}
                              >
                                {child.icon && (
                                  <span className="menu-dropdown-icon">
                                    {child.icon}
                                  </span>
                                )}
                                <span className="menu-text-wrapper">
                                  <span
                                    className="menu-text"
                                    onMouseEnter={(e) => {
                                      const el = e.currentTarget;
                                      const wrapper = el.parentElement;

                                      // Reset animation so it can retrigger
                                      el.style.animation = "none";

                                      // Only animate if text is longer than container
                                      if (
                                        el.scrollWidth > wrapper.offsetWidth
                                      ) {
                                        const shift = `-${
                                          el.scrollWidth - wrapper.offsetWidth
                                        }px`;

                                        // Pass dynamic distance via CSS variable
                                        el.style.setProperty("--shift", shift);

                                        // Force reflow to restart animation
                                        void el.offsetWidth;

                                        el.style.animation =
                                          "marquee-once 0.8s linear forwards";
                                      }
                                    }}
                                    onAnimationEnd={(e) => {
                                      const el = e.currentTarget;

                                      // Animation खत्म होने के बाद delay रखो (जैसे 1s)
                                      setTimeout(() => {
                                        el.style.animation = "none"; // reset so next hover can retrigger
                                      }, 500); // 500ms = 0.5s delay
                                    }}
                                  >
                                    {child.name}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={sub.path}
                        className={`menu-dropdown-item flex items-center gap-2 ${
                          isActive(sub.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {sub.icon && (
                          <span className="menu-dropdown-icon">{sub.icon}</span>
                        )}
                        {sub.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  // Auto expand active submenu
  useEffect(() => {
    Object.entries(roleConfig).forEach(([type, items]) => {
      items.forEach((nav, index) => {
        nav.subItems?.forEach((sub) => {
          if (isActive(sub.path)) {
            setOpenSubmenu({ type, index });
          }
        });
      });
    });
  }, [pathname, isActive, roleConfig]);

  // Calculate submenu height
  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[260px]"
            : isHovered
            ? "w-[260px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      {/* Logo */}
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="https://www.truact.in/Truact_logo_reverse-01.png"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="https://www.truact.in/Truact_logo_reverse-01.png"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="https://www.truact.in/favicon.png"
              alt="Logo"
              width={28}
              height={28}
            />
          )}
        </Link>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <FlipHorizontal2Icon />
                )}
              </h2>
              {renderMenuItems(roleConfig.main, "main")}
            </div>

            <div>{renderMenuItems(roleConfig.others, "others")}</div>
          </div>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="mt-auto py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="relative">
          <button
            onClick={toggleSettings}
            className={`menu-item group dropdown-toggle w-full ${
              isSettingsOpen ? "menu-item-active" : "menu-item-inactive"
            } ${
              !isExpanded && !isHovered
                ? "lg:justify-center"
                : "lg:justify-start"
            }`}
          >
            <span
              className={`${
                isSettingsOpen
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }`}
            >
              <Settings className="w-5 h-5" />
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">Settings</span>
            )}
            {(isExpanded || isHovered || isMobileOpen) && (
              <ChevronDown
                className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                  isSettingsOpen ? "rotate-180 text-brand-500" : ""
                }`}
              />
            )}
          </button>
          {isExpanded && (
            <Dropdown
              isOpen={isSettingsOpen}
              onClose={closeSettings}
              className="left-0 right-0 bottom-full mb-2 w-full"
            >
              <div className="py-1">
                <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                  <li>
                    <DropdownItem
                      onItemClick={closeSettings}
                      tag="a"
                      href={`/${roles}/support`}
                      className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      <svg
                        className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.0991 7.52507C11.0991 8.02213 11.5021 8.42507 11.9991 8.42507H12.0001C12.4972 8.42507 12.9001 8.02213 12.9001 7.52507C12.9001 7.02802 12.4972 6.62507 12.0001 6.62507H11.9991C11.5021 6.62507 11.0991 7.02802 11.0991 7.52507ZM12.0001 17.3714C11.5859 17.3714 11.2501 17.0356 11.2501 16.6214V10.9449C11.2501 10.5307 11.5859 10.1949 12.0001 10.1949C12.4143 10.1949 12.7501 10.5307 12.7501 10.9449V16.6214C12.7501 17.0356 12.4143 17.3714 12.0001 17.3714Z"
                          fill=""
                        />
                      </svg>
                      Support
                    </DropdownItem>
                  </li>

                  <li>
                    <Link href={`/${roles}/profile`}>
                      <DropdownItem
                        onItemClick={closeSettings}
                        tag="a"
                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <svg
                          className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.4858 3.5L13.5182 3.5C13.9233 3.5 14.2518 3.82851 14.2518 4.23377C14.2518 5.9529 16.1129 7.02795 17.602 6.1682C17.9528 5.96567 18.4014 6.08586 18.6039 6.43667L20.1203 9.0631C20.3229 9.41407 20.2027 9.86286 19.8517 10.0655C18.3625 10.9253 18.3625 13.0747 19.8517 13.9345C20.2026 14.1372 20.3229 14.5859 20.1203 14.9369L18.6039 17.5634C18.4013 17.9142 17.9528 18.0344 17.602 17.8318C16.1129 16.9721 14.2518 18.0471 14.2518 19.7663C14.2518 20.1715 13.9233 20.5 13.5182 20.5H10.4858C10.0804 20.5 9.75182 20.1714 9.75182 19.766C9.75182 18.0461 7.88983 16.9717 6.40067 17.8314C6.04945 18.0342 5.60037 17.9139 5.39767 17.5628L3.88167 14.937C3.67903 14.586 3.79928 14.1372 4.15026 13.9346C5.63949 13.0748 5.63946 10.9253 4.15025 10.0655C3.79926 9.86282 3.67901 9.41401 3.88165 9.06303L5.39764 6.43725C5.60034 6.08617 6.04943 5.96581 6.40065 6.16858C7.88982 7.02836 9.75182 5.9539 9.75182 4.23399C9.75182 3.82862 10.0804 3.5 10.4858 3.5ZM13.5182 2L10.4858 2C9.25201 2 8.25182 3.00019 8.25182 4.23399C8.25182 4.79884 7.64013 5.15215 7.15065 4.86955C6.08213 4.25263 4.71559 4.61859 4.0986 5.68725L2.58261 8.31303C1.96575 9.38146 2.33183 10.7477 3.40025 11.3645C3.88948 11.647 3.88947 12.3531 3.40026 12.6355C2.33184 13.2524 1.96578 14.6186 2.58263 15.687L4.09863 18.3128C4.71562 19.3814 6.08215 19.7474 7.15067 19.1305C7.64015 18.8479 8.25182 19.2012 8.25182 19.766C8.25182 20.9998 9.25201 22 10.4858 22H13.5182C14.7519 22 15.7518 20.9998 15.7518 19.7663C15.7518 19.2015 16.3632 18.8487 16.852 19.1309C17.9202 19.7476 19.2862 19.3816 19.9029 18.3134L21.4193 15.6869C22.0361 14.6185 21.6701 13.2523 20.6017 12.6355C20.1125 12.3531 20.1125 11.647 20.6017 11.3645C21.6701 10.7477 22.0362 9.38152 21.4193 8.3131L19.903 5.68667C19.2862 4.61842 17.9202 4.25241 16.852 4.86917C16.3632 5.15138 15.7518 4.79856 15.7518 4.23377C15.7518 3.00024 14.7519 2 13.5182 2ZM9.6659 11.9999C9.6659 10.7103 10.7113 9.66493 12.0009 9.66493C13.2905 9.66493 14.3359 10.7103 14.3359 11.9999C14.3359 13.2895 13.2905 14.3349 12.0009 14.3349C10.7113 14.3349 9.6659 13.2895 9.6659 11.9999ZM12.0009 8.16493C9.88289 8.16493 8.1659 9.88191 8.1659 11.9999C8.1659 14.1179 9.88289 15.8349 12.0009 15.8349C14.1189 15.8349 15.8359 14.1179 15.8359 11.9999C15.8359 9.88191 14.1189 8.16493 12.0009 8.16493Z"
                            fill=""
                          />
                        </svg>
                        Account settings
                      </DropdownItem>
                    </Link>
                  </li>

                  {roles === "superadmin" && (
                    <li>
                      <DropdownItem
                        onItemClick={closeSettings}
                        tag="a"
                        href={`/${roles}/app-setting`}
                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <Settings2Icon />
                        App Settings
                      </DropdownItem>
                    </li>
                  )}
                </ul>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
