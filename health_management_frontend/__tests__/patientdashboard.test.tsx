import { render, screen } from "@testing-library/react"
import PatientDashboard from "@/app/dashboard/patient/page"

// Mock the hooks and components that would cause issues in tests
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})



describe("Patient Dashboard UI", () => {
  it("renders the dashboard layout correctly", () => {
    render(<PatientDashboard />)

    // Check for main layout elements
    expect(screen.getByText(/MedC/i)).toBeInTheDocument()

    // Check for sidebar navigation
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/profile/i)).toBeInTheDocument()
    expect(screen.getByText(/appointments/i)).toBeInTheDocument()
    expect(screen.getByText(/records/i)).toBeInTheDocument()
    expect(screen.getByText(/medications/i)).toBeInTheDocument()
    expect(screen.getByText(/settings/i)).toBeInTheDocument()
    expect(screen.getByText(/log out/i)).toBeInTheDocument()

  })






})
