import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebar_items = [
    {
      name: "markdown",
      href: "/sendbox/markdown",
    },
  ];
  return (
    <main className="flex h-screen p-4 ">
      <section className="w-72 h-96 sticky border rounded-md p-4  top-0 mx-4">
        {sidebar_items.map((item, index) => (
          <div key={index}>
            <Link className="hover:underline" href={item.href}>
              {item.name}
            </Link>
          </div>
        ))}
      </section>
      <section className="w-full">{children}</section>
    </main>
  );
}
