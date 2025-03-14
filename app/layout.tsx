import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pao Siangliulue",
  description: "Pao Siangliulue's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="has-navbar-fixed-top">
      <body className={inter.className}>
        <div className="is-fullheight">
          <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
            <input id="menu-switch" name="menu-switch" type="checkbox"/>
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src="/paoponder-logo-192.png" alt="Paoponder logo" /> PAO SIANGLIULUE
              </a>
              <label role="button" htmlFor="menu-switch" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>

            <div className="navbar-menu">
              <div className="navbar-end">
                <a className="navbar-item" href="/blog">Blog</a>
                {/* <a className="navbar-item" href="/projects">Projects</a> */}
                {/* <a className="navbar-item" href="/about">Publications</a> */}
              </div>
            </div>
            </div>
          </nav>
          {children}
          <footer className="footer is-flex-align-items-flex-end mt-auto">
            <div className="content has-text-centered">
              <a href="/">PAOPONDER</a> by Pao Siangliulue.
              This website content is licensed <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY ND NC 4.0</a>.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
