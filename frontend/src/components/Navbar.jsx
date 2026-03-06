import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-amber-300 border-b border-base-content/10">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        
        <Link to="/">
          <h1 className="text-3xl font-bold font-mono tracking-tight cursor-pointer">
            MOVIE COLLECTION MANAGER
          </h1>
        </Link>

        <Link
          to="/create"
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="size-5" />
          <span>New Movie</span>
        </Link>

      </div>
    </header>
  );
};

export default Navbar;