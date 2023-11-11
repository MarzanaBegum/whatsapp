import React, { useEffect, useRef } from "react";

interface Option {
  name: string;
  callback: () => void;
}

interface ContextMenuProps {
  options: Option[];
  coordinates: { x: number; y: number };
  contextMenu: boolean;
  setContextMenu: (value: boolean) => void;
}

const ContextMenu = ({
  options,
  coordinates,
  contextMenu,
  setContextMenu,
}: ContextMenuProps) => {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target &&
        (event.target as HTMLElement).id !== "context-opener"
      ) {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target as Node)
        ) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };
  return (
    <div
      ref={contextMenuRef}
      className="bg-dropdown-background fixed z-[100] shadow-lg py-2"
      style={{ top: coordinates.y, left: coordinates.x }}
    >
      <ul>
        {options.map(({ name, callback }: any) => (
          <li
            key={name}
            className="hover:bg-background-default-hover cursor-pointer px-2 py-2"
            onClick={(e) => handleClick(e, callback)}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
