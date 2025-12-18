"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Phone, User as UserIcon, KeyRound } from "lucide-react"
import { syncUser, checkUserExists } from "@/actions/auth"

export function RegisterForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"DETAILS" | "OTP">("DETAILS")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  const onRegisterSubmit = async () => {
    setLoading(true)
    setError("")
    
    if(phoneNumber.length < 10 || fullName.length < 3) {
        setError("Please enter valid details")
        setLoading(false)
        return
    }

    try {
       // Check if user exists (Prevent duplicate registration)
      const { exists } = await checkUserExists(phoneNumber)
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
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      setConfirmationResult(confirmation)
      setStep("OTP")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to send OTP")
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
      const result = await syncUser(phoneNumber, fullName)
      if (result.error) throw new Error(result.error)

      router.push("/")
    } catch (err: any) {
      console.error(err)
      setError("Verification failed or User sync error")
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
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 text-white"
                />
            </div>
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
