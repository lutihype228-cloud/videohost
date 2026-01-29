"use client"

import * as React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"

type DropdownContextType = {
  open: boolean
  setOpen: (v: boolean) => void
  toggle: () => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  const value = {
    open,
    setOpen,
    toggle: () => setOpen((o) => !o),
  }

  return (
    <DropdownContext.Provider value={value}>
      <div ref={ref} className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}

export const DropdownMenuTrigger = ({ children }: any) => {
  const ctx = useContext(DropdownContext)
  if (!ctx) return <span className="inline-block">{children}</span>

  if (!React.isValidElement(children)) return <span className="inline-block">{children}</span>
  const childEl = children as React.ReactElement<any>

  return React.cloneElement(childEl, {
    onClick: (e: any) => {
      if (typeof childEl.props?.onClick === "function") childEl.props.onClick(e)
      ctx.toggle()
    },
  })
}

export const DropdownMenuContent = ({ children, className = "" }: any) => {
  const ctx = useContext(DropdownContext)
  if (!ctx || !ctx.open) return null
  return (
    <div className={`absolute right-0 mt-2 min-w-[8rem] rounded-md border bg-[#161b22] p-1 text-white shadow-md ${className}`}>
      {children}
    </div>
  )
}

export const DropdownMenuItem = ({ children, className = "", onClick }: any) => {
  const ctx = useContext(DropdownContext)
  return (
    <div
      onClick={(e) => {
        if (typeof onClick === "function") onClick(e)
        // close menu after action
        ctx?.setOpen(false)
      }}
      className={`px-2 py-1 text-sm hover:bg-[#21262d] cursor-pointer ${className}`}
    >
      {children}
    </div>
  )
}

export {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuTrigger as DropdownMenuTriggerControl,
  DropdownMenuContent as DropdownMenuContentPanel,
  DropdownMenuItem as DropdownMenuItemControl,
}

export default DropdownMenu