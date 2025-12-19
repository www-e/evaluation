"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Phone, User as UserIcon, KeyRound } from "lucide-react"
import { syncUser, checkUserExists } from "@/actions/auth"
import { formatPhoneNumber } from "@/lib/utils"

export function RegisterForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"DETAILS" | "OTP">("DETAILS")
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

  const onRegisterSubmit = async () => {
    setLoading(true)
    setError("")

    // Format phone number for validation
    const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');

    // Validate inputs
    if (!isValidPhoneNumber(formattedPhone)) {
      setError("Please enter a valid phone number in E.164 format (e.g. +1234567890)")
      setLoading(false)
      return
    }

    if (fullName.length < 2) {
      setError("Please enter a valid full name (at least 2 characters)")
      setLoading(false)
      return
    }

    try {
       // Check if user exists (Prevent duplicate registration)
      const { exists } = await checkUserExists(formattedPhone)
      if (exists) {
        setError("User already exists. Please Login.")
        setLoading(false)
        return
      }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'register-button', {
          'size': 'invisible',
          'callback': () => {}
        });
      }

      const appVerifier = window.recaptchaVerifier
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      setConfirmationResult(confirmation)
      setStep("OTP")
    } catch (err: any) {
      console.error("Register error:", err)

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

      // ✅ Sync with MySQL
      const result = await syncUser(phoneNumber.replace(/[^\d+]/g, ''), fullName)
      if (result.error) throw new Error(result.error)

      router.push("/")
    } catch (err: any) {
      console.error("OTP verification error:", err)

      // Handle specific Firebase auth errors
      let errorMessage = "Verification failed";
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
            errorMessage = err.message || "Verification failed";
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

      {step === "DETAILS" ? (
        <>
            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Full Name</label>
            <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 text-white"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Phone Number</label>
            <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                placeholder="+1 234 567 8900"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="pl-10 text-white"
                />
            </div>
            <p className="text-xs text-muted-foreground">Include country code (e.g. +1)</p>
          </div>

          <Button
            id="register-button"
            className="w-full font-bold"
            onClick={onRegisterSubmit}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Register"}
          </Button>

           <div className="text-center text-sm">
             <span className="text-muted-foreground">Already have an account? </span>
             <a href="/login" className="text-primary hover:underline">Login</a>
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
                    className="pl-10 text-white tracking-widest text-lg"
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
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Create Account"}
          </Button>

           <Button
            variant="ghost"
            className="w-full text-xs text-muted-foreground"
            onClick={() => setStep("DETAILS")}
          >
            Back to details
          </Button>
        </>
      )}
    </div>
  )
}
