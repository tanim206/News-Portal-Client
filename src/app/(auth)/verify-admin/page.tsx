import VerifyAccountForm from "@/components/form/verify-form";

// This page depends on URL search params (email), which are only known at
// request time, so it must not be statically prerendered.
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <div className="max-w-3xl mx-auto my-auto">
      <VerifyAccountForm />
    </div>
  );
}
