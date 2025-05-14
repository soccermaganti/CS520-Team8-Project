import { render, screen, fireEvent } from "@testing-library/react"
import RegisterPage from "@/app/register/page"

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
      signUp: jest.fn(),
    },
  },
}))

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
) as jest.Mock

describe("Register Page UI", () => {
  it("renders the registration form correctly", () => {
    render(<RegisterPage />)

    // Check for main elements
    expect(screen.getByRole("heading", { name: /register as a user/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument()

    // Check for user type tabs
    expect(screen.getByRole("tab", { name: /patient/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /doctor/i })).toBeInTheDocument()

    // Check for login link
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument()
  })


})
