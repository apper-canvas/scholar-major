import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  type = "text", 
  options = [], 
  error, 
  className,
  labelClassName,
  inputClassName,
  ...props 
}) => {
  const renderInput = () => {
    if (type === "select") {
      return (
        <Select className={cn(inputClassName)} {...props}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )
    }
    
    return <Input type={type} className={cn(inputClassName)} {...props} />
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn(labelClassName)}>
          {label}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField