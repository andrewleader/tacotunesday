import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
  return (
    <>
      <Navbar {...props} />
      <div className="affiliate-disclosure-banner" role="note">
        I bought all the products I recommend, no freebies. If you purchase through my links, I may earn a commission.
      </div>
    </>
  );
}
