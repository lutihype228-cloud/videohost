"use client"

import * as React from "react"

export const Avatar = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={`inline-flex items-center justify-center overflow-hidden rounded-full ${className}`} {...props}>
      {children}
    </div>
  )
}

export const AvatarFallback = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`} {...props}>
      {children}
    </div>
  )
} 

export default Avatar