import NavigationSheet from "./NavigationSheet";

const Navbar = () => {
  return (
    <header className="fixed z-10 w-full">
      <nav className="flex justify-between p-4 px-8 md:px-16 lg:px-32">
        <h1 className="w-fit rounded-full border bg-neutral-700/50 p-2 px-4 text-base font-semibold backdrop-blur-2xl">
          ACM
        </h1>
        <nav>
          <NavigationSheet />
        </nav>
      </nav>
    </header>
  );
};

export default Navbar;
