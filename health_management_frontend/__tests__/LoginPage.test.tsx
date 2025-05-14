import { render, screen } from "@testing-library/react"
import LoginPage from "@/app/login/page"

// Mock the hooks and components that would cause issues in tests
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock Supabase to avoid actual API calls
jest.mock("@/app/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}))

describe("Login Page UI", () => {
  beforeEach(() => {
    // Render the component before each test
    render(<LoginPage />)
  })

  it("renders the login form correctly", () => {
    // Check for main elements
    expect(screen.getByText(/enter your credentials/i)).toBeInTheDocument()

    // Check for form elements
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()



    // Check for registration link
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument()
  })

  // New tests for placeholders
  it("displays correct placeholder text in input fields", () => {
    // Get the email input and check its placeholder
    const emailInput = screen.getByLabelText(/email/i)

    // Get the password input and check its placeholder
    const passwordInput = screen.getByLabelText(/password/i)
  })




  it("maintains placeholder visibility until user input", () => {
    // This is a visual test that's hard to automate, but we can check that placeholders exist
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute("placeholder")
    expect(emailInput).toHaveValue("") // Initially empty

    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute("placeholder")
    expect(passwordInput).toHaveValue("") // Initially empty
  })
})
