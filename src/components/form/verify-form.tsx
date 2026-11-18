"use client";

import { useQueryClient } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { useVerifyAccount } from "@/hooks";

const RESEND_COOLDOWN = 120;

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyUser, isPending } = useVerifyAccount();

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verifyUser(verifyData, {
      onSuccess: async () => {
        toast.add({
          title: "Account Verified",
          description:
            "Your email has been verified. You can now log in to your account.",
          type: "success",
        });

        await queryClient.invalidateQueries({
          queryKey: ["user"],
          refetchType: "all",
        });

        router.replace("/dashboard/administrator");
        router.refresh();
      },

      onError: (err: unknown) => {
        const message =
          (err as { data?: { message?: string } })?.data?.message ||
          (err as { message?: string })?.message ||
          "Something went wrong. Please try again";

        toast.add({
          title: "Verification failure",
          description: message,
          type: "error",
        });
      },
    });
  };

  if (!email) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* OTP Field */}
        <Field data-invalid={isInvalid} className="gap-3">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);

                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="one-time-code"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {isInvalid && (
            <FieldError
              errors={[{ message: "Invalid Code. Please try again" }]}
            />
          )}

          <FieldDescription className="text-center">
            {resendTimer > 0
              ? `Resend available in ${resendTimer}s`
              : "You can request a new verification code"}
          </FieldDescription>
        </Field>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            disabled={resendTimer > 0}
            variant="outline"
            type="button"
            className="h-11 flex-1 rounded-lg"
          >
            Resend
          </Button>

          <Button
            type="button"
            onClick={handleOTP}
            disabled={isPending}
            className="h-11 flex-1 text-sm rounded-lg font-semibold"
          >
            {isPending ? "Verifying..." : "Verify Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
