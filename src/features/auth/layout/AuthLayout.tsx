import casinoImage from "@/assets/images/auth_image.png";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-[#121212] text-white">
      <div className="w-1/2 h-screen object-fill hidden md:block">
        <img
          src={casinoImage}
          alt="Casino Image"
          className="w-full h-full object-fill"
        />
      </div>
      {children}
    </div>
  );
}
