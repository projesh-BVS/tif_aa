import FormField from "./FormField";

const LoginForm = () => {
    return (
        <section className="flex flex-col gap-6 w-full">
            <form className="flex flex-col gap-6">
                <FormField
                    fieldID="email"
                    fieldName="email"
                    fieldType="email"
                    fieldLabel="Email Address"
                />
                <FormField
                    fieldID="password"
                    fieldName="password"
                    fieldType="password"
                    fieldLabel="Password"
                />
            </form>
            <button className="
                w-full 
                p-2 
                rounded-lg 
                text-center 
                bg-tif-blue 
                text-white 
                font-medium 
                hover:bg-tif-lavender hover:shadow-lg 
                focus:bg-tif-lavender focus:outline-none focus:shadow-lg
                
                transition-all"
            >
                Login
            </button>
        </section>
    );
};

export default LoginForm;