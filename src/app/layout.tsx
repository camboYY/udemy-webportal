import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { fonts } from "./fonts";
import { Footer, Navbar } from "@/components";
import Image from "next/image";
import logo from "../assets/elearning.png";
import { Box, Text } from "@chakra-ui/react";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-learning - Dashboard",
  description: "Welcome Udemy E-learning, by udemy BBU team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div style={{ paddingLeft: 10, paddingRight: 10 }}>{children}</div>
          <Box boxSize="sm" marginLeft={10}>
            <Image style={{ alignSelf: "center" }} src={logo} alt="our logo" />
            <Text fontSize="xl">E-Learning</Text>
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
