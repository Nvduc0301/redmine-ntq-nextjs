import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="text-xs text-center p-1">
      Powered by
      <Link
        className="text-blue-300 mx-1"
        href="https://bitnami.com/stack/redmine"
        rel="noreferrer noopener"
      >
        Bitnami Redmine Stack
      </Link>
      © 2006-2015 Jean-Philippe Lang
    </div>
  );
};

export default Footer;
