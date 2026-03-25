interface BrandLogoProps {
    variant?: 'full' | 'mark';
    className?: string;
    alt?: string;
}

const BrandLogo = ({ variant = 'full', className = '', alt = 'Saloria' }: BrandLogoProps) => {
    const src = variant === 'mark' ? '/saloria-mark.svg' : '/saloria-logo.svg';

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            decoding="async"
        />
    );
};

export default BrandLogo;
