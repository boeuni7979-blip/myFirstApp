import "./globals.css";

export const metadata = {
  title: "홈 | 프리미엄 포털",
  description: "프리미엄 포털의 메인 페이지입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
