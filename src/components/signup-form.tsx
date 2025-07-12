import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Spinner } from "./Spinner"

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [role, setRole] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
            const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const data = {
            email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
            username: (form.elements.namedItem("username") as HTMLInputElement)?.value,
            password: (form.elements.namedItem("password") as HTMLInputElement)?.value,
            role: role,
        }
        
        setIsLoading(true)
        
        try {
            // Simulate API call delay for demo purposes
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            // Simulate successful registration
            const result = {
                success: true,
                user: {
                    id: 'demo-user-' + Date.now(),
                    email: data.email,
                    username: data.username,
                    role: data.role
                },
                token: 'demo-jwt-token-' + Date.now()
            };
            
            console.log('Registration successful (simulated):', result)
            
            // Store simulated auth data in localStorage for demo
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('userData', JSON.stringify(result.user));
            
            navigate('/dashboard', { state: { from: '/auth/sign-up' } })
        } catch (error) {
            console.error('Simulation error:', error)
            // You can add error handling here (e.g., show error message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6 sm:min-w-sm", className)} {...props}>
            <Card className="frosted-glass bg-transparent sm:bg-neutral-900 text-white border-none sm:border-neutral-800">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your email below to signup
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="relative">
                                    <Input 
                                        id="password" 
                                        name="password" 
                                        type={showPassword ? "text" : "password"} 
                                        className="pr-10"
                                        required 
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="role">Role</Label>
                                <Select value={role} onValueChange={setRole} required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 text-white">
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button 
                                variant="outline" 
                                className="w-full text-black cursor-pointer mt-6" 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner /> : "Continue"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/auth/sign-in" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
