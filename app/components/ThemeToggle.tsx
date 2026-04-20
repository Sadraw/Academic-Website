'use client'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() { 
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null



    return (
        <button
        onClick={() => setTheme(theme === 'dark' ? 'light': 'dark')}
        aria-label = "Toggle theme"
        className= "p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-zinc-700 "
        >
            
            {theme === 'dark' ? '☀️' : '🌙'}

        </button>
    )
}