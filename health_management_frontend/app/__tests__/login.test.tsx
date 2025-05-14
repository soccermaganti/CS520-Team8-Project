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
  it("renders the login form correctly", () => {
    render(<LoginPage />)

    // Check for main elements
    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument()
    expect(screen.getByText(/Enter your credentials to access your account/i)).toBeInTheDocument()

    // // Check for form elements
    // expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    // expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    // expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()

    // // Check for user type selection
    // expect(screen.getByRole("button", { name: /patient/i })).toBeInTheDocument()
    // expect(screen.getByRole("button", { name: /doctor/i })).toBeInTheDocument()

    // // Check for registration link
    // expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument()
    // expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument()
  })

//   it("has the correct visual styling", () => {
//     render(<LoginPage />)

//     // Check for the gradient background
//     const mainContainer = screen.getByTestId("login-container") || document.querySelector(".bg-gradient-to-br")
//     expect(mainContainer).toHaveClass("bg-gradient-to-br")
//     expect(mainContainer).toHaveClass("from-teal-50")
//     expect(mainContainer).toHaveClass("to-cyan-50")

//     // Check for the card styling
//     const card = screen.getByTestId("login-card") || document.querySelector(".rounded-xl")
//     expect(card).toHaveClass("bg-white")
//     expect(card).toHaveClass("shadow-xl")

//     // Check for button styling
//     const loginButton = screen.getByRole("button", { name: /login/i })
//     expect(loginButton).toHaveClass("bg-teal-600")
//     expect(loginButton).toHaveClass("hover:bg-teal-700")
//   })
})
