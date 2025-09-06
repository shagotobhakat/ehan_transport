"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { CircleXIcon } from "lucide-react";

const PopoverContext = React.createContext(undefined);

function Popover({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value) => {
      const newValue = typeof value === "function" ? value(open) : value;
      if (!isControlled) {
        setUncontrolledOpen(newValue);
      }
      if (onOpenChange) {
        onOpenChange(newValue);
      }
    },
    [isControlled, onOpenChange, open]
  );

  // Close popover when clicking outside
  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      const popoverContents = document.querySelectorAll(
        "[data-popover-content]"
      );
      let isClickInside = false;

      popoverContents.forEach((content) => {
        if (content.contains(event.target)) {
          isClickInside = true;
        }
      });

      if (!isClickInside) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  // Hide/show body scrollbar
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      {children}
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({ asChild, children, onClick }) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger must be used within a Popover");

  const { open, setOpen } = context;

  const handleClick = (e) => {
    setOpen(!open);
    if (onClick) onClick(e);
  };

  if (asChild) {
    return (
      <>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              onClick: (e) => {
                handleClick(e);
                if (child.props.onClick) child.props.onClick(e);
              },
            });
          }
          return child;
        })}
      </>
    );
  }

  return (
    <button type="button" onClick={handleClick} aria-expanded={open}>
      {children}
    </button>
  );
}

const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    const context = React.useContext(PopoverContext);
    if (!context)
      throw new Error("PopoverContent must be used within a Popover");

    const { open, setOpen } = context;
    if (!open) return null;

    return (
      <>
        {/* Background overlay */}
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
          style={{ opacity: open ? 1 : 0 }}
        />
        {/* Popover box */}
        <div
          ref={ref}
          data-popover-content
          className={cn(
            "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-100 max-w-[90vw] rounded-md border bg-neutral-800 p-8 shadow-md outline-none",
            "max-h-[calc(100vh-2rem)] overflow-y-auto",
            className
          )}
          {...props}>
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 z-10 p-1 bg-white backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all duration-200">
            <CircleXIcon className="w-6 h-6 text-neutral-800" />
          </button>
          {props.children}
        </div>
      </>
    );
  }
);

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
