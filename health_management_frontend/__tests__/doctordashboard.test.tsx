import { render, screen, fireEvent } from "@testing-library/react"
import DoctorDashboard from "@/app/dashboard/doctor/page"

// Mock the hooks and components that would cause issues in tests
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

describe("Doctor Dashboard UI", () => {
  beforeEach(() => {
    // Mock date for consistent testing
    jest.spyOn(global.Date.prototype, "toLocaleString").mockImplementation(() => {
      return "5/13/2025, 9:28:02 PM"
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("renders the dashboard layout correctly", () => {
    render(<DoctorDashboard />)

    // Check for main layout elements
    expect(screen.getByText(/MedC/i)).toBeInTheDocument()

    // Check for sidebar navigation
    expect(screen.getByText(/profile/i)).toBeInTheDocument()
    expect(screen.getByText(/appointments/i)).toBeInTheDocument()
    expect(screen.getByText(/patients/i)).toBeInTheDocument()
    expect(screen.getByText(/records/i)).toBeInTheDocument()
    expect(screen.getByText(/prescriptions/i)).toBeInTheDocument()
    expect(screen.getByText(/settings/i)).toBeInTheDocument()
    expect(screen.getByText(/log out/i)).toBeInTheDocument()


  })





  it("allows tab switching", () => {
    render(<DoctorDashboard />)

    // Check that Demographics tab is active by default
    const demographicsTab = screen.getByText("Demographics")
    expect(demographicsTab).toHaveClass("bg-teal-50")

    // Click on a different tab
    fireEvent.click(screen.getByText("Living/Arrival"))

    // Check that the new tab is active
    expect(screen.getByText("Living/Arrival")).toHaveClass("bg-teal-50")
  })
})
