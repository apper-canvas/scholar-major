import { useState } from "react"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: "Scholar Hub Academy",
    academicYear: "2023-2024",
    timezone: "America/New_York",
    language: "English"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    attendanceAlerts: true,
    gradeUpdates: false,
    parentNotifications: true
  })

  const [isLoading, setIsLoading] = useState(false)

  const timezoneOptions = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" }
  ]

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" }
  ]

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings(prev => ({ ...prev, [name]: checked }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Settings saved successfully!")
    } catch (error) {
      toast.error("Failed to save settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Settings
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Manage your application preferences and configurations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 font-display">Settings Menu</h3>
              <nav className="space-y-2">
                <a href="#general" className="flex items-center gap-3 px-3 py-2 text-primary-700 bg-primary-50 rounded-lg font-medium">
                  <ApperIcon name="Settings" size={16} />
                  General
                </a>
                <a href="#notifications" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                  <ApperIcon name="Bell" size={16} />
                  Notifications
                </a>
                <a href="#security" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                  <ApperIcon name="Shield" size={16} />
                  Security
                </a>
                <a href="#data" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                  <ApperIcon name="Database" size={16} />
                  Data & Privacy
                </a>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Settings */}
            <div id="general" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <ApperIcon name="Settings" size={20} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-display">General Settings</h3>
              </div>

              <div className="space-y-6">
                <FormField
                  label="School Name"
                  name="schoolName"
                  value={generalSettings.schoolName}
                  onChange={handleGeneralChange}
                  placeholder="Enter school name"
                />

                <FormField
                  label="Academic Year"
                  name="academicYear"
                  value={generalSettings.academicYear}
                  onChange={handleGeneralChange}
                  placeholder="e.g., 2023-2024"
                />

                <FormField
                  label="Timezone"
                  name="timezone"
                  type="select"
                  value={generalSettings.timezone}
                  onChange={handleGeneralChange}
                  options={timezoneOptions}
                />

                <FormField
                  label="Language"
                  name="language"
                  type="select"
                  value={generalSettings.language}
                  onChange={handleGeneralChange}
                  options={languageOptions}
                />
              </div>
            </div>

            {/* Notification Settings */}
            <div id="notifications" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <ApperIcon name="Bell" size={20} className="text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-display">Notification Preferences</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <input
                      type="checkbox"
                      id={key}
                      name={key}
                      checked={value}
                      onChange={handleNotificationChange}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor={key} className="flex-1 font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <ApperIcon 
                      name={value ? "CheckCircle" : "Circle"} 
                      size={20} 
                      className={value ? "text-green-500" : "text-gray-400"} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="shadow-lg"
              >
                {isLoading ? (
                  <>
                    <ApperIcon name="Loader2" size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Save" size={18} />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage