"use client"

import { useTheme } from "next-themes"
import { DarkModeSwitch } from "./ui/dark-mode-switch";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const { theme, setTheme } = useTheme()
    const [checked, setChecked] = useState(false);

    // First render
    useEffect(() => {
        theme === "dark" ? setChecked(true) : setTheme("light");
        console.log(theme === "dark")
    }, [])

    return (
        <>
            <DarkModeSwitch className="bg-slate-300" checked={checked} onCheckedChange={() => {setTheme(checked ? "dark" : "light"); setChecked(!checked)}} />
        </>
    )
}