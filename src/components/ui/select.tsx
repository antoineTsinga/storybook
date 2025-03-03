interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue?: string;
  label?: string;
  id?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  defaultValue = "",
  label = "",
  id = "select-field",
  onChange = () => {},
  disabled = false,
  error = "",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleSelect = (value: string): void => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        id={id}
        disabled={disabled}
        className={`relative w-full bg-white border rounded-md py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          disabled ? 'bg-gray-100 text-gray-500' : ''
        } ${error ? 'border-red-500' : 'border-gray-300'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">
          {selectedValue 
            ? options.find(option => option.value === selectedValue)?.label || selectedValue
            : "Sélectionner..."}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 ${
                  selectedValue === option.value ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className={`block truncate ${selectedValue === option.value ? 'font-medium' : 'font-normal'}`}>
                  {option.label}
                </span>
                {selectedValue === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;