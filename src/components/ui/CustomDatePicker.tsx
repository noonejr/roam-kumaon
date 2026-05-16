import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { format, parse, isValid } from 'date-fns'

interface CustomDatePickerProps {
  id?: string
  label: string
  value: string
  onChange: (date: string) => void
  minDate?: string
  placeholder?: string
}

export function CustomDatePicker({ id, label, value, onChange, minDate, placeholder }: CustomDatePickerProps) {
  // Convert string 'yyyy-MM-dd' to Date object
  const selectedDate = value ? parse(value, 'yyyy-MM-dd', new Date()) : null
  const parsedMinDate = minDate ? parse(minDate, 'yyyy-MM-dd', new Date()) : undefined
  const minDateObj = parsedMinDate && isValid(parsedMinDate) ? parsedMinDate : undefined

  return (
    <div className="w-full">
      <DatePicker
        id={id}
        aria-label={label}
        placeholderText={placeholder || "Select date"}
        selected={isValid(selectedDate) ? selectedDate : null}
        onChange={(date) => onChange(date ? format(date, 'yyyy-MM-dd') : '')}
        dateFormat="yyyy-MM-dd"
        minDate={minDateObj}
        autoComplete="off"
        className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 text-sm transition-all outline-none focus:border-pine-green focus:ring-1 focus:ring-pine-green focus:bg-white"
        calendarClassName="modern-datepicker"
        popperClassName="modern-datepicker-popper"
        portalId="root-portal" // Helps with z-index/clipping in some layouts
      />
    </div>
  )
}
