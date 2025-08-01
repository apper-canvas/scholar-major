import { useState } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SearchBar = ({ placeholder = "Search...", onSearch, className }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          size={18} 
          className="text-gray-400" 
        />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="pl-10 pr-10 bg-gradient-to-r from-gray-50 to-white border-gray-200 focus:from-white focus:to-white"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 transition-colors duration-200"
        >
          <ApperIcon 
            name="X" 
            size={16} 
            className="text-gray-400 hover:text-gray-600" 
          />
        </button>
      )}
    </div>
  )
}

export default SearchBar