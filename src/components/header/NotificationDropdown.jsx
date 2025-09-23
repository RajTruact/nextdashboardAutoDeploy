"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { X, Trash2, Bell } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [filter, setFilter] = useState("all"); // "all" or "unread"
  const dropdownRef = useRef(null);

  // Mock notification data with "read" state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Terry Franci",
      message: "requested permission to change",
      project: "Project - Nganter App",
      type: "Project",
      time: "5 min ago",
      status: "online",
      read: false,
    },
    {
      id: 2,
      name: "Alena Franci",
      message: "added a new document",
      project: "Project - ResearchX",
      type: "Document",
      time: "8 min ago",
      status: "online",
      read: false,
    },
    {
      id: 3,
      name: "Brandon Philips",
      message: "commented on your task",
      project: "Project - DesignPro",
      type: "Task",
      time: "1 hr ago",
      status: "error",
      read: false,
    },
    {
      id: 4,
      name: "Sophia Loren",
      message: "assigned you a new task",
      project: "Project - AI Engine",
      type: "Task",
      time: "2 hrs ago",
      status: "online",
      read: false,
    },
    {
      id: 5,
      name: "David Warner",
      message: "uploaded new files",
      project: "Project - CloudHub",
      type: "File",
      time: "3 hrs ago",
      status: "online",
      read: false,
    },
    {
      id: 6,
      name: "Brandon Philips",
      message: "commented on your task",
      project: "Project - DesignPro",
      type: "Task",
      time: "5 hr ago",
      status: "error",
      read: true,
    },
    {
      id: 7,
      name: "Sophia Loren",
      message: "assigned you a new task",
      project: "Project - AI Engine",
      type: "Task",
      time: "6 hrs ago",
      status: "online",
      read: true,
    },
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    // When opening the dropdown, mark as interacted and reset unread count
    if (newState) {
      setHasInteracted(true);
    }
  };

  const closeDropdown = () => setIsOpen(false);

  // Calculate unread count - show 0 if user has interacted with the dropdown
  const unreadCount = hasInteracted
    ? 0
    : notifications.filter((n) => !n.read).length;

  // remove single notification
  const removeNotification = (id, e) => {
    e.stopPropagation(); // Prevent triggering the markAsRead function
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // clear all
  const clearAll = (e) => {
    e.stopPropagation();
    setNotifications([]);
  };

  // mark one notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // mark all as read
  const markAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setHasInteracted(true);
  };

  // Filter notifications based on selected filter
  // const filteredNotifications = notifications.filter((n) => {
  //   if (filter === "unread") return !n.read;
  //   return true;
  // });

  // Sort notifications: unread first, then by time (newest first)
  // const sortedNotifications = [...filteredNotifications].sort((a, b) => {
  //   if (a.read !== b.read) {
  //     return a.read ? 1 : -1;
  //   }
  //   // Simple time comparison - in a real app you'd parse the time strings
  //   return a.id > b.id ? -1 : 1;
  // });

  const filteredNotifications = [...notifications]
    .filter((n) => (filter === "unread" ? !n.read : true))
    .sort((a, b) => a.minutesAgo - b.minutesAgo);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification button with badge */}
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={toggleDropdown}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-0.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-[11px] font-bold text-white">
            {unreadCount}
            <span className="absolute inline-flex w-full h-full rounded-full bg-orange-400 opacity-75 animate-ping"></span>
          </span>
        )}
        <Bell className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      <Dropdown
        isOpen={isOpen}
        ref={dropdownRef}
        className="absolute left-[30vw] -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 flex max-h-[480px] w-[390px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-[#444] dark:text-gray-200">
            Notifications
          </h5>
          <div className="flex items-center gap-3">
            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[13px] text-blue-500 hover:text-blue-600"
                aria-label="Mark all as read"
              >
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-[13px] text-red-500 hover:text-red-600"
                aria-label="Clear all notifications"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex mb-3 bg-gray-100 rounded-lg p-1 dark:bg-gray-800">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-1.5 px-2 text-sm font-medium rounded-md transition-colors ${
              filter === "all"
                ? "bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`flex-1 py-1.5 px-2 text-sm font-medium rounded-md transition-colors ${
              filter === "unread"
                ? "bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            Unread
          </button>
        </div>

        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {filteredNotifications.length === 0 ? (
            <li className="p-4 text-center text-gray-500 dark:text-gray-400">
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications yet"}
            </li>
          ) : (
            filteredNotifications.map((n) => (
              <li
                key={n.id}
                className={`flex items-start justify-between ${
                  !n.read ? "bg-orange-50 dark:bg-[#333d4e]" : ""
                } transition-colors duration-200`}
              >
                <DropdownItem
                  onItemClick={() => {
                    markAsRead(n.id);
                    closeDropdown();
                  }}
                  className="flex flex-1 gap-3 rounded-lg border-b border-gray-100 p-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                >
                  <span className="block">
                    <span className="block mb-1.5 space-x-1 text-sm">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {n.name}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {n.message}
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {n.project}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{n.type}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{n.time}</span>
                    </span>
                  </span>
                </DropdownItem>

                <button
                  onClick={(e) => removeNotification(n.id, e)}
                  className="p-2 text-gray-400 hover:text-red-500"
                  aria-label={`Remove notification from ${n.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))
          )}
        </ul>

        <Link
          href="/notifications"
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={closeDropdown}
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
