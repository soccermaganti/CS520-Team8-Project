import { render, screen } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import LoginPage from "@/app/login/page"
import RegisterPage from "@/app/register/page"

// Add jest-axe matchers
expect.extend(toHaveNoViolations)

// Mock the hooks and components that would cause issues in tests
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))



describe("Accessibility Tests", () => {
  it("Login page should not have accessibility violations", async () => {
    const { container } = render(<LoginPage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("Register page should not have accessibility violations", async () => {
    const { container } = render(<RegisterPage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("Login page has proper heading structure", () => {
    render(<LoginPage />)

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/login/i)
  })





  it("Register form controls have associated labels", () => {
    render(<RegisterPage />)

    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const phoneInput = screen.getByLabelText(/phone number/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(phoneInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
  })
})
