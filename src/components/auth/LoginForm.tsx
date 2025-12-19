"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, AuthError } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Phone, KeyRound } from "lucide-react"
import { checkUserExists } from "@/actions/auth"
import { formatPhoneNumber } from "@/lib/utils"

// Test phone numbers from main task
const TEST_PHONE_NUMBERS = [
  "+1 650-555-0125",
  "+1 650-555-0123",
  "+1 650-555-0124",
  "+16505550125",
  "+16505550123",
  "+16505550124"
];

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  // Validate phone number format (E.164)
  const isValidPhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters except +
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    // E.164 format validation: + followed by 1-15 digits
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(cleanedPhone);
  }


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits, +, -, and space
    if (/^[+\d\s-]*$/.test(value)) {
      setPhoneNumber(value);
    }
  }

  const onSignInSubmit = async () => {
    setLoading(true)
    setError("")

    // Format phone number for validation
    const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');

    // Validate phone number format
    if (!isValidPhoneNumber(formattedPhone)) {
      setError("Please enter a valid phone number in E.164 format (e.g. +1234567890)")
      setLoading(false)
      return
    }

    try {
      // Check if user exists in DB first (Since this is LOGIN)
      const { exists } = await checkUserExists(formattedPhone)
      if (!exists) {
        setError("User not found. Please register first.")
        setLoading(false)
        return
      }

      // Initialize ReCaptcha
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
          'size': 'invisible',
          'callback': () => {}
        });
      }

      const appVerifier = window.recaptchaVerifier
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      setConfirmationResult(confirmation)
      setStep("OTP")
    } catch (err: any) {
      console.error("Sign in error:", err)

      // Handle specific Firebase auth errors
      let errorMessage = "Failed to send OTP";
      if (err.code) {
        switch (err.code) {
          case 'auth/invalid-phone-number':
            errorMessage = "Invalid phone number format. Please use E.164 format (e.g. +1234567890)";
            break;
          case 'auth/missing-phone-number':
            errorMessage = "Please enter a phone number";
            break;
          case 'auth/quota-exceeded':
            errorMessage = "SMS quota exceeded. Please try again later.";
            break;
          case 'auth/operation-not-allowed':
            errorMessage = "Phone authentication is not enabled.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many requests. Please try again later.";
            break;
          default:
            errorMessage = err.message || "Failed to send OTP";
        }
      }

      setError(errorMessage)

      // Reset captcha if it failed
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    } finally {
      setLoading(false)
    }
  }

  const onOtpSubmit = async () => {
    if (!confirmationResult) return
    setLoading(true)
    setError("")

    try {
      await confirmationResult.confirm(otp)
      // Login successful, redirect to dashboard or home
      router.push("/")
    } catch (err: any) {
      console.error("OTP verification error:", err)

      // Handle specific Firebase auth errors
      let errorMessage = "Invalid verification code";
      if (err.code) {
        switch (err.code) {
          case 'auth/invalid-verification-code':
            errorMessage = "Invalid verification code. Please try again.";
            break;
          case 'auth/invalid-verification-id':
            errorMessage = "Verification ID is invalid. Please request a new code.";
            break;
          case 'auth/code-expired':
            errorMessage = "Verification code has expired. Please request a new code.";
            break;
          default:
            errorMessage = err.message || "Invalid verification code";
        }
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 w-full max-w-sm">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
          {error}
        </div>
      )}

      {step === "PHONE" ? (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Phone Number</label>
            <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                placeholder="+1 234 567 8900"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="pl-10"
                />
            </div>
            <p className="text-xs text-muted-foreground">
              Include country code (e.g. +1). Supports test numbers: +1 650-555-0125, +1 650-555-0123, +1 650-555-0124
            </p>
          </div>

          <Button
            id="sign-in-button"
            className="w-full font-bold"
            onClick={onSignInSubmit}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Verification Code"}
          </Button>

          <div className="text-center text-sm">
             <span className="text-muted-foreground">Don't have an account? </span>
             <a href="/register" className="text-primary hover:underline">Register</a>
          </div>
        </>
      ) : (
        <>
           <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Verification Code</label>
            <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="pl-10 tracking-widest text-lg"
                    maxLength={6}
                />
            </div>
            <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to {formatPhoneNumber(phoneNumber)}</p>
          </div>

          <Button
            className="w-full font-bold"
            onClick={onOtpSubmit}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Login"}
          </Button>

          <Button
            variant="ghost"
            className="w-full text-xs text-muted-foreground hover:text-white"
            onClick={() => setStep("PHONE")}
          >
            Wrong number? Go back
          </Button>
        </>
      )}
    </div>
  )
}

// Add type definition for window
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
