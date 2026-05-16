import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { clsx } from 'clsx'

interface CustomSelectProps {
  id?: string
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

export function CustomSelect({ id, value, options, onChange, label }: CustomSelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton
          id={id}
          className={clsx(
            "relative w-full h-12 pl-4 pr-10 text-left cursor-default rounded-lg border border-slate-200 bg-slate-50 text-sm transition-all outline-none",
            "focus:border-pine-green focus:ring-1 focus:ring-pine-green focus:bg-white"
          )}
        >
          <span className="block truncate">{value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
            </svg>
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:duration-100 data-[leave]:ease-in"
        >
          {options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className={({ focus }) =>
                clsx(
                  'relative cursor-default select-none py-2.5 pl-4 pr-10 transition-colors',
                  focus ? 'bg-pine-green text-white' : 'text-slate-900'
                )
              }
            >
              {({ selected }) => (
                <>
                  <span className={clsx('block truncate', selected ? 'font-semibold' : 'font-normal')}>
                    {option}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
