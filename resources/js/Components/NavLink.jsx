import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ' +
                (active
                    ? 'bg-[#f0e7db] text-[#99783d] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}