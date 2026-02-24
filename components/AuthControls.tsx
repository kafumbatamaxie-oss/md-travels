"use client"

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function AuthControls() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}