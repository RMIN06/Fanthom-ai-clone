import React from 'react';

export default function BrandLogo({ variant = 'dark', className = '', iconOnly = false }) {
  return <img className={`brand-logo ${className}`.trim()} src={iconOnly ? '/brand/logo-icon.svg' : `/brand/logo-full-${variant}.svg`} alt="Fathom" />;
}
