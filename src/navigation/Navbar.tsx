/** @format */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import routes from './routes';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex justify-between items-center bg-black text-grey-4 h-[77px]'>
      <ul className='flex font-gosha text-2xl leading-7'>
        {routes.map((link) => (
          <Link key={link.path} href={link.path}>
            <li
              className={`${
                link.path === pathname ? 'bg-white-1 text-black font-bold' : ''
              } px-10 py-[25px] border-0 border-r-[1px] border-grey-5 cursor-pointer capitalize`}
            >
              {link.title}
            </li>
          </Link>
        ))}
      </ul>
      <div className='flex justify-between items-center gap-4 pr-5'>
        <div className='flex flex-col'>
          <h2 className='text-primary font-gosha text-xl leading-6'>
            Farm2Door
          </h2>
          <p className='text-primary-light-2 text-sm leading-6'>
            Maxwell@meatsupplier.com
          </p>
        </div>
        <div className='rounded-[100px] w-16 h-12 bg-primary flex justify-center items-center cursor-pointer'>
          <Image
            src='/icons/arrow-down.svg'
            width={32}
            height={32}
            alt='arrow-down-icon'
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
