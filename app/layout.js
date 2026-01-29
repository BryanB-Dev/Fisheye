import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "FishEye",
  description: "Plateforme de photographes freelances",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={dmSans.variable}>
        {children}
      </body>
    </html>
  );
}
