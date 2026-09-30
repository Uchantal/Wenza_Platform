'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './dropdown.module.css';

export default function Dropdown({ id, name, options, placeholder, value: controlledValue, onChange, required = true }: { id: string; name: string; options: { value: string; label: string }[]; placeholder: string; value?: string; onChange?: (value: string) => void; required?: boolean }) {
  const [localValue, setValue] = useState('');
  const value = controlledValue ?? localValue;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const search = useRef({ text: '', time: 0 });
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open, id]);
  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    setValue(option.value);
    onChange?.(option.value);
    setOpen(false);
    button.current?.focus();
  }
  return <div className={styles.dropdown} ref={root} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }}>
    <input type="hidden" name={name} value={value} />
    <button id={id} ref={button} type="button" role="combobox" aria-required={required} aria-expanded={open} aria-controls={`${id}-options`} aria-haspopup="listbox" aria-activedescendant={open ? `${id}-option-${active}` : undefined} className={styles.selectButton} onClick={() => {
      setActive(Math.max(0, options.findIndex(option => option.value === value)));
      setOpen(!open);
    }} onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return; }
      if (event.key === 'Tab') { setOpen(false); return; }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (open) choose(active);
        else { setActive(Math.max(0, options.findIndex(option => option.value === value))); setOpen(true); }
        return;
      }
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        setOpen(true);
        setActive(index => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : Math.max(0, Math.min(options.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
      } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const now = Date.now();
        search.current.text = (now - search.current.time < 700 ? search.current.text : '') + event.key.toLowerCase();
        search.current.time = now;
        const index = options.findIndex(option => option.label.toLowerCase().startsWith(search.current.text));
        if (index >= 0) { setActive(index); setOpen(true); }
      }
    }}>
      <span>{options.find(option => option.value === value)?.label ?? placeholder}</span><span aria-hidden="true">⌄</span>
    </button>
    {open && <ul id={`${id}-options`} role="listbox" aria-label={placeholder} className={styles.options}>
      {options.map((option, index) => <li key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={value === option.value} data-active={active === index} onPointerMove={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}>{option.label}</li>)}
    </ul>}
  </div>;
}
