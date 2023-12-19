"use client"

import Link from "next/link"
import { UserButton, useAuth } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function NavigationMenu() {
    const { userId } = useAuth();

    // useState to spin the spinner logo when button is hovered over
    const [spin, setSpin] = useState(false);

    function flipSpinnerStatus() {
        setSpin(!spin);
    }

    // Retrieve mode or set default mode to learner
    const [mode, setMode] = useState("");
    const [otherMode, setOtherMode] = useState("");

    // Prepare light / dark mode
    const [darkMode, setDarkMode] = useState("");

    useEffect(() => {
        // Learner or Teacher mode
        let storedMode = window.localStorage.getItem("tamagoUserMode") === "Teacher Mode" ? "Teacher Mode" : "Learner Mode";
        setMode(storedMode);

        // Opposite of mode retrieved / created above
        let otherMode = storedMode === "Teacher Mode" ? "Learner Mode" : "Teacher Mode";
        setOtherMode(otherMode);
    }, [])

    // useState to reroute upon mode change
    const router = useRouter();
    const [route, setRoute] = useState();

    const[x, setX] = useState(0);

    return (
        <div className={cn(
            "w-full flex bg-white transition-all",
            darkMode == "Dark" && "bg-stone-800"
        )}>
            <div className="items-center align-middle w-full flex pl-6 space-x-4">
                <Link href="/" className="logo text-3xl transition-all text-orange-500 hover:animate-pulse hover:text-4xl">
                    Tamago
                </Link>
            </div>

            <div>

            </div>

            <div className={cn(
                "items-center align-middle w-full flex justify-end pr-8 space-x-4",
            )}>
                <div className={userId ? "" : "hidden"}>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant="outline" className={cn(
                                "border-2 rounded-none",
                                mode == "Teacher Mode" && "bg-orange-500 text-white border-orange-600 hover:bg-amber-300 hover:border-amber-400",
                                darkMode == "Dark" && "bg-stone-700 text-white hover:"
                            )} onMouseEnter={flipSpinnerStatus} onMouseLeave={flipSpinnerStatus}>
                                {mode}
                                <RefreshCw className={cn(
                                    "ml-2",
                                    spin && "animate-spin"
                                )} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Switch to {mode == "Learner Mode" ? "Teacher Mode" : "Learner Mode"}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Please finish whatever you are doing before switching modes to prevent losing any unsaved changes.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Stay in {mode}</AlertDialogCancel>
                                <AlertDialogAction onClick={() => {
                                    setMode(otherMode);
                                    localStorage.setItem("tamagoUserMode", otherMode);
                                    setOtherMode(mode);
                                    router.push("/dashboard");
                                }}>
                                    Switch
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <Link href="/courses">
                    <Button variant="outline" className="border-2 rounded-none">
                        Courses
                    </Button>
                </Link>
                <Link href="/profile" className={userId ? "" : "hidden"}>
                    <Button variant="outline" className="border-2 rounded-none">
                        Profile
                    </Button>
                </Link>
                <Link href="/sign-in" className={userId ? "hidden" : ""}>
                    <Button variant="outline" className="border-2 rounded-none">
                        Sign In
                    </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
            </div >
        </div >
    )
};