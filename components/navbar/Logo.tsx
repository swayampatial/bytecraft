import Link from 'next/link';
import { Button } from '../ui/button';
import { DiDebian } from "react-icons/di";

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <DiDebian className='w-6 h-6' />
      </Link>
    </Button>
  );
}

export default Logo;