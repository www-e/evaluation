"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Phone, KeyRound } from "lucide-react" // Ensure Icons are imported
import { checkUserExists } from "@/actions/auth"

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  const onSignInSubmit = async () => {
    setLoading(true)
    setError("")
    
    // Quick validation
    if(phoneNumber.length < 10) {
        setError("Please enter a valid phone number")
        setLoading(false)
        return
    }

    try {
      // Check if user exists in DB first (Since this is LOGIN)
      const { exists } = await checkUserExists(phoneNumber)
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
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      setConfirmationResult(confirmation)
      setStep("OTP")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to send OTP")
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
      console.error(err)
      setError("Invalid Code")
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
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 text-white"
                />
            </div>
            <p className="text-xs text-muted-foreground">Include country code (e.g. +1)</p>
          </div>
          
          <Button 
            id="sign-in-button"
            className="w-full font-bold" 
            onClick={onSignInSubmit} 
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Code"}
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
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 text-white tracking-widest text-lg"
                    maxLength={6}
                />
            </div>
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
