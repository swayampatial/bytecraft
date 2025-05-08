"use client";
import { CartItem, useCart } from "../CartContext";
import Container from "../global/Container";
import CartButton from "./CartButton";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import { Suspense, useEffect, useState } from "react";
function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="border-b">
      <Container className="flex  sm:flex-row justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton items={totalItems} />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
