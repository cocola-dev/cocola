"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { people } from "./data";
import { getCaretCoordinates, getCurrentWord, replaceWord } from "./utils";

interface Props {
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}

export function Write({ textValue, setTextValue, isLoading = false }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [commandValue, setCommandValue] = useState("");

  // TODO: check if this is possible?!?
  // const texarea = textareaRef.current;
  // const dropdown = dropdownRef.current;

  const handleBlur = useCallback((e: Event) => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.classList.add("hidden");
      setCommandValue("");
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const textarea = textareaRef.current;
    const input = inputRef.current;
    const dropdown = dropdownRef.current;
    if (textarea && input && dropdown) {
      const currentWord = getCurrentWord(textarea);
      const isDropdownHidden = dropdown.classList.contains("hidden");
      if (currentWord.startsWith("@") && !isDropdownHidden) {
        // FIXME: handle Escape
        if (
          e.key === "ArrowUp" ||
          e.keyCode === 38 ||
          e.key === "ArrowDown" ||
          e.keyCode === 40 ||
          e.key === "Enter" ||
          e.keyCode === 13 ||
          e.key === "Escape" ||
          e.keyCode === 27
        ) {
          e.preventDefault();
          input.dispatchEvent(new KeyboardEvent("keydown", e));
        }
      }
    }
  }, []);

  const onTextValueChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      const textarea = textareaRef.current;
      const dropdown = dropdownRef.current;

      if (textarea && dropdown) {
        const caret = getCaretCoordinates(textarea, textarea.selectionEnd);
        const currentWord = getCurrentWord(textarea);
        setTextValue(text);
        if (currentWord.startsWith("@")) {
          setCommandValue(currentWord);
          dropdown.style.left = caret.left + "px";
          dropdown.style.top = caret.top + caret.height + "px";
          dropdown.classList.remove("hidden");
        } else {
          // REMINDER: apparently, we need it when deleting
          if (commandValue !== "") {
            setCommandValue("");
            dropdown.classList.add("hidden");
          }
        }
      }
    },
    [setTextValue, commandValue],
  );

  const onCommandSelect = useCallback((value: string) => {
    const textarea = textareaRef.current;
    const dropdown = dropdownRef.current;
    if (textarea && dropdown) {
      replaceWord(textarea, `${value}`);
      setCommandValue("");
      dropdown.classList.add("hidden");
    }
  }, []);

  const handleMouseDown = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleSectionChange = useCallback(
    (e: Event) => {
      const textarea = textareaRef.current;
      const dropdown = dropdownRef.current;
      if (textarea && dropdown) {
        const currentWord = getCurrentWord(textarea);
        // console.log(currentWord);
        if (!currentWord.startsWith("@") && commandValue !== "") {
          setCommandValue("");
          dropdown.classList.add("hidden");
        }
      }
    },
    [commandValue],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    const dropdown = dropdownRef.current;
    textarea?.addEventListener("keydown", handleKeyDown);
    textarea?.addEventListener("blur", handleBlur);
    document?.addEventListener("selectionchange", handleSectionChange);
    dropdown?.addEventListener("mousedown", handleMouseDown);
    return () => {
      textarea?.removeEventListener("keydown", handleKeyDown);
      textarea?.removeEventListener("blur", handleBlur);
      document?.removeEventListener("selectionchange", handleSectionChange);
      dropdown?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleBlur, handleKeyDown, handleMouseDown, handleSectionChange]);

  return (
    <div className="w-full relative">
      <Textarea
        ref={textareaRef}
        className=" h-auto"
        value={textValue}
        onChange={onTextValueChange}
        rows={10}
        disabled={isLoading}
      />
      <Command
        ref={dropdownRef}
        className={cn(
          "max-w-min absolute hidden h-auto max-h-32 border border-popover shadow overflow-y-scroll",
        )}
      >
        <div className="hidden">
          {/* REMINDER: className="hidden" won't hide the SearchIcon and border */}
          <CommandInput ref={inputRef} value={commandValue} />
        </div>
        <CommandGroup className="overflow-auto max-w-min">
          {people.map((p) => {
            return (
              <CommandItem
                key={p.username}
                value={p.username}
                onSelect={onCommandSelect}
              >
                {p.username}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </Command>
    </div>
  );
}
