import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

function Accordion({ title, items, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(false); // optional: close after selection
    if (onSelect) {
      onSelect(title.toLowerCase(), item); // Pass type and value to parent
    }
  };

  return (
    <div className="border-b border-white/30 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium">{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {open && (
        <div className="mt-2 space-y-1">
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(item)}
              className={`flex items-center justify-between px-2 py-1 rounded hover:bg-white/10 cursor-pointer ${
                selected === item ? "bg-white/20" : ""
              }`}
            >
              <span>{item}</span>
              <span className="text-xs">{selected === item ? "✓" : ""}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accordion;
