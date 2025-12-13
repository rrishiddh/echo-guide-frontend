import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}



const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <h1 className="text-4xl font-bold text-white mb-2">Echo Guide</h1>
            </Link>
            <p className="text-blue-100">Connect with local experts worldwide</p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            {children}
          </div>

          <p className="text-center text-blue-100 mt-6 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <div className="px-4 py-6 text-center text-blue-100 text-sm">
        <p>&copy; 2024 Echo Guide. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthLayout;